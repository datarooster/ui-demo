import React from "react";
import { useState } from 'react';

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
import { HealthChart, VolChart } from "@/widgets/charts";
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

import {VolAnomaliesTable, SamplesTable} from "@/widgets/tables";




export function ProbeView() {
  const [value, onChange] = useState([new Date(), new Date()]);
  const [selectedValueSegments, setSelectedValueSegments] = useState(false);

  const handleSetSelectedValueSegments = (event) => {
    setSelectedValueSegments(event.target.checked);
  };

  return (
    <div className="mt-12">
      <div className="mb-6">
      
      <div className="float-right	">
      <Button variant="contained" className="flex items-center gap-3">
      Edit Rules
        <PencilIcon strokeWidth={2} className="h-5 w-5"/>
            
        </Button>
      </div>
        <Typography variant="h3" className="text-blue-500">
            Source: <b>kafka-consumer-group-shops</b>
        </Typography>
        
      </div>
      <div className="flex flex-row flex-start gap-x-6">
        <div className="w-60">
          <img className=" shadow shadow-blue-gray-900/50"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Apache_Spark_logo.svg/1024px-Apache_Spark_logo.svg.png?20210416091439" alt="avatar" size="xxl" />
        </div>
        <div className=" flex flex-col justify-center gap-y-2">
        <Typography variant="p" color="blue-gray">
        last update: 3 minutes ago
          </Typography>
          <Typography variant="p" color="blue-gray">
          normal batches at 15 minutes
          </Typography>
          <Typography variant="p" color="blue-gray">
          triggered by Airflow
          </Typography>
          <Typography variant="p" color="blue-gray">
          code: spark_app_customers.py Line 1253
          </Typography>

        </div>

      </div>
      <div className="mt-12">
      <Card className="mb-6"><CardBody>
        <div className="gap-4 flex items-center flex-row justify-items-end justify-end">
          <div class="w-full">
            <DateTimeRangePicker />
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
          
            
            <div className="w-full mt-6 h-40">
              <VolChart showSegments={selectedValueSegments}/>
            </div>
         

          <div className="w-full mt-6">
              <SamplesTable/>
          </div>
                
        </div>

      </CardBody></Card>
      </div>
      {/* <div className="mb-6 mt-12 grid grid-cols-1 gap-y-6 gap-x-6 md:grid-cols-1 xl:grid-cols-1">
        <div className="mb-1">
          <Typography variant="h4" color="blue-gray">
                Volume Analysis - 8 Anomalies
          </Typography>
        </div>
        
        <Card className="mb-6"><CardBody>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
              
                  <div className="flex items-center justify-around flex-col">
                    <Typography variant="h5" color="blue-gray">
                    Total Volume score
                    </Typography>
                    <Typography variant="h2" className="text-orange-500 text-7xl">
                      76%
                    </Typography>
                  </div>

                  
            </div>
          
          <div className=" w-full col-span-2">
            <VolChart showSegments={selectedValueSegments}/>
          </div>
        </div>

        <div className="w-full mt-6">
            <VolAnomaliesTable/>
        </div>
        </CardBody>
        
        </Card>
              
      </div>

      

      <div className="mb-6 mt-12 grid grid-cols-1 gap-y-6 gap-x-6 md:grid-cols-1 xl:grid-cols-1">
        <div className="mb-1">
          <Typography variant="h4" color="blue-gray">
                Validity Analysis - 3 Anomalies
          </Typography>
        </div>
        
        <Card className="mb-6"><CardBody>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
              
                  <div className="flex items-center justify-around flex-col">
                    <Typography variant="h5" color="blue-gray">
                    Total Validity score
                    </Typography>
                    <Typography variant="h2" className="text-green-500 text-7xl">
                      97%
                    </Typography>
                  </div>

                  
            </div>
          
          <div className=" w-full col-span-2">
            <VolChart showSegments={selectedValueSegments}/>
          </div>
        </div>

        <div className="w-full mt-6">
            <VolAnomaliesTable/>
        </div>
        </CardBody>
        
        </Card>
              
      </div> */}

      


    </div>
  );
}

export default ProbeView;
