import React, {useState} from "react";
import {
    Card,

    CardBody
  } from "@material-tailwind/react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


import {
    ClockIcon,
    CheckIcon,
    EllipsisVerticalIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    HeartIcon
  } from "@heroicons/react/24/outline";

  import WarningIcon from '@mui/icons-material/Warning';
  import DangerousIcon from '@mui/icons-material/Dangerous';
  
function createData(
  category, level, title, summary
) {
  return {
    category, level, title, summary,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.category}
        </TableCell>
        <TableCell align="left">{row.level}</TableCell>
        <TableCell align="left">{row.title}</TableCell>
        <TableCell align="left">{row.summary}</TableCell>
        <TableCell align="center">

            <Button variant="contained">
                Resolve
            </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
    createData('Volume',  <><DangerousIcon/></>, 'Total volume drop', 'Average volume has dropped by 25% since 2 hours ago'),
    createData('Volume', <><WarningIcon/></>, 'Segment volume drop', 'Average volume has dropped by 16% for segment "customers-acme" since 2 hours ago'),
    createData('Validity',  <><DangerousIcon/></>, '“title” completeness', '20% of segments show an increased amount of NULL values in column "title"'),
    createData('Validity', <><WarningIcon/></>, 'Unidentified value', 'New value observed in column "source_type" with value "META"'),
    createData('Schema',  <><DangerousIcon/></>, 'Missing column', 'Column "address" is missing in the dataset'),
    createData('Schema', <><WarningIcon/></>, 'Column mismatch', 'Mismatch found in column "price" data type, expected integer'),
    createData('Column Anomalies',  <><DangerousIcon/></>, 'Outliers in "revenue"', 'Multiple outliers detected in the "revenue" column'),
    createData('Column Anomalies', <><WarningIcon/></>, 'Missing values in "quantity"', 'Significant amount of missing values found in the "quantity" column'),
  ];
  

export function VolAnomaliesTable (){

  return (<>

    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Issue Category</TableCell>
            <TableCell align="left">Level</TableCell>
            <TableCell>Issue Title</TableCell>
            
            <TableCell align="left">Summary</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </>
  );
}