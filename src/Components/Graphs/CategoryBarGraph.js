import React, { useEffect } from "react";
import { useState } from "react";
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { connect } from "react-redux";
import { changeCategory } from "../../store/modules/counter";

const Plot = createPlotlyComponent(Plotly);

const mapStateToProps = (state) => ({
  category: state.counter.category,
});
const mapDispatchToProps = (dispatch) => ({
  changeCategory: (category) => dispatch(changeCategory(category)),
});

const CategoryBarGraph = (props) => {
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
  const [category, setCategory] = useState(props.category);
  const handleCategory = (type) => {
    const { changeCategory } = props;
    changeCategory(type);
  };

  useEffect(() => {
    handleCategory(category);
  }, [category]);

  console.log("category", props.category);
  return (
    <>
      <Plot
        style={{ width: "100%" }}
        data={[
          {
            x: [3, 1, 3, 5, 12],
            y: [
              "Productivity",
              "Communication",
              "SNS",
              "Entertainment",
              "Total",
            ],
            name: "Usage",
            mode: "bar",
            type: "bar",
            orientation: "h",
            marker: {
              color: allCategory.map((value) => {
                return value === category
                  ? allColors[value][0]
                  : allColors[value][1];
              }),
            },
          },
        ]}
        layout={{
          title: "Usage by Category",
          bargap: 0.5,
          xaxis: { fixedrange: true },
          yaxis: { fixedrange: true },
        }}
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
