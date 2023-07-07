import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

const AiPromptInput = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (event, value) => {
    onChange(value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const exampleOptions = [
    'Monitor Count spikes per segment org_id+user_id on 30m windows', 
    'Track when data loss detected continously more than 1 hour', 
    'make sure each tenant (track by tenant_id) has revenue bigger than 0 at least once per 30 minutes'];

  return (
    <Autocomplete
      options={exampleOptions}
      value={value}
      onChange={handleInputChange}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Describe what to monitor..."
          className="text-white"
          value={value}
          onChange={handleInputChange}
        />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          {option}
        </li>
      )}
      getOptionLabel={(option) => option}
      open={isFocused && exampleOptions.length > 0}
    />
  );
};

export default AiPromptInput;
