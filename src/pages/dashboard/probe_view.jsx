import React from "react";
import { useState } from 'react';
import Box from '@mui/material/Box';

import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  IconButton,
  Button,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  Switch
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  HeartIcon,
  PencilIcon
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { AnomaliesChart, ValChart, VolChart, LossChart, SchemaView } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";

import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker'
import '@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import {AnomaliesTable, SamplesTable} from "@/widgets/tables";


import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Badge from '@mui/material/Badge';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );

  
}


function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export function ProbeView() {
  const [value, onChange] = useState([new Date(), new Date()]);
  const [selectedValueSegments, setSelectedValueSegments] = useState(false);

  const handleSetSelectedValueSegments = (event) => {
    setSelectedValueSegments(event.target.checked);
  };

  const [tabVal, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="mt-8" style={{minHeight: "100vh"}}>
      <div className="mb-6">
      
      <div className="float-right	">
      <Button size="lg" variant="contained" className="flex items-center gap-3">
      Edit Rules
        <PencilIcon strokeWidth={2} className="h-5 w-5"/>
            
        </Button>
      </div>
        <Typography variant="h3" className="text-blue-500">
            Source: <b>kafka-consumer-group-shops</b>
        </Typography>
        
      </div>
      <div className="flex flex-row flex-start gap-x-6">
        <div className="w-40">
          <img className=" shadow shadow-blue-gray-900/50"  src="/img/sparklogo.png" alt="avatar" size="xl" />
        </div>
        <div className=" flex flex-col justify-center gap-y-2">
        <Typography variant="paragraph" color="blue-gray">
        last updated <b>3 minutes ago</b>
          </Typography>
          <Typography variant="paragraph" color="blue-gray">
          normal batches at  <b>15 minutes</b>
          </Typography>
          <Typography variant="paragraph" color="blue-gray">
          triggered by  <b>Airflow</b>
          </Typography>
          <Typography variant="paragraph" color="blue-gray">
          source code:  <b>spark_app_customers.py Line 1253</b>
          </Typography>

        </div>

      </div>
      <div className="mt-12 ">

        <div className="gap-4 flex items-center flex-row justify-items-end justify-end mb-12">
          <div class="w-full">
            {/* <DateTimeRangePicker /> */}
            <Typography variant="h6" className="text-red-500">
                Detected 3 issues in the last 30 minutes
              </Typography>

              <Typography variant="h6" className="">
                Detected 8 issues in the last 24 Hours
              </Typography>
          </div>
          <Switch
                  id="doLive"
                  label="Live"
                  defaultChecked={true}
                  labelProps={{
                    className: "text-sm font-normal text-blue-gray-500",
                  }}
                  />

              <Switch
                  id="showBreakdown"
                  label="Segments"
                  checked={selectedValueSegments} onChange={handleSetSelectedValueSegments} 
                  labelProps={{
                    className: "text-sm font-normal text-blue-gray-500",
                  }}
                  />
            
        
        </div>
      
        <div className="mb-6 grid grid-cols-1 gap-y-6 gap-x-6 md:grid-cols-1 xl:grid-cols-1">
          
        <Box className="w-full"
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', minHeight: 300 }}
    >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={tabVal}
              onChange={handleTabChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Tab label={
                <Badge color="primary" variant="dot">
                <Typography variant="h6">Volume</Typography>
              </Badge>

              } {...a11yProps(0)}/>
              <Tab label={
                <Badge color="primary" variant="dot">
                <Typography variant="h6">Validity</Typography>
              </Badge>

              } {...a11yProps(1)}/>
              <Tab label={
                <Badge >
                <Typography variant="h6">Schema</Typography>
              </Badge>

              } {...a11yProps(2)}/>
              <Tab label={
                <Badge >
                <Typography variant="h6">Anomalies</Typography>
              </Badge>

              } {...a11yProps(3)}/>
              <Tab label={
                <Badge color="primary" variant="dot">
                <Typography variant="h6">Loss</Typography>
              </Badge>

              } {...a11yProps(4)}/>

              <Tab label={
                <Typography variant="h6">Samples</Typography>

              } {...a11yProps(4)}/>
            </Tabs>
          
              <TabPanel value={tabVal} className="w-full" index={0}>
                <div className="h-60 ">
                  <VolChart showSegments={selectedValueSegments}/>
                  
                </div>
                  <div className="w-full mt-6 mb-24">
                      <AnomaliesTable category="Volume"/>
                  </div>
                </TabPanel>

                <TabPanel value={tabVal} className="w-full" index={1}>
                {/* <div className="h-96">
                  <ValChart showSegments={selectedValueSegments}/>
                </div> */}
                <div className="w-full mb-24">
                      <AnomaliesTable category="Validity"/>
                  </div>
                </TabPanel>

                <TabPanel value={tabVal} className="w-full" index={2}>
                <div className="">
                  <SchemaView/>
                </div>
                </TabPanel>

                <TabPanel value={tabVal} className="w-full" index={3}>
                <div className="h-96">
                  <AnomaliesChart showSegments={selectedValueSegments}/>
                </div>
                <div className="w-full mt-6 mb-24">
                      <AnomaliesTable category="Anomalies"/>
                  </div>
                </TabPanel>

                <TabPanel value={tabVal} className="w-full" index={4}>
                <div className="h-60">
                  <LossChart showSegments={selectedValueSegments}/>
                </div>
                <div className="w-full mt-6 mb-24">
                      <AnomaliesTable category="Loss"/>
                  </div>
                </TabPanel>

                <TabPanel value={tabVal} className="w-full" index={5}>
                <SamplesTable/>
                </TabPanel>
        
          </Box>
            
          
                
        </div>

      </div>
      


    </div>
  );
}

export default ProbeView;
