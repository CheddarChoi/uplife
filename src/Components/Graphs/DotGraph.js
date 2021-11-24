import React from "react";
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

import { allCategory, allColors } from "../variables/categories";
import emotionTimeData from "../../static/data/emotionTime.json";

const Plot = createPlotlyComponent(Plotly);

var cnt = { Good: {}, Bad: {} };

var goodTraces = [];
var badTraces = [];

emotionTimeData.forEach((d) => {
  if (allCategory.includes(d.category)) {
    var timeZone = d.datetime.split(" ")[1].split(":")[0];
    if (cnt[d.condition][timeZone] === undefined)
      cnt[d.condition][timeZone] = 0;
    cnt[d.condition][timeZone] += 1;
    var trace = {
      type: "scatter",
      x: [timeZone],
      y:
        d.condition === "Good"
          ? [cnt[d.condition][timeZone]]
          : [-cnt[d.condition][timeZone]],
      mode: "markers+text",
      text: d.condition === "Good" ? ["😁"] : ["😠"],
      textfont: {
        size: 16,
        color: "black",
      },
      name: d.category,
      marker: {
        color: allColors[d.category][0],
        symbol: "circle",
        size: 24,
      },
    };
    if (d.condition === "Good") goodTraces.push(trace);
    else badTraces.push(trace);
  }
});

const goodMax = Math.max(
  ...Object.keys(cnt["Good"]).map(function (key) {
    return cnt["Good"][key];
  })
);
const badMax = Math.max(
  ...Object.keys(cnt["Bad"]).map(function (key) {
    return cnt["Bad"][key];
  })
);

const DotGraph = () => {
  return (
    <>
      <Plot
        style={{ width: "100%" }}
        data={goodTraces}
        layout={{
          hovermode: !1,
          height: goodMax * 35,
          xaxis: {
            title: "",
            titlefont: {
              size: 10,
            },
            tickfont: {
              size: 10,
            },
            ticks: "outside",
            dtick: 3,
            range: [-1, 25],
            zeroline: false,
            fixedrange: true,
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
            range: [0, goodMax + 1],
            fixedrange: true,
            showgrid: false,
            showticklabels: false,
            zerolinecolor: "black",
            zerolinewidth: 1,
          },
          showlegend: false,
          margin: { l: 50, b: 20, r: 50, t: 0 },
          paper_bgcolor: "#f9fbff",
          plot_bgcolor: "#f9fbff",
        }}
        config={{
          displayModeBar: false,
        }}
      />
      <Plot
        style={{ width: "100%" }}
        data={badTraces}
        layout={{
          hovermode: !1,
          height: badMax * 35,
          xaxis: {
            side: "top",
            title: "",
            titlefont: {
              size: 10,
            },
            tickfont: {
              size: 10,
            },
            ticks: "outside",
            dtick: 3,
            range: [-1, 25],
            zeroline: false,
            fixedrange: true,
            showticklabels: false,
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
            range: [-(badMax + 1), 0],
            fixedrange: true,
            showgrid: false,
            showticklabels: false,
            zerolinecolor: "black",
            zerolinewidth: 1,
          },
          showlegend: false,
          margin: { l: 50, b: 0, r: 50, t: 10 },
          paper_bgcolor: "#f9fbff",
          plot_bgcolor: "#f9fbff",
        }}
        config={{
          displayModeBar: false,
        }}
      />
    </>
  );
};

export default DotGraph;
