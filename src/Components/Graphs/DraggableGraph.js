import React, { useEffect, useState } from "react";
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { connect } from "react-redux";
import { setGoal } from "../../store/modules/counter";

const Plot = createPlotlyComponent(Plotly);

const mapStateToProps = state =>({
  Total : state.counter.Total
})
const mapDispatchToProps = dispatch =>({
  setGoal : Total => dispatch(setGoal(Total))
})

const DraggableGraph = (props) => {
  const [goal, setGoal2] = useState(props.total_goal);
  const [xaxis, setXaxis] = useState({ x0: 0, x1: 1 });
  const emotion = [4, 1, 3, 5, 5, 2, 1];
  const usage = [9, 4, 1, 4, 2, 3, 4];
  const { total_goal } = props;

  const [goal, setGoal2] = useState(props.Total)
  const [xaxis, setXaxis] = useState({x0:0, x1:1})
  const emotion = [4, 1, 3, 5,5,2,1]
  const usage = [9, 4, 1, 4,2,3,4]
  const {Total} = props

  const handleGoal = Total =>{
    const {setGoal} = props;
    setGoal(Total)
  }

  useEffect(()=>{
    handleGoal(goal)
    // console.log("props",props)
  },[goal])

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
          title: "Phone Usage",
          shapes: [
            {
              type: "line",
              xaxis: {
                fixedrange: true,
              },
              x0: xaxis.x0,
              x1: xaxis.x1,
              xref: "paper",

              yaxis: {
                fixedrange: true,
              },
              y0: goal,
              y1: goal,
              yref: "y",

              line: {
                width: 2,
                color: "rgb(30, 30, 30)",
              },
            },
          ],
        }}
        config={{
          displayModeBar: false,
          edits: {
            shapePosition: true,
          },
        }}
        onUpdate={(figure) => {
          setGoal2(figure.layout.shapes[0].y0)
          // console.log(goal)
        }} 
      />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DraggableGraph);
