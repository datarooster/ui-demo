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
