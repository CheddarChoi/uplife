import React from "react";
import { useState } from "react";
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

const DailyGraph = () => {
  const [goal, setGoal] = useState(4);
  const [xaxis, setXaxis] = useState({ x0: 0, x1: 1 });
  const emotion = [4, 1, 3, 5, 5, 2, 1];
  const usage = [9, 4, 1, 4, 2, 3, 4];
  return (
    <>
      <Plot
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
                // console.log("status", [goal, value]);
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

              x0: xaxis.x0,
              x1: xaxis.x1,
              xref: "paper",

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
          edits: {
            shapePosition: true,
          },
        }}
        onUpdate={(figure) => {
          setGoal(figure.layout.shapes[0].y0);
          console.log(goal);
        }}
      />
    </>
  );
};

export default DailyGraph;
