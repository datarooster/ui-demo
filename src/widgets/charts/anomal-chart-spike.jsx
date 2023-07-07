import React from "react";
import { Chart } from "react-charts";

export function AnomalChartSpike({showSegments}) {
  
  const data = [
    {
      label: "Total Nulls in Source Type",
      data: [],
    },
    {
      label: "Kube Pod 1",
      data: [],
    },
    {
      label: "Kube Pod 2",
      data: [],
    },
    {
      label: "Kube Pod 3",
      data: [],
    },
    {
      label: "Kube Pod 4",
      data: [],
    }
  ];
  
  const startTime = new Date(); // Get the current time
  
  // Generate data points for 10 minutes
  for (let i = 0; i < 30; i++) {
    const time = new Date(startTime.getTime() + i * 30 * 1000); // Increment time by 30 seconds
  
    
    if (showSegments){
      const valu2 = Math.random() * (0) + 0;
    
      // Add the data point to the data array
      data[1].data.push({
        primary: time,
        secondary: valu2
      });

      for (let j=2; j<5; j++){
        const valu3 = Math.random() * (0) + 0;
    
        // Add the data point to the data array
        data[j].data.push({
          primary: time,
          secondary: valu3
        });
    }
    } else {
      // Generate a random value between 80 and 85
    const value = Math.random() * (0) + 0;
  
    // Add the data point to the data array
    data[0].data.push({
      primary: time,
      secondary: value
    });
    }
  }

  // Generate data points for 10 minutes
  for (let i = 30; i < 37; i++) {
    const time = new Date(startTime.getTime() + i * 30 * 1000); // Increment time by 30 seconds
  
    

    if (showSegments){
      // Generate a random value between 80 and 85
      const value2 = Math.random() * (0) + 100;
    
      // Add the data point to the data array
      data[1].data.push({
        primary: time,
        secondary: value2
      });

      for (let j=2; j<5; j++){
        const valu3 = Math.random() * (0) + 0;
    
        // Add the data point to the data array
        data[j].data.push({
          primary: time,
          secondary: valu3
        });
      }
    } else {
      // Generate a random value between 80 and 85
    const value = Math.random() * (0) + 100;
  
    // Add the data point to the data array
    data[0].data.push({
      primary: time,
      secondary: value
    });
    }
  }
  
  

  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => datum.primary,
      
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum) => datum.secondary,
        elementType: 'line',
        min: 0,
      
      scaleType: 'linear'
      },
    ],
    []
  );


  return (
    <>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
    </>
  );
}
