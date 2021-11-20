import React, { useEffect, useState } from "react";
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { connect } from "react-redux";
import { changeCategory } from "../../store/modules/counter";

import { allColors } from "../variables/categories";

const Plot = createPlotlyComponent(Plotly);

const mapStateToProps = (state) => ({
  Total: state.counter.Total,
  category: state.counter.category,
});
const mapDispatchToProps = (dispatch) => ({
  changeCategory: (category) => dispatch(changeCategory(category)),
});

const DraggableGraph2 = (props) => {
  const { type } = props.category;
  console.log("totalgoaltype", allColors[props.category]);
  const [goal, setGoal] = useState(props.Total);

  const [category, setCategory] = useState(props.category);
  const [color, setColor] = useState(allColors[props.category]);
  const [xaxis, setXaxis] = useState({ x0: 0, x1: 1 });
  const emotion = [4, 1, 3, 5, 5, 2, 1];
  const usage = [9, 4, 1, 4, 2, 3, 4];
  const { Total } = props;

  // useEffect(()=>{
  //   setColor(allColors[type])
  // },category)

  return (
    <>
      <Plot
        style={{ width: "100%" }}
        data={[
          {
            x: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
            y: usage,
            name: "Total Usage",
            mode: "bar",
            type: "bar",
            marker: {
              color: allColors[props.category][0],
            },
          },
        ]}
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

export default connect(mapStateToProps, mapDispatchToProps)(DraggableGraph2);
