import React from "react";
import { Chart } from "react-charts";

export function SparkChart({dataPoints}) {
  
  const data = [
    {
      label: "Total Volume",
      data: [],
    },
  ];
  
  const startTime = new Date(); // Get the current time
  
  // Generate data points for 10 minutes
  for (let i = 0; i < dataPoints.length; i++) {
    const time = new Date(startTime.getTime() + i * 30 * 1000); // Increment time by 30 seconds
  
    // Add the data point to the data array
    data[0].data.push({
      primary: time,
      secondary: dataPoints[i]
    });

  }
  
  

  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => datum.primary,
      show: false,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum) => datum.secondary,
        show: false,
        showDatumElements: false,
        min: 0,
        max: 100
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
