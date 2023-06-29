import React from "react";
import { Chart } from "react-charts";

export function AnomaliesChart({showSegments}) {
  let data;

  if (showSegments){
    data = [
      {
        label: "Merchant 1",
        data: [
          {
            primary: 'shop_id',
            secondary: 100,
          },
          {
            primary: 'product_id',
            secondary: 100
          },
          {
            primary: 'total_shops',
            secondary: 100,
          },
          {
            primary: 'revenue',
            secondary: 100
          }
        ],
      },
      {
        label: "Merchant 2",
        data: [
          {
            primary: 'shop_id',
            secondary: 100,
          },
          {
            primary: 'product_id',
            secondary: 100
          },
          {
            primary: 'total_shops',
            secondary: 100,
          },
          {
            primary: 'revenue',
            secondary: 100
          }
        ],
      },
      {
        label: "Merchant 3",
        data: [
          {
            primary: 'shop_id',
            secondary: 100,
          },
          {
            primary: 'product_id',
            secondary: 100
          },
          {
            primary: 'total_shops',
            secondary: 40,
          },
          {
            primary: 'revenue',
            secondary: 80
          }
        ],
      },
      {
        label: "Merchant 4",
        data: [
          {
            primary: 'shop_id',
            secondary: 100,
          },
          {
            primary: 'product_id',
            secondary: 100
          },
          {
            primary: 'total_shops',
            secondary: 30,
          },
          {
            primary: 'revenue',
            secondary: 70
          }
        ],
      },
      {
        label: "Merchant 5",
        data: [
          {
            primary: 'shop_id',
            secondary: 100,
          },
          {
            primary: 'product_id',
            secondary: 100
          },
          {
            primary: 'total_shops',
            secondary: 20,
          },
          {
            primary: 'revenue',
            secondary: 65
          }
        ],
      },
    ];
  } else {
    data = [
      {
        label: "Total Column Validity",
        data: [
          {
            primary: 'shop_id',
            secondary: 100,
          },
          {
            primary: 'product_id',
            secondary: 100
          },
          {
            primary: 'total_shops',
            secondary: 40,
          },
          {
            primary: 'revenue',
            secondary: 70
          }
        ],
      },
    ];
  }
  
  const primaryAxis = React.useMemo(
    () => ({
      position: "left",
      getValue: (datum) => datum.primary,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        position: "bottom",
        elementType: 'bar',
        min: 0,
        max: 100,
        getValue: (datum) => datum.secondary,
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
