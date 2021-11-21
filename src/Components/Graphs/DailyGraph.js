import React from "react";
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { allCategory, allColors } from "../variables/categories";
import { customConfig } from "./configs";

import emotionData from "../../static/data/emotion.json";
import usageLogData from "../../static/data/usageLog.json";

const Plot = createPlotlyComponent(Plotly);

const date2string = (date) => {
  return (
    date.toISOString().split("T")[0] +
    " " +
    date.toISOString().split("T")[1].split(".")[0]
  );
};

const DailyGraph = () => {
  var x = [];
  var y = [];
  emotionData.forEach((d) => {
    if (d.timestamp > "2019-05-06 00:00:00") {
      x.push(d.timestamp);
      y.push(d.Emotional_state);
    }
  });
  var emotionTrace = {
    x: x,
    y: y,
    mode: "markers+lines",
    name: "emotion",
    yaxis: "y2",
    showlegend: false,
  };
  console.log(emotionTrace);

  var usageData = [];
  usageLogData.forEach((d) => {
    var start = new Date(d.startTime);
    var end = new Date(d.startTime);
    end.setSeconds(end.getSeconds() + d.seconds);
    if (date2string(start) > "2019-05-06 00:00:00")
      usageData.push({
        startTime: date2string(start),
        endTime: date2string(end),
        category: d.category,
      });
  });

  var usageLogTrace = [];
  usageData.forEach((d) => {
    if (allCategory.includes(d.category)) {
      var trace = {
        x: [d.startTime, d.endTime],
        y: [0, 0],
        mode: "lines",
        name: d.category,
        line: { width: 20, color: allColors[d.category][0] },
        showlegend: false,
      };
      usageLogTrace.push(trace);
    }
  });

  return (
    <>
      <Plot
        style={{ width: "100%" }}
        data={usageLogTrace.concat(emotionTrace)}
        layout={{
          height: 400,
          xaxis: {
            title: "",
            tickfont: {
              size: 10,
            },
            range: ["2019-05-06 00:00:00", "2019-05-07 00:00:00"],
            rangeselector: {
              buttons: [
                {
                  step: "hour",
                  stepmode: "backward",
                  count: 1,
                  label: "1h",
                },
                {
                  step: "hour",
                  stepmode: "backward",
                  count: 6,
                  label: "6h",
                },
                {
                  step: "hour",
                  stepmode: "backward",
                  count: 12,
                  label: "12h",
                },
                {
                  step: "all",
                },
              ],
            },
            rangeslider: {},

            ticks: "outside",
            showticklabels: true,
            showgrid: true,
          },
          yaxis: {
            title: "",
            tickfont: {
              size: 10,
            },
            range: [-0.5, 2.5],
            fixedrange: true,
            showgrid: false,
            showticklabels: false,
          },
          yaxis2: {
            title: "",
            fixedrange: true,
            range: [-15, 10],
            showgrid: false,
            showticklabels: false,
            overlaying: "y",
            side: "left",
          },
          margin: { l: 50, b: 50, r: 50, t: 0 },
          paper_bgcolor: "#f9fbff",
          // plot_bgcolor: "#f9fbff",
        }}
        config={customConfig}
      />
    </>
  );
};

export default DailyGraph;
