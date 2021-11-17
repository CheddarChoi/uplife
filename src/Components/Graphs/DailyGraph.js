import React from "react";
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

var usageData = [
  {
    startDate: "2016-01-01 04:00",
    endDate: "2016-01-01 06:00",
    category: "Entertainment",
  },
  {
    startDate: "2016-01-01 09:00",
    endDate: "2016-01-01 12:00",
    category: "SNS",
  },
  {
    startDate: "2016-01-01 13:00",
    endDate: "2016-01-01 15:00",
    category: "Communication",
  },
  {
    startDate: "2016-01-01 20:00",
    endDate: "2016-01-01 23:00",
    category: "Productivity",
  },
];

var traces = [];
usageData.map((d) => {
  var trace = {
    x: [d.startDate, d.endDate],
    y: [0, 0],
    mode: "lines",
    line: { width: 20 },
    showlegend: false,
  };
  traces.push(trace);
});

const DailyGraph = () => {
  var config = {
    displayModeBar: false,
  };

  return (
    <>
      <Plot
        data={[
          {
            x: [
              "2016-01-01 00:00",
              "2016-01-01 01:00",
              "2016-01-01 12:00",
              "2016-01-01 12:30",
              "2016-01-01 14:00",
              "2016-01-01 17:00",
              "2016-01-01 18:00",
              "2016-01-01 19:30",
              "2016-01-01 20:00",
              "2016-01-01 21:00",
              "2016-01-01 22:00",
              "2016-01-01 23:00",
              "2016-01-01 24:00",
            ],
            y: [5, 5, 10, 10, 8, 8, 6, 6, 3, 3, 7, 4, 4],
            name: "Emotion Rate",
            marker: {
              size: 1,
            },
          },
        ]}
        layout={{
          // autosize: true,
          // rangemode: "tozero",
          // width: 500,
          margin: { l: 50, r: 0, b: 0, t: 20 },
          height: 200,
          autoscale: false,
          xaxis: {
            autorange: false,
            range: ["2016-01-01", "2016-01-02"],
            tick0: 0,
            dtick: 3,
          },
          yaxis: {
            autorange: false,
            range: [1, 10],
            tick0: 1,
            dtick: 3,
            showticklabels: true,
          },
        }}
        config={config}
      />
      <br />
      <Plot
        data={traces}
        layout={{
          hovermode: !1,
          height: 50,
          xaxis: {
            title: "",
            titlefont: {
              size: 10,
            },
            tickfont: {
              size: 10,
            },
            range: ["2016-01-01", "2016-01-02"],
            showticklabels: true,
            showgrid: true,
            zerolinecolor: "#969696",
            zerolinewidth: 1,
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
            showgrid: false,
            showticklabels: false,
            zerolinecolor: "#969696",
            zerolinewidth: 1,
          },
          legend: {
            orientation: "h",
            x: 0.5,
            y: -0.2,
            xanchor: "center",
          },
          margin: { l: 50, b: 0, r: 0, t: 0 },
        }}
        config={config}
      />
    </>
  );
};

export default DailyGraph;
