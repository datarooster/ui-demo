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
import {SparkChart} from '@/widgets/charts';

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
  level, title, summary, sparkChartDataPoints
) {
  return {
    level, title, summary, sparkChartDataPoints,
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
        <TableCell align="left">
          <div className="h-10">
            <SparkChart dataPoints={row.sparkChartDataPoints}/>
          </div>
        </TableCell>
        <TableCell align="center">
            <Button variant="contained">
                Set<br/>Action
            </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Samples
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
          createData(<><DangerousIcon/></>, 'Volume drop', 'Total Volume dropped (-205%) 15 minutes ago', [100, 100, 100, 100, 100, 100, 100, 100, 25, 25, 30, 40, 25, 25, 25, 25, 25]),          
          createData(<><DangerousIcon/></>, 'Freshness Issue', 'No data from Merchant "Sony" for 24 hours', [0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
          createData(<><WarningIcon/></>, 'Spike', 'Sudden spike (+510%) for Merchant "Shopify" 2 minutes ago', [0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,100,100]),
        ];
        break;
      case 'Validity':
          rows = [
            createData( <><DangerousIcon/></>, '“revenue” completeness', '20% of segments show an increased amount of NULL values in column "revenue"', [0,0,0,0,0,0,0,50,50,50,50,50,50,60,60]),
            createData(<><WarningIcon/></>, 'Unidentified value', 'New value observed in column "source_type" with value "META"', [0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100,100]),
          ];
          break;
      case 'Anomalies':
        rows = [
          createData(<><DangerousIcon/></>, 'Abnormal values', 'Abnormal values detected in the "total_shops" column', [0,0,0,0,0,0,0,50,50,50,50,50,50,60,60]),
          createData(<><WarningIcon/></>, 'Outliers in "revenue"', 'Increased outliers detected in the "revenue" column', [0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100,100]),
        ];
        break;
      case 'Loss':
          rows = [
            createData(<><WarningIcon/></>, 'Loss detected', '1500+ Errors: "Protocol message contained a tag with an invalid wire type"', [0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100,100]),
            createData(<><WarningIcon/></>, 'Loss detected', '10K Errors: "Decoder throws exception when decoding an empty map"', [0,0,0,0,0,0,0,40,40,40,40,100,100,100,100,100,100]),
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
            <TableCell align="left" className="w-44">Trend</TableCell>
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