import React from "react";
import { Chart } from "react-charts";

export function HealthChart({showSegments}) {
  
  let data = [
        {
          label: "Total Health",
          data: [],
        },
        {
            label: "Merchant 1",
            data: [],
          },
          {
            label: "Merchant 2",
            data: [],
          },
          {
            label: "Merchant 3",
            data: [],
          },
          {
            label: "Merchant 4",
            data: [],
          }
      ];

  
  const startTime = new Date(); // Get the current time
  
  // Generate data points for 10 minutes
  for (let i = 0; i < 10; i++) {
    const time = new Date(startTime.getTime() + i * 30 * 1000); // Increment time by 30 seconds
  
    // Generate a random value between 80 and 85
    const value = Math.random() * (8) + 80;
  
    // Add the data point to the data array
    data[0].data.push({
      primary: time,
      secondary: value
    });

    if (showSegments){

  
        for (let j=1; j<5; j++){
          const valu3 = Math.random() * (20) + 80;
      
          // Add the data point to the data array
          data[j].data.push({
            primary: time,
            secondary: valu3
          });
        }
      }
  }

  // Generate data points for 10 minutes
  for (let i = 10; i < 17; i++) {
    const time = new Date(startTime.getTime() + i * 30 * 1000); // Increment time by 30 seconds
  
    // Generate a random value between 80 and 85
    const value = Math.random() * (5) + 40;
  
    // Add the data point to the data array
    data[0].data.push({
      primary: time,
      secondary: value
    });

    if (showSegments){
        const valu2 = Math.random() * (3) + 0;
      
        // Add the data point to the data array
        data[1].data.push({
          primary: time,
          secondary: valu2
        });
  
        for (let j=2; j<5; j++){
          const valu3 = Math.random() * (3) + 80;
      
          // Add the data point to the data array
          data[j].data.push({
            primary: time,
            secondary: valu3
          });
        }
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
        elementType: 'bar',
        min: 0,
      max:100,
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

