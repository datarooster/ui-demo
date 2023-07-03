import React, { useState } from 'react';
import { Switch, FormControl, Select, MenuItem, IconButton, Collapse } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

const Rule = ({ rule, onToggle, onTypeChange }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <tr className="border-b">
      <td className="p-2">{rule.name}</td>
      <td className="p-2">{rule.description}</td>
      <td className="p-2">
        <Switch checked={rule.enabled} onChange={() => onToggle(rule)} />
      </td>
      <td className="p-2">
        <IconButton onClick={() => setIsEditing(!isEditing)}>
          <EditIcon />
        </IconButton>
        <Collapse in={isEditing}>
          <FormControl>
            <Select value={rule.type} onChange={(e) => onTypeChange(rule, e.target.value)}>
              <MenuItem value="Automatic">Automatic</MenuItem>
              <MenuItem value="Automatic">Automatic</MenuItem>
              <MenuItem value="Custom">Custom</MenuItem>
            </Select>
          </FormControl>
        </Collapse>
      </td>
    </tr>
  );
};

export const Plan = () => {
    const [rules, setRules] = useState([
        { id: 1, category: 'Volume', type: 'Automatic', name: 'Abnormal rows count', description: 'Checks abnormal rows count in the data', enabled: true },
        { id: 2, category: 'Volume', type: 'Automatic', name: 'Abnormal rows count per segment', description: 'Checks abnormal rows count per segment in the data', enabled: true },
        { id: 3, category: 'Validity', type: 'Automatic', name: 'Null checks for all columns', description: 'Checks for null values in all columns', enabled: true },
        { id: 4, category: 'Validity', type: 'Custom', name: 'Revenue > 0', description: 'Checks that revenue is greater than 0', enabled: true },
        { id: 5, category: 'Schema', type: 'Automatic', name: 'Backward compatibility check', description: 'Checks for backward compatibility', enabled: true },
        { id: 6, category: 'Schema', type: 'Custom', name: 'Nested column existence', description: 'Checks that a nested column always exists - details.info.meta', enabled: true },
        { id: 7, category: 'Anomalies', type: 'Automatic', name: 'Abnormal numeric value spikes', description: 'Checks for abnormal spikes in numeric values', enabled: true },
        { id: 8, category: 'Data Loss', type: 'Automatic', name: 'Abnormal exceptions in decoding', description: 'Monitors for abnormal amount of exceptions in decoding', enabled: true },
        { id: 9, category: 'Validity', type: 'Custom', name: 'Age > 18', description: 'Checks that age is greater than 18', enabled: true },
        { id: 10, category: 'Schema', type: 'Automatic', name: 'Email format check', description: 'Checks that email is in the correct format', enabled: true },
        { id: 11, category: 'Anomalies', type: 'Automatic', name: 'Abnormal login attempts', description: 'Monitors for abnormal number of login attempts', enabled: true },
        { id: 12, category: 'Data Loss', type: 'Automatic', name: 'Data duplication check', description: 'Monitors for data duplication', enabled: true },
      ]);
      

  const handleToggle = (rule) => {
    setRules(rules.map(r => r.id === rule.id ? { ...r, enabled: !r.enabled } : r));
  };

  const handleTypeChange = (rule, newType) => {
    setRules(rules.map(r => r.id === rule.id ? { ...r, type: newType } : r));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Rule Editor</h1>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Description</th>
            <th className="text-left p-2">Enabled</th>
            <th className="text-left p-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {rules.map(rule => (
            <Rule key={rule.id} rule={rule} onToggle={handleToggle} onTypeChange={handleTypeChange} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Plan;
