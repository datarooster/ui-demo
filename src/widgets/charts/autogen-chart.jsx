import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

export const AutogenChart = () => {
  const [data, setData] = useState([]);
  const [times, setTimes] = useState([]);
  const [t, setT] = useState(20);
  const [chartOptions, setChartOptions] = useState({});

  const generateData = () => {
    const now = new Date();
    const timestamps = [];
    const values = [];
    let currentValue = Math.floor(Math.random() * 10000); // Random starting value

    for (let i = 0; i < t; i++) {
      const timestamp = (now.getTime() - i * 1000);
      // const timestamp = 1595391420000 - i*60000;
      timestamps.push(timestamp);
      values.push(currentValue);

      const delta = Math.floor(Math.random() * 10000); // Change this value to adjust the increment/decrement

      currentValue += Math.random() < 0.5 ? -delta : delta; // Increment or decrement by delta randomly
      currentValue = Math.max(0, currentValue); // Ensure value is not negative
    }

    setData(values);
    // setTimes(timestamps);
    setChartOptions({
      chart: {
        type: "line",
        zoom: {
          enabled: true,
        },
      },
      tooltip: {
        x: {
          format: 'dd/MM/yyyy HH:mm'
        },
      },
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["red"],
      stroke: {
        lineCap: "round",
        curve: 'smooth',
      },
      markers: {
        size: 5,
      },
      
      xaxis: {
        type: 'datetime',
        
        categories: timestamps,
      },
      yaxis: {
        title: "Messages per sec",
        
      },
    });
  };

  useEffect(() => {
    generateData();
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     let currentValue = data[data.length-1] ;
  //     const delta = Math.floor(Math.random() * 10000); // Change this value to adjust the increment/decrement

  //     currentValue += Math.random() < 0.5 ? -delta : delta; // Increment or decrement by delta randomly
  //     let array = [...data, currentValue];
  //     array.shift();
  //     setData(array);
  //   }, 1000);
  //   return () => {
  //     window.clearInterval(interval); // clear the interval in the cleanup function
  //   };
  // }, [data]); // pass the data as a dependency (because you are using it inside the effect)

  return (
    <Chart
      options={chartOptions}
      series={[{
          "name": "Total",
          data
      }]}
      width="100%"
      height={300}
    />
  );
};

export default AutogenChart;
