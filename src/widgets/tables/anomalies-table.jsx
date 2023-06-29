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
  level, title, summary
) {
  return {
    level, title, summary,
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
          {row.level}
        </TableCell>
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


  

export function AnomaliesTable ({category}){
  let rows = [];
  switch (category){
      case 'Volume':
        rows = [
          createData(<><DangerousIcon/></>, 'Volume drop', 'Average volume has dropped by 25% since 2 hours ago'),
          createData(<><WarningIcon/></>, 'Merchant drop', 'Average volume has dropped by 16% for segment "customers-acme" since 2 hours ago'),
        ];
        break;
      case 'Validity':
          rows = [
            createData( <><DangerousIcon/></>, '“title” completeness', '20% of segments show an increased amount of NULL values in column "title"'),
            createData(<><WarningIcon/></>, 'Unidentified value', 'New value observed in column "source_type" with value "META"'),
          ];
          break;
      case 'Anomalies':
        rows = [
          createData(<><DangerousIcon/></>, 'Abnormal values', 'Abnormal values detected in the "total_shops" column'),
          createData(<><WarningIcon/></>, 'Outliers in "revenue"', 'Increased outliers detected in the "revenue" column'),
    
        ];
        break;
      case 'Loss':
          rows = [
            createData(<><WarningIcon/></>, 'Loss detected', '1500+ Errors: "Protocol message contained a tag with an invalid wire type"'),
            createData(<><WarningIcon/></>, 'Loss detected', '10K Errors: "Decoder throws exception when decoding an empty map"'),
          ];
          break;
        

  }
  return (<>

    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
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