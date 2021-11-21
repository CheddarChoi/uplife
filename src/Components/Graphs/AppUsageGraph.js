import React, { useState } from "react";
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { connect } from "react-redux";
import { changeCategory } from "../../store/modules/counter";
import { convertSecToTime } from "../Functions/convertNumToTime";
import { allCategory, allColors, allDays } from "../variables/categories";

import usageData from "../../static/data/usageTime.json";
import emotionAvgData from "../../static/data/emotionAvg.json";
import { emotionAxis } from "./configs";

const Plot = createPlotlyComponent(Plotly);

const mapStateToProps = (state) => ({
  Total: state.counter.Total,
  category: state.counter.category,
});
const mapDispatchToProps = (dispatch) => ({
  changeCategory: (category) => dispatch(changeCategory(category)),
});

const AppUsageGraph = (props) => {
  const { category, changeCategory } = props;

  const totalUsage = usageData.map(
    (d) =>
      Math.round(convertSecToTime(d["Total"]) * 100) / 100 -
      Math.round(convertSecToTime(d[props.category]) * 100) / 100
  );

  const usage = usageData.map(
    (d) => Math.round(convertSecToTime(d[props.category]) * 100) / 100
  );

  const emotion = emotionAvgData.map((d) => d.Emotional_state);

  const emotionTrace = {
    x: allDays,
    y: emotion,
    yaxis: "y2",
    name: "Emotion Rate",
    marker: {
      size: 12,
      color: "black",
    },
  };

  const categoryTrace = {
    x: allDays,
    y: usage,
    name: props.category + " Usage",
    mode: "bar",
    type: "bar",
    marker: {
      color: allColors[category][0],
    },
  };
  const totalTrace = {
    x: allDays,
    y: totalUsage,
    name: "Total Usage",
    mode: "bar",
    type: "bar",
    marker: {
      color: "lightgray",
    },
  };

  return (
    <>
      <Plot
        style={{ width: "100%" }}
        data={[emotionTrace, categoryTrace, totalTrace]}
        layout={{
          barmode: "stack",
          margin: { l: 50, b: 50, r: 50, t: 50 },
          xaxis: {
            fixedrange: true,
          },
          yaxis: {
            title: "Usage Time",
            fixedrange: true,
            showgrid: false,
          },
          yaxis2: emotionAxis("right"),
          paper_bgcolor: "#f9fbff",
          plot_bgcolor: "#f9fbff",
          showlegend: true,
          legend: {
            x: 0.15,
            y: -0.1,
            orientation: "h",
          },
        }}
        config={{
          displayModeBar: false,
          edits: {
            shapePosition: true,
          },
        }}
      />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppUsageGraph);
