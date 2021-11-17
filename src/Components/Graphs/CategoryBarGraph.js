import React from "react";
import { useState } from "react";
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

const CategoryBarGraph = () => {
  const allCategory = [
    "Productivity",
    "Communcation",
    "SNS",
    "Entertainment",
    "Total",
  ];
  const allColors = {
    Productivity: ["#883DA2", "#CCAFDA"],
    Communcation: ["#7BAB63", "#C7DBC1"],
    SNS: ["#FFBC47", "#FBE2B5"],
    Entertainment: ["#E4567C", "F1B9CB"],
    Total: ["#3598DB", "ABD3F1"],
  };
  const [category, setCategory] = useState("Total");
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
                // console.log(value);
              }),
            },
          },
        ]}
        layout={{
          title: "Usage by Category",
          bargap: 0.5,
        }}
        config={{
          displayModeBar: false,
        }}
        onClick={(figure) => {
          setCategory(figure.points[0].label);
          console.log(category);
        }}
      />
    </>
  );
};

export default CategoryBarGraph;
