import React, { useEffect } from "react";
import { useState } from "react";
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { connect } from "react-redux";
import { changeCategory } from "../../store/modules/counter";

import { allCategory, allColors } from "../variables/categories";
import { customLayout } from "./configs";

const Plot = createPlotlyComponent(Plotly);

const mapStateToProps = (state) => ({
  category: state.counter.category,
  Total: state.counter.Total,
});
const mapDispatchToProps = (dispatch) => ({
  changeCategory: (category) => dispatch(changeCategory(category)),
});

const CategoryBarGraph = (props) => {
  const { Total } = props; ////요오오오오오게 Total Goal. 소수점이고, hr, min으로 convert 하려면 ../Functions/convertNumToTime.js쓰면댐!
  const [total, setTotal] = useState(Total);
  console.log("TOTAL", Total);

  const [category, setCategory] = useState(props.category);
  const handleCategory = (type) => {
    const { changeCategory } = props;
    changeCategory(type);
  };

  useEffect(() => {
    handleCategory(category);
  }, [category]);

  const usageData = {
    x: [3, 1, 3, 5, 12],
    y: ["Productivity", "Communication", "SNS", "Entertainment", "Total"],
    name: "Usage",
    mode: "bar",
    type: "bar",
    orientation: "h",
    marker: {
      color: allCategory.map((value) => {
        return value === category ? allColors[value][0] : allColors[value][1];
      }),
    },
    showlegend: false,
  };

  const goalMarker = {
    x: [Total - 0.25, Total + 0.25],
    y: ["Total", "Total"],
    name: "Goal",
    mode: "lines",
    line: { width: 40, color: "rgba(50, 50, 50, 0.7)" },
  };

  const layout = {
    bargap: 0.5,
    margin: { l: 100, r: 100, b: 20, t: 50 },
    xaxis: { fixedrange: true },
    yaxis: { fixedrange: true },
    showlegend: true,
    legend: {
      x: 0.4,
      y: -0.2,
    },
  };

  return (
    <>
      <Plot
        style={{ width: "100%" }}
        data={[usageData, goalMarker]}
        layout={Object.assign({}, customLayout, layout)}
        config={{
          displayModeBar: false,
        }}
        onClick={(figure) => {
          setCategory(figure.points[0].label);
          changeCategory(figure.points[0].label);
          console.log("categoryafter", figure.points[0].label);
        }}
      />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryBarGraph);
