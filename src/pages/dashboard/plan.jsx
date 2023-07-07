import React, { useState, useEffect } from 'react';
import { Switch, FormControl, Select, MenuItem, IconButton, Collapse, TextField, Chip, Box, InputLabel, Checkbox, ListItemText, Input, Button } from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Add as AddIcon } from '@mui/icons-material';
import {planSeedData} from '@/data';
import {sendOpenAIRequest} from './io';


const categoryColors = {
  'Volume': 'blue',
  'Validity': 'green',
  'Schema': 'red',
  'Data Loss': 'purple',
  'Anomalies': 'orange',
};

const Rule = ({ rule, onToggle, onRuleChange, onSegmentColumnsChange, onSave }) => {
  const [isEditing, setIsEditing] = useState(rule.isEditing || false);
  const [segmentColumn, setSegmentColumn] = useState('');
  const [aiPrompt, setAiPrompt] = useState('create a rule to make sure each row donesnt have null in column row_id, the resolution is every 1 hour. no need it to be segmented, do it all over the data');

  const handleAddSegmentColumn = () => {
    onSegmentColumnsChange(rule, [...rule.segmentColumns, segmentColumn]);
    setSegmentColumn('');
  };

  const handleDeleteSegmentColumn = (columnToDelete) => {
    onSegmentColumnsChange(rule, rule.segmentColumns.filter((column) => column !== columnToDelete));
  };

  const handleGenerateRule = async () => {
    try {
        const res = await sendOpenAIRequest(aiPrompt);
        onRuleChange(rule.id, res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let description = `${rule.action} ${rule.expression ? rule.expression : ''} over ${rule.windowSize} windows`;
    if (rule.segment === 'By Segment') {
      description += ` segmented by ${rule.segmentColumns.join(', ')}`;
    }
    onRuleChange(rule.id, {'description': description});
  }, [rule.action, rule.expression, rule.windowSize, rule.segment, rule.segmentColumns]);

  return (
    <>
      <tr className="border-b">
        <td className="p-2">{rule.type}</td>
        <td className="p-2" style={{ color: categoryColors[rule.category] }}>{rule.category}</td>
        <td className="p-2">{rule.description}</td>
        <td className="p-2">
          <Switch checked={rule.enabled} onChange={() => onToggle(rule)} />
        </td>
        <td className="p-2">
          {rule.type === 'Custom' && (
            <IconButton onClick={() => { isEditing ? (onSave(rule) || setIsEditing(!isEditing)) : setIsEditing(!isEditing) }}>
              {isEditing ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          )}
        </td>
      </tr>
      {isEditing && (
        <tr>
          <td colSpan={5}>
            <Collapse in={isEditing}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" flexDirection="row" gap={2}>
                <FormControl sx={{  width: '100%' }}>
                  <TextField placeholder="AI Prompt" value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} />
                </FormControl>  
                <FormControl sx={{  width: '150' }}>
                <Button onClick={handleGenerateRule}>Generate Rule</Button>
                </FormControl>
             </Box>
            <Box display="flex" flexDirection="row" gap={2}>
                <FormControl sx={{  width: 300 }}>
                  <InputLabel>Category</InputLabel>
                  <Select value={rule.category} onChange={(e) => onRuleChange(rule.id, {'category': e.target.value})}>
                    <MenuItem value="Volume">Volume</MenuItem>
                    <MenuItem value="Validity">Validity</MenuItem>
                    <MenuItem value="Schema">Schema</MenuItem>
                    <MenuItem value="Data Loss">Data Loss</MenuItem>
                    <MenuItem value="Anomalies">Anomalies</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{  width: 300 }}>
                  <InputLabel>Action</InputLabel>
                  <Select 
                    value={rule.action} 
                    id="demo-simple-select"
                    onChange={(e) => {
                      
                      onRuleChange(rule.id, {'action': e.target.value})
                    }}
                  >
                    {rule.category === 'Validity' && [
                      <MenuItem key="not_null" value="not_null">Not Null</MenuItem>,
                      <MenuItem key="in_set" value="in_set">In Set</MenuItem>,
                      <MenuItem key="condition" value="condition">Condition</MenuItem>
                    ]}
                    
                    {rule.category === 'Volume' && [
                      <MenuItem key="spikes" value="spikes">Spikes</MenuItem>,
                      <MenuItem key="drops" value="drops">Drops</MenuItem>
                    ]}

                    {rule.category === 'Schema' && [
                      <MenuItem key="compatibility" value="compatibility">Compatibility</MenuItem>,
                      <MenuItem key="new_columns" value="new_columns">New Columns</MenuItem>,
                      <MenuItem key="column_exists" value="column_exists">Column Exists</MenuItem>
                    ]}

                    {rule.category === 'Data Loss' && [
                      <MenuItem key="decoding_errors" value="decoding_errors">Decoding Errors</MenuItem>
                    ]}

                    {rule.category === 'Anomalies' && [
                      <MenuItem key="value_spikes" value="value_spikes">Value Spikes</MenuItem>,
                      <MenuItem key="value_drops" value="value_drops">Value Drops</MenuItem>
                    ]}
                  </Select>

                </FormControl>
                <FormControl sx={{  width: 300 }}>
                  <TextField  placeholder="Expression" value={rule.expression} onChange={(e) => onRuleChange(rule.id, {'expression': e.target.value})} />
                </FormControl>
            </Box>
            <Box display="flex" flexDirection="row" gap={2}>
                <FormControl sx={{  width: 300 }}>
                  <InputLabel>Segment</InputLabel>
                  <Select value={rule.segment} onChange={(e) => onRuleChange(rule.id, {'segment': e.target.value})}>
                    <MenuItem value="Total">Total</MenuItem>
                    <MenuItem value="By Segment">By Segment</MenuItem>
                  </Select>
                </FormControl>
                  {rule.segment === 'By Segment' && (
                    <FormControl sx={{  width: 300 }}>
                      <TextField plceholder="Segment Column" value={segmentColumn} onChange={(e) => setSegmentColumn(e.target.value)} />
                      <IconButton onClick={handleAddSegmentColumn}>
                        <AddIcon />
                      </IconButton>
                      {rule.segmentColumns.map((column) => (
                        <Chip key={column} label={column} onDelete={() => handleDeleteSegmentColumn(column)} />
                      ))}
                    </FormControl>
                  )}
                  
                <FormControl sx={{  width: 300 }}>
                  <InputLabel>Window Size</InputLabel>
                  <Select value={rule.windowSize} onChange={(e) => onRuleChange(rule.id, {'windowSize': e.target.value})}>
                    <MenuItem value="5m">5m</MenuItem>
                    <MenuItem value="15m">15m</MenuItem>
                    <MenuItem value="30m">30m</MenuItem>
                    <MenuItem value="1h">1h</MenuItem>
                    <MenuItem value="24h">24h</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              </Box>
            </Collapse>
          </td>
        </tr>
      )}
    </>
  );
};

export const Plan = () => {
    
    const [rules, setRules] = useState(planSeedData);

    const [filter, setFilter] = useState({ categories: [], types:[], search: '' });

  const handleToggle = (rule) => {
    setRules(rules.map((r) => (r.id === rule.id ? { ...r, enabled: !r.enabled } : r)));
  };

  const handleRuleChange = (ruleId, newFields) => {
    setRules(rules.map((r) => {
      if (r.id === ruleId) {

        return { ...r, ...newFields };
      } else {
        return r;
      }
    }));
  };

  const handleSegmentColumnsChange = (rule, newSegmentColumns) => {
    setRules(rules.map((r) => (r.id === rule.id ? { ...r, segmentColumns: newSegmentColumns } : r)));
  };

  const handleAddNew = () => {
    setRules([{
      id: rules.length + 1,
      type: 'Custom',
      category: '',
      description: '',
      enabled: true,
      segment: '',
      windowSize: '',
      segmentColumns: [],
      action: '',
      expression: '',
      isEditing: true,
    }, ...rules]);
  };

  const handleSave = (rule) => {
    setRules(rules.map((r) => (r.id === rule.id ? { ...r, isEditing: false } : r)));
  };

  const filteredRules = rules
    .filter(rule => (filter.categories.length === 0 || filter.categories.includes(rule.category)) &&
      (filter.types.length === 0 || filter.types.includes(rule.type)) &&
      rule.description.toLowerCase().includes(filter.search.toLowerCase()))
    .sort((a, b) => {
      const categoryOrder = ['Volume', 'Validity', 'Schema', 'Data Loss', 'Anomalies'];
      return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category) || a.type.localeCompare(b.type);
    });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Observability Rules Editor</h1>
      <Box display="flex" flexDirection="row" gap={2} justifyContent="space-between">
      <FormControl sx={{  width: 300 }}>
            <InputLabel id="category-filter-label">Category Filter</InputLabel>
            <Select
              labelId="category-filter-label"
              multiple
              value={filter.categories}
              onChange={(e) => setFilter({ ...filter, categories: e.target.value })}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
            >
              {['Volume', 'Validity', 'Schema', 'Data Loss', 'Anomalies'].map((category) => (
                <MenuItem key={category} value={category}>
                  <Checkbox checked={filter.categories.includes(category)} />
                  <ListItemText primary={category} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{  width: 300 }}>
            <InputLabel id="type-filter-label">Type Filter</InputLabel>
            <Select
              labelId="type-filter-label"
              multiple
              value={filter.types}
              onChange={(e) => setFilter({ ...filter, types: e.target.value })}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
            >
              {['Automatic', 'Custom'].map((type) => (
                <MenuItem key={type} value={type}>
                  <Checkbox checked={filter.types.includes(type)} />
                  <ListItemText primary={type} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <TextField
              label="Search"
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            />
          </FormControl>
        <Button onClick={handleAddNew}>
          Add new
        </Button>
      </Box>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left p-2">Type</th>
            <th className="text-left p-2">Category</th>
            <th className="text-left p-2">Description</th>
            <th className="text-left p-2">Enabled</th>
            <th className="text-left p-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredRules.map((rule) => (
            <Rule key={rule.id} rule={rule} onToggle={handleToggle} onRuleChange={handleRuleChange} onSegmentColumnsChange={handleSegmentColumnsChange} onSave={handleSave} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Plan;
