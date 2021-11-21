import React, { useEffect } from "react";
import { useState } from "react";
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { connect } from "react-redux";
import { changeCategory } from "../../store/modules/counter";

import { allCategory, allColors } from "../variables/categories";
import { customLayout } from "./configs";
import usageData from "../../static/data/usageTime.json";
import { convertSecToTime } from "../Functions/convertNumToTime";

const Plot = createPlotlyComponent(Plotly);

const mapStateToProps = (state) => ({
  category: state.counter.category,
  Entertainment: state.counter.Entertainment,
  SNS: state.counter.SNS,
  Communication: state.counter.Communication,
  Total: state.counter.Total,
  Productivity: state.counter.Productivity,
});
const mapDispatchToProps = (dispatch) => ({
  changeCategory: (category) => dispatch(changeCategory(category)),
});

const CategoryBarGraph = (props) => {
  const { Total, category } = props; ////요오오오오오게 Total Goal. 소수점이고, hr, min으로 convert 하려면 ../Functions/convertNumToTime.js쓰면댐!
  const [total, setTotal] = useState(Total);
  const [category2, setCategory] = useState(props.category);
  const handleCategory = (type) => {
    const { changeCategory } = props;
    changeCategory(type);
  };

  const getGoal = (type) => {
    switch (type) {
      case "Entertainment":
        return props.Entertainment;
      case "SNS":
        return props.SNS;
      case "Communication":
        return props.Communication;
      case "Productivity":
        return props.Productivity;
      case "Total":
        return props.Total;
      default:
        return null;
    }
  };

  useEffect(() => {
    handleCategory(category2);
  }, [category2]);

  let todayData = usageData.at(
    usageData.findIndex((e) => e.Date === "2019-05-06")
  );

  const trace = {
    x: allCategory.map((c) => Math.round((convertSecToTime(todayData[c]) + Number.EPSILON) * 100) / 100),
    y: allCategory,
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

  const goalMarker = allCategory.map((e) => {
    if (getGoal(e) !== null)
      return {
        x: [getGoal(e) - 0.05, getGoal(e) + 0.05],
        y: [e, e],
        name: "Goal",
        mode: "lines",
        line: { width: 40, color: "rgba(50, 50, 50, 0.7)" },
        showlegend: false,
      };
    else return {};
  });

  const layout = {
    bargap: 0.5,
    margin: { l: 100, r: 100, b: 20, t: 50 },
    xaxis: { fixedrange: true },
    yaxis: {
      fixedrange: true,
      categoryorder: "array",
      categoryarray: allCategory,
    },
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
        data={goalMarker.concat(trace)}
        layout={Object.assign({}, customLayout, layout)}
        config={{
          displayModeBar: false,
        }}
        onClick={(figure) => {
          if (allCategory.includes(figure.points[0].label)) {
            setCategory(figure.points[0].label);
            changeCategory(figure.points[0].label);
            console.log("categoryafter", figure.points[0].label);
          }
        }}
      />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryBarGraph);
