import React, { useState, useEffect } from 'react';
import { Switch, FormControl, Select, MenuItem, IconButton, Collapse, TextField, Chip, Box, InputLabel, Checkbox, ListItemText, Input, Button } from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Add as AddIcon , Delete as DeleteIcon} from '@mui/icons-material';
import {planSeedData} from '@/data';
import RuleEditor from './rule_editor';

const categoryColors = {
  'Volume': 'blue',
  'Validity': 'green',
  'Schema': 'red',
  'Data Loss': 'purple',
  'Anomalies': 'orange',
};



const Rule = ({ rule, onToggle, onRuleChange, onSegmentColumnsChange, onSave }) => {
  const [isEditing, setIsEditing] = useState(rule.isEditing || false);


  

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
            <>
            <IconButton onClick={() => { isEditing ? (onSave(rule) || setIsEditing(!isEditing)) : setIsEditing(!isEditing) }}>
              {isEditing ? <SaveIcon /> : <EditIcon />}
            </IconButton>
            <IconButton onClick={() => { isEditing ? (onSave(rule) || setIsEditing(!isEditing)) : setIsEditing(!isEditing) }}>
              <DeleteIcon />
            </IconButton>
          </>
          )}
        </td>
      </tr>
      {isEditing && (
        <tr>
          <td colSpan={5}>
            <Collapse in={isEditing}>
              <div className="p-6 mt-6">
            <RuleEditor
                rule={rule}
                onRuleChange={onRuleChange}
                onSegmentColumnsChange={onSegmentColumnsChange}
                onSave={onSave}
              />
              </div>
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
            <th className="text-left p-2">Actions</th>
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
