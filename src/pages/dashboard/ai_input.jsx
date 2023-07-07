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

const AiPromptInput = ({value, onChange}) => {
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
    'Example 1',
    'Example 2',
    'Example 3',
    // Add more example options as needed
  ];

  return (
    <Autocomplete
      options={exampleOptions}
      freeSolo
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
      renderOption={(option) => option}
      open={isFocused && exampleOptions.length > 0}
      // You can customize the appearance and behavior further using other Autocomplete props
    />
  );
};

export default AiPromptInput;
