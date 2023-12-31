import React, { useState } from 'react';
import {
  Box,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Button,
  IconButton,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { sendOpenAIRequest } from './io';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AiPromptInput from './ai_input';

const seedData = [
  "ProductID",
  "ProductName",
  "Category",
  "Price",
  "Quantity",
  "CustomerID",
  "PurchaseDate",
];

const RuleEditor = ({
  rule,
  onRuleChange,
  onSegmentColumnsChange,
  onSave
}) => {
  const [aiPrompt, setAiPrompt] = useState(
    '', 
  );
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleGenerateRule = async () => {
    if (typeof apiKey === 'undefined') {
      setSnackbarMessage('Please enter an API key.');
      setSnackbarOpen(true);
      return;
    }

    if (!aiPrompt) {
      setSnackbarMessage('AI prompt should not be empty.');
      setSnackbarOpen(true);
      return;
    }

    try {
      setLoading(true);
      const res = await sendOpenAIRequest(aiPrompt);
      onRuleChange(rule.id, res);
      setShowAIPrompt(false);
    } catch (error) {
      console.error(error);
      setSnackbarMessage('An error occurred while generating the rule.');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAIPrompt = () => {
    setShowAIPrompt((prevValue) => !prevValue);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <div
        className="w-full h-full bg-blue-500 flex justify-center items-center"
        style={{
          backgroundColor: !showAIPrompt
            ? 'rgb(33 150 243 / var(--tw-bg-opacity))'
            : 'white',
          borderColor: showAIPrompt
            ? 'rgb(33 150 243 / var(--tw-bg-opacity))'
            : 'white',
          borderStyle: showAIPrompt ? 'solid' : '',
          borderWidth: showAIPrompt ? '1px' : '',
          transition: 'all 1s ease',
        }}
      >
        {!showAIPrompt && (
          <IconButton
            className="w-full h-full"
            onClick={handleToggleAIPrompt}
            color="white"
          >
            <AutoFixHighIcon className="text-white" />
          </IconButton>
        )}

        {showAIPrompt ? (
          <Box
            display="flex"
            className="p-3 pt-6 w-full text-white"
            flexDirection="column"
            gap={2}
          >
            <FormControl sx={{ width: '100%' }}>
              
              <AiPromptInput value={aiPrompt}
                onChange={setAiPrompt}/>
            </FormControl>
            <FormControl sx={{ width: '150' }}>
              <Button onClick={handleGenerateRule} disabled={isLoading}>
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <>
                    <span>Generate</span>
                    <br />
                    <AutoFixHighIcon />
                  </>
                )}
              </Button>
            </FormControl>
          </Box>
        ) : null}
      </div>

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
  onChange={(e) => onRuleChange(rule.id, { action: e.target.value })}
>
  {rule.category === 'Validity' && [
    <MenuItem key="not_null" value="not_null">
      Not Null
    </MenuItem>,
    <MenuItem key="in_set" value="in_set">
      In Set
    </MenuItem>,
    <MenuItem key="condition" value="condition">
      Condition
    </MenuItem>,
  ]}
  {rule.category === 'Volume' && [
    <MenuItem key="spikes" value="spikes">
      Spikes
    </MenuItem>,
    <MenuItem key="drops" value="drops">
      Drops
    </MenuItem>,
  ]}
  {rule.category === 'Schema' && [
    <MenuItem key="compatibility" value="compatibility">
      Compatibility
    </MenuItem>,
    <MenuItem key="new_columns" value="new_columns">
      New Columns
    </MenuItem>,
    <MenuItem key="column_exists" value="column_exists">
      Column Exists
    </MenuItem>,
  ]}
  {rule.category === 'Data Loss' && (
    <MenuItem key="decoding_errors" value="decoding_errors">
      Decoding Errors
    </MenuItem>
  )}
  {rule.category === 'Anomalies' && [
    <MenuItem key="value_spikes" value="value_spikes">
      Value Spikes
    </MenuItem>,
    <MenuItem key="value_drops" value="value_drops">
      Value Drops
    </MenuItem>,
  ]}
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
      <Button onClick={() => onSave(rule)} disabled={isLoading}>
        Save
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default RuleEditor;
