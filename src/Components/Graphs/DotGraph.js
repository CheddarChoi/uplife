import React from "react";
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

const allColors = {
  Productivity: ["#883DA2", "#CCAFDA"],
  Communication: ["#7BAB63", "#C7DBC1"],
  SNS: ["#FFBC47", "#FBE2B5"],
  Entertainment: ["#E4567C", "#F1B9CB"],
  Total: ["#3598DB", "#ABD3F1"],
};

var data = [
  { time: "2019-01-01 00:00", emotion: "bad", category: "Productivity" },
  { time: "2019-01-01 02:00", emotion: "good", category: "SNS" },
  { time: "2019-01-01 02:00", emotion: "bad", category: "SNS" },
  { time: "2019-01-01 02:00", emotion: "bad", category: "Entertainment" },
  { time: "2019-01-01 12:00", emotion: "good", category: "Productivity" },
];

var cnt = { good: {}, bad: {} };

var traces = [];

data.forEach((d) => {
  if (cnt[d.emotion][d.time] === undefined) cnt[d.emotion][d.time] = 0;
  cnt[d.emotion][d.time] += 1;
  traces.push({
    type: "scatter",
    x: [d.time],
    y:
      d.emotion === "good"
        ? [cnt[d.emotion][d.time]]
        : [-cnt[d.emotion][d.time]],
    mode: "markers+text",
    text: d.emotion === "good" ? ["😁"] : ["😠"],
    textfont: {
      size: 16,
      color: "black",
    },
    name: d.category,
    marker: {
      color: allColors[d.category][0],
      symbol: "circle",
      size: 25,
    },
  });
});
console.log(traces);

const DotGraph = () => {
  return (
    <Plot
      style={{ width: "100%" }}
      data={traces}
      layout={{
        hovermode: !1,
        height: 400,
        xaxis: {
          title: "",
          titlefont: {
            size: 10,
          },
          tickfont: {
            size: 10,
          },
          ticks: "outside",
          range: ["2019-01-01", "2019-01-02"],
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
          range: [-5, 5],
          fixedrange: true,
          showgrid: false,
          showticklabels: false,
          zerolinecolor: "#969696",
          zerolinewidth: 1,
        },
        showlegend: false,
        margin: { l: 50, b: 50, r: 50, t: 0 },
      }}
      config={{
        displayModeBar: false,
      }}
    />
  );
};

export default DotGraph;
