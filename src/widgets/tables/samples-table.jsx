import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Typography } from '@material-tailwind/react';

const generateRandomValue = (type) => {
  switch (type) {
    case 'number':
      return Math.floor(Math.random() * 1000);
    case 'string':
      return Math.random().toString(36).substring(7);
    case 'boolean':
      return Math.random() > 0.5;
    case 'datetime':
      const randomTimestamp = new Date(
        Date.now() - Math.floor(Math.random() * 10000000000)
      );
      return randomTimestamp.toISOString();
    case 'base64':
        // Generate a fake encoded Protobuf message
        const protobufMessage = { foo: 'bar', baz: Math.floor(Math.random() * 10000000000) };
        const encodedMessage = btoa(JSON.stringify(protobufMessage));
        return encodedMessage;
    case 'stack':
       // Generate a fake stacktrace with protobuf errors
      const stacktrace = [];

      // Generate a fake error message
      const errorMessage = 'Protobuf decoding error';

      // Generate a random number of stack frames (between 1 and 5)
      const numFrames = Math.floor(Math.random() * 5) + 1;

      stacktrace.push(`ERROR: ${errorMessage}`);
      for (let i = 0; i < numFrames; i++) {
        // Generate a fake stack frame with a random function name and line number
        const functionName = `function${i}`;
        const lineNumber = Math.floor(Math.random() * 100) + 1;
        const fileName = `file${i}.js`;

        stacktrace.push(`  File "${fileName}", line ${lineNumber}, in ${functionName}`);
      }

      // Add the error message at the end of the stacktrace
      stacktrace.push(`RuntimeError: ${errorMessage}`);

      return stacktrace.join('\n');
    default:
      return type;
  }
};

const createData = (columns) => {
  const row = {};
  columns.forEach((column) => {
    row[column.key] = generateRandomValue(column.type);
  });
  return row;
};

export const SamplesTable = ({ columns, isLive }) => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);

  const toggleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    setRows((prevRows) => [
      ...prevRows,
      createData(columns),
      createData(columns),
      createData(columns),
      createData(columns),
      createData(columns),
    ]);

    if (isLive) {
      const intervalId = setInterval(() => {
        setRows((prevRows) => [
          createData(columns),
          ...prevRows.slice(0, 29), // Keep only the latest 30 rows
        ]);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isLive]);

  return (
    <>
      {/* <Typography variant="h6" className="w-full flex justify-right mb-6">
        Sampled (every sec)
      </Typography> */}
      {/* <Collapse in={open}> */}
      <TableContainer component={Paper} style={{ maxHeight: 300 }}>
        <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {columns.map((column) => (
                  <TableCell key={column.key} align="left" style={{
                    color: column.color
                        }}>
                    {row[column.key]}
                    
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* </Collapse> */}
    </>
  );
};

export default SamplesTable;
