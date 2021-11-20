import React from "react";
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { allColors } from "../variables/categories";
import { customLayout, customConfig } from "./configs";

const Plot = createPlotlyComponent(Plotly);

var emotionData = {
  x: [
    "2019-01-01 00:00",
    "2019-01-01 01:00",
    "2019-01-01 12:00",
    "2019-01-01 12:30",
    "2019-01-01 14:00",
    "2019-01-01 17:00",
    "2019-01-01 18:00",
    "2019-01-01 19:30",
    "2019-01-01 20:00",
    "2019-01-01 21:00",
    "2019-01-01 22:00",
    "2019-01-01 23:00",
    "2019-01-01 24:00",
  ],
  y: [5, 5, 10, 10, 8, 8, 6, 6, 3, 3, 7, 4, 4],
  mode: "lines",
};

var usageData = [
  {
    startDate: "2019-01-01 04:00",
    endDate: "2019-01-01 06:00",
    category: "Entertainment",
  },
  {
    startDate: "2019-01-01 09:00",
    endDate: "2019-01-01 12:00",
    category: "SNS",
  },
  {
    startDate: "2019-01-01 13:00",
    endDate: "2019-01-01 15:00",
    category: "Communication",
  },
  {
    startDate: "2019-01-01 20:00",
    endDate: "2019-01-01 23:00",
    category: "Productivity",
  },
];

var traces = [];
usageData.map((d) => {
  var trace = {
    x: [d.startDate, d.endDate],
    y: [0, 0],
    mode: "lines",
    line: { width: 20, color: allColors[d.category][0] },
    showlegend: false,
  };
  traces.push(trace);
});

const DailyGraph = () => {
  return (
    <>
      <Plot
        style={{ width: "100%" }}
        data={[emotionData]}
        layout={{
          margin: { l: 50, r: 50, b: 0, t: 20 },
          height: 200,
          autoscale: false,
          xaxis: {
            autorange: false,
            range: ["2019-01-01", "2019-01-02"],
            tick0: 0,
            fixedrange: true,
          },
          yaxis: {
            autorange: false,
            range: [1, 10.1],
            tick0: 1,
            fixedrange: true,
            showticklabels: true,
          },
          paper_bgcolor: "#f9fbff",
          plot_bgcolor: "#f9fbff",
        }}
        config={customConfig}
      />
      <Plot
        style={{ width: "100%" }}
        data={traces}
        layout={{
          height: 100,
          xaxis: {
            title: "",
            titlefont: {
              size: 10,
            },
            tickfont: {
              size: 10,
            },
            range: ["2019-01-01", "2019-01-02"],
            fixedrange: true,
            ticks: "outside",
            showticklabels: true,
            showgrid: true,
          },
          yaxis: {
            title: "",
            titlefont: {
              size: 10,
            },
            tickfont: {
              size: 10,
            },
            range: [-0.5, 0.5],
            fixedrange: true,
            showgrid: false,
            showticklabels: false,
          },
          legend: {
            orientation: "h",
            x: 0.5,
            y: -0.2,
            xanchor: "center",
          },
          margin: { l: 50, b: 50, r: 50, t: 0 },
          paper_bgcolor: "#f9fbff",
          plot_bgcolor: "#f9fbff",
        }}
        config={customConfig}
      />
    </>
  );
};

export default DailyGraph;
