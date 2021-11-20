import React, { useEffect, useState } from "react";
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { connect } from "react-redux";
import { setCategoryGoal } from "../../store/modules/counter";
import { changeCategory } from "../../store/modules/counter";

const Plot = createPlotlyComponent(Plotly);

const mapStateToProps = (state) => ({
  category: state.counter.category,
  Total: state.counter.Total,
  Entertainment: state.counter.Entertainment,
  SNS: state.counter.SNS,
  Communication: state.counter.Communication,
  Productivity: state.counter.Productivity,
});
const mapDispatchToProps = (dispatch) => ({
  setCategoryGoal: (category, num) => dispatch(setCategoryGoal(category, num)),
  changeCategory: (type) => dispatch(changeCategory(type)),
});

const DraggableGraph2 = (props) => {
  const {
    Entertainment,
    SNS,
    Communication,
    Total,
    Productivity,
    category,
    setCategoryGoal,
  } = props;

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

  const [xaxis, setXaxis] = useState({ x0: 0, x1: 1 });
  // const [category2, setCategory2] = useState(props.category)
  const [goal, setGoal2] = useState(getGoal(category));
  const emotion = [4, 1, 3, 5, 5, 2, 1];
  const usage = [9, 4, 1, 4, 2, 3, 4];

  // useEffect(()=>{
  //   setCategoryGoal(props.category,goal)
  //   console.log(props.category, ":",getGoal(props.category))
  // },[goal])

  // useEffect(()=>{
  //   setGoal2(props.category_goal[props.category])
  // },[category])

  return (
    <>
      <Plot
        style={{ width: "100%" }}
        data={[
          {
            x: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
            y: emotion,
            name: "Emotion Rate",
            marker: {
              size: 12,
            },
          },
          {
            x: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
            y: usage,
            name: "Total Usage",
            mode: "bar",
            type: "bar",
            marker: {
              color: usage.map((value) => {
                // console.log('status',[goal, value])
                return value > goal ? "pink" : "yellow";
              }),
            },
          },
        ]}
        layout={{
          margin: { l: 50, b: 50, r: 50, t: 0 },
          shapes: [
            {
              type: "line",

              x0: xaxis.x0,
              x1: xaxis.x1,
              xref: "paper",

              y0: getGoal(category)?getGoal(category):3,
              y1: getGoal(category)?getGoal(category):3,
              yref: "y",

              line: {
                width: 2,
                color: "rgb(30, 30, 30)",
              },
            },
          ],
          paper_bgcolor: "#f9fbff",
          plot_bgcolor: "#f9fbff",
        }}
        config={{
          displayModeBar: false,
          edits: {
            shapePosition: true,
          },
        }}
        onUpdate={(figure) => {
          setGoal2(figure.layout.shapes[0].y0);
          setCategoryGoal(props.category, figure.layout.shapes[0].y0);
        }}
      />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DraggableGraph2);
