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
  const emotion = [4, 1, 3, 5, 5, 2, 1];

  const { Total } = props;

  const usage = [];
  usageData.forEach((d) => {
    if (props.category === "Total") {
      var total = 0;
      allCategory.forEach(
        (c) => (total = c === "Total" ? total : total + d[c])
      );
      usage.push(convertSecToTime(total));
    } else usage.push(convertSecToTime(d[props.category]));
  });

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
        data={[trace]}
        layout={{
          margin: { l: 50, b: 50, r: 50, t: 50 },
          xaxis: {
            fixedrange: true,
          },
          yaxis: {
            fixedrange: true,
          },
          paper_bgcolor: "#f9fbff",
          plot_bgcolor: "#f9fbff",
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
