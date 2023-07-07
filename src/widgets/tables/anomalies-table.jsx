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
import {SamplesTable} from "@/widgets/tables";

import {
    ClockIcon,
    CheckIcon,
    EllipsisVerticalIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    HeartIcon
  } from "@heroicons/react/24/outline";

  import { ValChartNulls, ValChartEnum, AnomalChartDrop, AnomalChartSpike } from "@/widgets/charts";

  import WarningIcon from '@mui/icons-material/Warning';
  import DangerousIcon from '@mui/icons-material/Dangerous';
  
function createData(
  level, title, when, summary, sparkChartDataPoints, collapsableContent
) {
  return {
    level, title, when, summary, sparkChartDataPoints,
    collapsableContent
  };
}

const defaultColumns = [
  { key: 'id', label: 'ID', type: 'string' },
  { key: 'timestamp', label: 'Timestamp', type: 'datetime' },
  { key: 'merchant', label: 'Merchant', type: 'string' },
  { key: 'transaction', label: 'Transaction', type: 'string' },
  { key: 'user_id', label: 'User ID', type: 'string' },
  { key: 'revenue', label: 'Revenue', type: 'number' },
];

function Row(props) {
  const { row, isLive } = props;
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
        <TableCell align="left">{row.when}</TableCell>
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
              {
                !!(row.collapsableContent) 
                  ? row.collapsableContent : 
                  <SamplesTable columns={defaultColumns} isLive={isLive} />
              }
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


  

export function AnomaliesTable ({category, isLive, showSegments}){
  let rows = [];
  switch (category){
      case 'Volume':
        rows = [
          createData(<><DangerousIcon/></>, 'Volume drop', '15 minutes ago', 'Total Volume dropped (-205%)', [100, 100, 100, 100, 100, 100, 100, 100, 25, 25, 30, 40, 25, 25, 25, 25, 25]),          
          createData(<><DangerousIcon/></>, 'Freshness Issue', '24 hours ago', 'No data from Merchant "Sony"', [0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
          createData(<><WarningIcon/></>, 'Spike','2 minutes ago', 'Sudden spike (+510%) for Merchant "Shopify"', [0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,100,100]),
        ];
        break;
      case 'Validity':
          rows = [
            createData( <><DangerousIcon/></>, '“revenue” completeness', '25 minutes ago', '+76% increased amount of NULL values in column "revenue"', [0,0,0,0,0,0,0,50,50,50,50,50,50,60,60],
                  <div className="p-6">
                    <div className="p-6 text-center">
                      <Typography variant="h6">
                          {
                            showSegments ? "Nulls over time per segment for 'revenue'" : "Total Nulls over time for 'revenue'"
                          }

                      </Typography>
                    </div>
                    <div className="h-40 p-6 mb-12">
                      <ValChartNulls showSegments={showSegments}/>
                    </div>
                    <div className="p-6">
                        <SamplesTable columns={[
                              { key: 'id', label: 'ID', type: 'string' },
                              { key: 'timestamp', label: 'Timestamp', type: 'datetime' },
                              { key: 'merchant', label: 'Merchant', type: 'Merchant1' },
                              { key: 'revenue', label: 'Revenue', type: 'null', color: 'red'},
                            ]} isLive={isLive} />
                    </div>
                  </div>),
            createData(<><WarningIcon/></>, 'Unidentified value', '1h ago', 'New value observed in column "source_type" with value "META"', [0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100,100],
                    <div className="p-6">
                    <div className="p-6 text-center">
                      <Typography variant="h6">
                          {
                            showSegments ? "'META' source_type over time per segment" : "Total 'META' source_type over time"
                          }

                      </Typography>
                    </div>
                    <div className="h-40 p-6 mb-12">
                      <ValChartEnum showSegments={showSegments}/>
                    </div>
                    <div className="p-6">
                        <SamplesTable columns={[
                                { key: 'kube_pod', label: 'Kube Pod', type: 'string' },
                                { key: 'timestamp', label: 'Timestamp', type: 'datetime' },
                                { key: 'source_type', label: 'Source Type', type: 'META', color: 'red' },
                                { key: 'count', label: 'Count', type: 'number' },

                          ]} isLive={isLive} />
                    </div>
                  </div>),
          ];
          break;
      case 'Anomalies':
        rows = [
          createData(<><DangerousIcon/></>, 'Value Drop in column', '3h ago', '"num_shops" avergae value dropped -59% from baseline', [50,50,50,50,50,0,0,0,0,0,0,0],
                    <div className="p-6">
                    <div className="p-6 text-center">
                      <Typography variant="h6">
                          {
                            showSegments ? "'Num Shops' over time per segment" : "Total 'Num Shops' over time"
                          }

                      </Typography>
                    </div>
                    <div className="h-40 p-6 mb-12">
                      <AnomalChartDrop showSegments={showSegments}/>
                    </div>
                    <div className="p-6">
                        <SamplesTable columns={[
                              { key: 'timestamp', label: 'Timestamp', type: 'datetime' },
                              { key: 'merchant', label: 'Merchant', type: 'string' },
                              { key: 'num_shops', label: 'Num Shops', type: 'number', color: 'red'},
                            ]} isLive={isLive} />
                    </div>
                  </div>
          ),
          createData(<><WarningIcon/></>, 'Value Spikes in column', '20m ago', 'Increased values detected in the "iot_alerts" column', [0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100,100],
                  <div className="p-6">
                    <div className="p-6 text-center">
                      <Typography variant="h6">
                          {
                            showSegments ? "'IOT Alerts' over time per segment" : "Total 'IOT Alerts' over time"
                          }

                      </Typography>
                    </div>
                    <div className="h-40 p-6 mb-12">
                      <AnomalChartSpike showSegments={showSegments}/>
                    </div>
                    <div className="p-6">
                        <SamplesTable columns={[
                              { key: 'timestamp', label: 'Timestamp', type: 'datetime' },
                              { key: 'tenant', label: 'Tenant', type: 'string' },
                              { key: 'iot_alerts', label: 'Iot Alerts', type: 'number', color: 'red'},
                            ]} isLive={isLive} />
                    </div>
                  </div>),
        ];
        break;
      case 'Loss':
          rows = [
            createData(<><WarningIcon/></>, 'Loss detected', '1h ago', '1500+ Errors: "Protocol message contained a tag with an invalid wire type"', [0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100,100]),
            createData(<><WarningIcon/></>, 'Loss detected', '30m ago', '10K Errors: "Decoder throws exception when decoding an empty map"', [0,0,0,0,0,0,0,40,40,40,40,100,100,100,100,100,100]),
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
            <TableCell>Issue</TableCell>
            <TableCell align="left">When</TableCell>
            <TableCell align="left">What happened</TableCell>
            <TableCell align="left" className="w-44">Trend</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} isLive={isLive}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </>
  );
}