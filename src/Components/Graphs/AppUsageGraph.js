import React, { useState } from "react";
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { connect } from "react-redux";
import { changeCategory } from "../../store/modules/counter";
import { convertSecToTime } from "../Functions/convertNumToTime";
import { allCategory, allColors, allDays } from "../variables/categories";
import usageData from "../../static/data/usageTime.json";

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
  const [goal, setGoal] = useState(props.Total);

  const [category2, setCategory] = useState(props.category);
  const [color, setColor] = useState(allColors[props.category]);
  const [xaxis, setXaxis] = useState({ x0: 0, x1: 1 });
  const emotion = [-4, 1, 3, 5, 5, -2, 1];

  const { Total } = props;

  const usage = usageData.map((d) => Math.round(convertSecToTime(d[props.category])*100)/100);

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

  const trace = {
    x: allDays,
    y: usage,
    name: "Total Usage",
    mode: "bar",
    type: "bar",
    marker: {
      color: allColors[category][0],
    },
  };

  return (
    <>
      <Plot
        style={{ width: "100%" }}
        data={[emotionTrace, trace]}
        layout={{
          margin: { l: 50, b: 50, r: 50, t: 50 },
          xaxis: {
            fixedrange: true,
          },
          yaxis: {
            title: "Usage Time",
            fixedrange: true,
            showgrid: false,
          },
          yaxis2: {
            title: "Emotional Rate",
            fixedrange: true,
            showgrid: false,
            overlaying: "y",
            side: "right",
          },
          paper_bgcolor: "#f9fbff",
          plot_bgcolor: "#f9fbff",
          showlegend: true,
          legend: {
            x: 0.4,
            y: -0.2,
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
