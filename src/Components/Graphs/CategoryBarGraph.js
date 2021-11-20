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
  Entertainment : state.counter.Entertainment,
  SNS : state.counter.SNS,
  Communication : state.counter.Communication,
  Total : state.counter.Total,
  Productivity : state.counter.Productivity,
});
const mapDispatchToProps = (dispatch) => ({
  changeCategory: (category) => dispatch(changeCategory(category)),
});

const CategoryBarGraph = (props) => {
  const { Total, Entertainment, SNS, Communication, Productivity, category } = props; ////요오오오오오게 Total Goal. 소수점이고, hr, min으로 convert 하려면 ../Functions/convertNumToTime.js쓰면댐!
  const [total, setTotal] = useState(Total)
  console.log("TOTAL", Entertainment)
  const allCategory = [
    "Productivity",
    "Communication",
    "SNS",
    "Entertainment",
    "Total",
  ];
  const allColors = {
    Productivity: ["#883DA2", "#CCAFDA"],
    Communication: ["#7BAB63", "#C7DBC1"],
    SNS: ["#FFBC47", "#FBE2B5"],
    Entertainment: ["#E4567C", "#F1B9CB"],
    Total: ["#3598DB", "#ABD3F1"],
  };
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


  const goalMarker = allCategory.map(e=>{
    return {
    x: [getGoal(e) - 0.25, getGoal(e) + 0.25],
    y: [e, e],
    name: "Goal",
    mode: "lines",
    line: { width: 40, color: "rgba(50, 50, 50, 0.7)" },
    showlegend: false,
  }
  })

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
        data={goalMarker.concat(usageData)}
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
