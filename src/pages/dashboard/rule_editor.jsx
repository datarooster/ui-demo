import React, {useState} from 'react';
import {
  Box,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Button,
} from '@mui/material';
import {sendOpenAIRequest} from './io';

const seedData = ["ProductID", "ProductName", "Category", "Price", "Quantity", "CustomerID", "PurchaseDate"];


const RuleEditor = ({
  rule,
  onRuleChange,
  onSegmentColumnsChange,
  onSave,
}) => {

    const [aiPrompt, setAiPrompt] = useState('create a rule to make sure each row donesnt have null in column row_id, the resolution is every 1 hour. no need it to be segmented, do it all over the data');


    const handleGenerateRule = async () => {
        try {
            const res = await sendOpenAIRequest(aiPrompt);
            onRuleChange(rule.id, res);
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" flexDirection="row" gap={2}>
        <FormControl sx={{ width: '100%' }}>
          <TextField
            placeholder="AI Prompt"
            value={aiPrompt}
            onChange={(e) =>
                handleGenerateRule(e.target.value)
            }
          />
        </FormControl>
        <FormControl sx={{ width: '150' }}>
          <Button onClick={handleGenerateRule}>Generate Rule</Button>
        </FormControl>
      </Box>
      <Box display="flex" flexDirection="row" gap={2}>
        <FormControl sx={{ width: 300 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={rule.category}
            onChange={(e) =>
              onRuleChange(rule.id, { category: e.target.value })
            }
          >
            <MenuItem value="Volume">Volume</MenuItem>
            <MenuItem value="Validity">Validity</MenuItem>
            <MenuItem value="Schema">Schema</MenuItem>
            <MenuItem value="Data Loss">Data Loss</MenuItem>
            <MenuItem value="Anomalies">Anomalies</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: 300 }}>
          <InputLabel>Action</InputLabel>
          <Select
            value={rule.action}
            id="demo-simple-select"
            onChange={(e) =>
              onRuleChange(rule.id, { action: e.target.value })
            }
          >
            {rule.category === 'Validity' && (
              [
                <MenuItem key="not_null" value="not_null">
                  Not Null
                </MenuItem>,
                <MenuItem key="in_set" value="in_set">
                  In Set
                </MenuItem>,
                <MenuItem key="condition" value="condition">
                  Condition
                </MenuItem>
              ]
            )}

            {rule.category === 'Volume' && (
              [
                <MenuItem key="spikes" value="spikes">
                  Spikes
                </MenuItem>,
                <MenuItem key="drops" value="drops">
                  Drops
                </MenuItem>
              ]
            )}

            {rule.category === 'Schema' && (
              [
                <MenuItem key="compatibility" value="compatibility">
                  Compatibility
                </MenuItem>,
                <MenuItem key="new_columns" value="new_columns">
                  New Columns
                </MenuItem>,
                <MenuItem key="column_exists" value="column_exists">
                  Column Exists
                </MenuItem>
              ]
            )}

            {rule.category === 'Data Loss' && (
              
                <MenuItem key="decoding_errors" value="decoding_errors">
                  Decoding Errors
                </MenuItem>
              
            )}

            {rule.category === 'Anomalies' && (
              [
                <MenuItem key="value_spikes" value="value_spikes">
                  Value Spikes
                </MenuItem>,
                <MenuItem key="value_drops" value="value_drops">
                  Value Drops
                </MenuItem>
              ]
            )}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 300 }}>
          <TextField
            placeholder="Expression"
            value={rule.expression || ''}
            onChange={(e) =>
              onRuleChange(rule.id, { expression: e.target.value })
            }
          />
        </FormControl>
      </Box>
      <Box display="flex" flexDirection="row" gap={2}>
        <FormControl sx={{ width: 300 }}>
          <InputLabel>Segment</InputLabel>
          <Select
            value={rule.segment}
            onChange={(e) =>
              onRuleChange(rule.id, { segment: e.target.value })
            }
          >
            <MenuItem value="All Data">All Data</MenuItem>
            <MenuItem value="By Segment">By Segment</MenuItem>
          </Select>
        </FormControl>
        {rule.segment === 'By Segment' && (
          <FormControl sx={{ width: 300 }}>
            <Autocomplete
              multiple
              options={seedData}
              value={rule.segmentColumns}
              onChange={(e, newSegmentColumns) =>
                onSegmentColumnsChange(rule, newSegmentColumns)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Segment Columns"
                  placeholder="Columns"
                />
              )}
              freeSolo
              onKeyDown={(event) => {
                if (event.key === 'Enter' && event.target.value) {
                  const newValue = [...rule.segmentColumns, event.target.value];
                  onSegmentColumnsChange(rule, newValue);
                  event.target.value = '';
                }
              }}
            />
          </FormControl>
        )}
      </Box>
      <Box display="flex" flexDirection="row" gap={2}>
        <FormControl sx={{ width: 300 }}>
          <InputLabel>Window Size</InputLabel>
          <Select
            value={rule.windowSize}
            onChange={(e) =>
              onRuleChange(rule.id, { windowSize: e.target.value })
            }
          >
            <MenuItem value="5m">5m</MenuItem>
            <MenuItem value="15m">15m</MenuItem>
            <MenuItem value="30m">30m</MenuItem>
            <MenuItem value="1h">1h</MenuItem>
            <MenuItem value="24h">24h</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button onClick={() => onSave(rule)}>Save</Button>
    </Box>
  );
};

export default RuleEditor;
