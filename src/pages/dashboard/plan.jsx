import React, { useState, useEffect } from 'react';
import { Switch, FormControl, Select, MenuItem, IconButton, Collapse, TextField, Chip, Box, InputLabel, Checkbox, ListItemText, Input } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

const categoryColors = {
  'Volume': 'blue',
  'Validity': 'green',
  'Schema': 'red',
  'Data Loss': 'purple',
  'Anomalies': 'orange',
};

const Rule = ({ rule, onToggle, onRuleChange, onSegmentColumnsChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [segmentColumn, setSegmentColumn] = useState('');

  const handleAddSegmentColumn = () => {
    onSegmentColumnsChange(rule, [...rule.segmentColumns, segmentColumn]);
    setSegmentColumn('');
  };

  const handleDeleteSegmentColumn = (columnToDelete) => {
    onSegmentColumnsChange(rule, rule.segmentColumns.filter((column) => column !== columnToDelete));
  };

  useEffect(() => {
    let description = `${rule.action} ${rule.expression ? rule.expression : ''} over ${rule.windowSize} windows`;
    if (rule.segment === 'By Segment') {
      description += ` segmented by ${rule.segmentColumns.join(', ')}`;
    }
    onRuleChange(rule, 'description', description);
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
            <IconButton onClick={() => setIsEditing(!isEditing)}>
              <EditIcon />
            </IconButton>
          )}
        </td>
      </tr>
      {isEditing && (
        <tr>
          <td colSpan={5}>
            <Collapse in={isEditing}>
              <Box display="flex" flexDirection="row" gap={2}>
                <FormControl>
                  <Select value={rule.category} onChange={(e) => onRuleChange(rule, 'category', e.target.value)}>
                    <MenuItem value="Volume">Volume</MenuItem>
                    <MenuItem value="Validity">Validity</MenuItem>
                    <MenuItem value="Schema">Schema</MenuItem>
                    <MenuItem value="Data Loss">Data Loss</MenuItem>
                    <MenuItem value="Anomalies">Anomalies</MenuItem>
                  </Select>
                  <Select value={rule.action} onChange={(e) => onRuleChange(rule, 'action', e.target.value)}>
                    {rule.category === 'Validity' && (
                      <>
                        <MenuItem value="not_null">Not Null</MenuItem>
                        <MenuItem value="in_set">In Set</MenuItem>
                        <MenuItem value="condition">Condition</MenuItem>
                      </>
                    )}
                    {rule.category === 'Volume' && (
                      <>
                        <MenuItem value="spikes">Spikes</MenuItem>
                        <MenuItem value="drops">Drops</MenuItem>
                      </>
                    )}
                    {rule.category === 'Schema' && (
                      <>
                        <MenuItem value="compatibility">Compatibility</MenuItem>
                        <MenuItem value="new_columns">New Columns</MenuItem>
                      </>
                    )}
                   
                   {rule.category === 'Data Loss' && (
                      <>
                        <MenuItem value="decoding_errors">Decoding Errors</MenuItem>
                      </>
                    )}
                    {rule.category === 'Anomalies' && (
                      <>
                        <MenuItem value="value_spikes">Value Spikes</MenuItem>
                        <MenuItem value="value_drops">Value Drops</MenuItem>
                      </>
                    )}
                  </Select>
                  <TextField value={rule.expression} onChange={(e) => onRuleChange(rule, 'expression', e.target.value)} />
                  <Select value={rule.segment} onChange={(e) => onRuleChange(rule, 'segment', e.target.value)}>
                    <MenuItem value="Total">Total</MenuItem>
                    <MenuItem value="By Segment">By Segment</MenuItem>
                  </Select>
                  {rule.segment === 'By Segment' && (
                    <div>
                      <TextField value={segmentColumn} onChange={(e) => setSegmentColumn(e.target.value)} />
                      <IconButton onClick={handleAddSegmentColumn}>
                        <EditIcon />
                      </IconButton>
                      {rule.segmentColumns.map((column) => (
                        <Chip key={column} label={column} onDelete={() => handleDeleteSegmentColumn(column)} />
                      ))}
                    </div>
                  )}
                  <Select value={rule.windowSize} onChange={(e) => onRuleChange(rule, 'windowSize', e.target.value)}>
                    <MenuItem value="5m">5m</MenuItem>
                    <MenuItem value="15m">15m</MenuItem>
                    <MenuItem value="30m">30m</MenuItem>
                    <MenuItem value="1h">1h</MenuItem>
                    <MenuItem value="24h">24h</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Collapse>
          </td>
        </tr>
      )}
    </>
  );
};

export const Plan = () => {
    
    const [rules, setRules] = useState([
        {
          id: 1,
          type: 'Automatic',
          category: 'Volume',
          description: 'Track abnormal rows count in the data over 5m windows',
          enabled: true,
          segment: 'Total',
          windowSize: '5m',
          segmentColumns: [],
          action: 'spikes',
          expression: '',
        },
        {
          id: 2,
          type: 'Automatic',
          category: 'Volume',
          description: 'Track abnormal rows count per segment over 15m windows',
          enabled: true,
          segment: 'By Segment',
          windowSize: '15m',
          segmentColumns: ['merchant'],
          action: 'drops',
          expression: '',
        },
        {
          id: 3,
          type: 'Automatic',
          category: 'Validity',
          description: 'Null checks for all columns over 30m windows',
          enabled: true,
          segment: 'Total',
          windowSize: '30m',
          segmentColumns: [],
          action: 'not_null',
          expression: '',
        },
        {
          id: 4,
          type: 'Custom',
          category: 'Validity',
          description: 'Revenue > 0 over 1h windows',
          enabled: true,
          segment: 'By Segment',
          windowSize: '1h',
          segmentColumns: ['product'],
          action: 'condition',
          expression: 'revenue',
        },
        {
          id: 5,
          type: 'Automatic',
          category: 'Schema',
          description: 'Backward compatibility check over 24h windows',
          enabled: true,
          segment: 'Total',
          windowSize: '24h',
          segmentColumns: [],
          action: 'compatibility',
          expression: '',
        },
        {
          id: 6,
          type: 'Custom',
          category: 'Schema',
          description: 'Nested column existence - details.info.meta over 5m windows',
          enabled: true,
          segment: 'By Segment',
          windowSize: '5m',
          segmentColumns: ['user'],
          action: 'compatibility',
          expression: 'details.info.meta',
        },
        {
          id: 7,
          type: 'Automatic',
          category: 'Anomalies',
          description: 'Abnormal numeric value spikes over 15m windows',
          enabled: true,
          segment: 'Total',
          windowSize: '15m',
          segmentColumns: [],
          action: 'value_spikes',
          expression: '',
        },
        {
          id: 8,
          type: 'Automatic',
          category: 'Data Loss',
          description: 'Abnormal exceptions in decoding over 30m windows',
          enabled: true,
          segment: 'By Segment',
          windowSize: '30m',
          segmentColumns: ['region'],
          action: 'decoding_errors',
          expression: '',
        },
        {
          id: 9,
          type: 'Custom',
          category: 'Volume',
          description: 'Track sudden drops in rows count per segment over 1h windows',
          enabled: true,
          segment: 'By Segment',
          windowSize: '1h',
          segmentColumns: ['region'],
          action: 'drops',
          expression: '',
        },
        {
          id: 10,
          type: 'Custom',
          category: 'Validity',
          description: 'Age > 18 over 24h windows',
          enabled: true,
          segment: 'By Segment',
          windowSize: '24h',
          segmentColumns: ['user'],
          action: 'condition',
          expression: 'age > 18',
        },
        {
            id: 11,
            type: 'Custom',
            category: 'Validity',
            description: 'Value in [1,2,3,4] over 24h windows',
            enabled: true,
            segment: 'By Segment',
            windowSize: '24h',
            segmentColumns: ['user'],
            action: 'in_set',
            expression: 'value:[1,2,3,4]',
          },
        {
          id: 12,
          type: 'Custom',
          category: 'Schema',
          description: 'Check for new columns over 5m windows',
          enabled: true,
          segment: 'Total',
          windowSize: '5m',
          segmentColumns: [],
          action: 'new_columns',
          expression: '',
        },
        {
          id: 13,
          type: 'Custom',
          category: 'Data Loss',
          description: 'Track exceptions in decoding over 15m windows',
          enabled: true,
          segment: 'By Segment',
          windowSize: '15m',
          segmentColumns: ['region'],
          action: 'decoding_errors',
          expression: '',
        },
        {
          id: 14,
          type: 'Custom',
          category: 'Anomalies',
          description: 'Abnormal value drops in numeric columns over 30m windows',
          enabled: true,
          segment: 'By Segment',
          windowSize: '30m',
          segmentColumns: ['product'],
          action: 'value_drops',
          expression: '',
        },
        {
          id: 15,
          type: 'Automatic',
          category: 'Volume',
          description: 'Track abnormal rows count in the data over 1h windows',
          enabled: true,
          segment: 'Total',
          windowSize: '1h',
          segmentColumns: [],
          action: 'spikes',
          expression: '',
        },
        {
          id: 16,
          type: 'Automatic',
          category: 'Validity',
          description: 'Null checks for all columns over 15m windows',
          enabled: true,
          segment: 'Total',
          windowSize: '15m',
          segmentColumns: [],
          action: 'not_null',
          expression: '',
        },
        {
          id: 17,
          type: 'Automatic',
          category: 'Schema',
          description: 'Backward compatibility check over 5m windows',
          enabled: true,
          segment: 'Total',
          windowSize: '5m',
          segmentColumns: [],
          action: 'compatibility',
          expression: '',
        },
        {
          id: 18,
          type: 'Automatic',
          category: 'Data Loss',
          description: 'Abnormal exceptions in decoding over 1h windows',
          enabled: true,
          segment: 'Total',
          windowSize: '1h',
          segmentColumns: [],
          action: 'decoding_errors',
          expression: '',
        },
        {
          id: 19,
          type: 'Automatic',
          category: 'Anomalies',
          description: 'Abnormal numeric value spikes over 24h windows',
          enabled: true,
          segment: 'Total',
          windowSize: '24h',
          segmentColumns: [],
          action: 'value_spikes',
          expression: '',
        },
      ]);

    const [filter, setFilter] = useState({ categories: [], types: [], search: '' });
  
    const handleToggle = (rule) => {
      setRules(rules.map((r) => (r.id === rule.id ? { ...r, enabled: !r.enabled } : r)));
    };
  
    const handleRuleChange = (rule, field, newValue) => {
      setRules(rules.map((r) => (r.id === rule.id ? { ...r, [field]: newValue } : r)));
    };
  
    const handleSegmentColumnsChange = (rule, newSegmentColumns) => {
      setRules(rules.map((r) => (r.id === rule.id ? { ...r, segmentColumns: newSegmentColumns } : r)));
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
        <Box display="flex" flexDirection="row" gap={2}>
          <FormControl sx={{ m: 1, width: 300 }}>
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
          <FormControl sx={{ m: 1, width: 300 }}>
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
              <Rule key={rule.id} rule={rule} onToggle={handleToggle} onRuleChange={handleRuleChange} onSegmentColumnsChange={handleSegmentColumnsChange} />
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Plan;
  