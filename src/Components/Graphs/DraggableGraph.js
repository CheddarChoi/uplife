import React, { useEffect, useState } from "react";
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { connect } from "react-redux";
import { setGoal } from "../../store/modules/counter";
import { allColors, allDays } from "../variables/categories";
import { convertSecToTime } from "../Functions/convertNumToTime";
import { convertNumToTime } from "../Functions/convertNumToTime";

import usageData from "../../static/data/usageTime.json";
import emotionAvgData from "../../static/data/emotionAvg.json";
import { emotionAxis } from "./configs";

const Plot = createPlotlyComponent(Plotly);

const mapStateToProps = (state) => ({
  Total: state.counter.Total,
});
const mapDispatchToProps = (dispatch) => ({
  setGoal: (Total) => dispatch(setGoal(Total)),
});

const DraggableGraph = (props) => {
  const {Total, setGoal} = props
  const [goal, setGoal2] = useState(Total);
  const [xaxis, setXaxis] = useState({ x0: 0, x1: 1 });

  const handleGoal = (Total) => {
    const { setGoal } = props;
    setGoal(Total);
  };

  useEffect(() => {
    handleGoal(goal);
  }, [goal]);

  const emotionTrace = {
    x: allDays,
    y: emotionAvgData.map((d) => d.Emotional_state),
    yaxis: "y2",
    name: "Emotion Rate",
    marker: {
      size: 12,
      color: "#7BAB63",
    },
  };
  
  

  const usage = usageData.map(
    (d) => Math.round(convertSecToTime(d["Total"]) * 100) / 100
  );

  const days = 8 - usage.map((value) => {
    return value > Total ? true: false;
  }).filter(x => x==true).length
  // console.log(days);

  const usageTrace = {
    x: allDays,
    y: usage,
    name: "Total Usage",
    mode: "bar",
    type: "bar",
    marker: {
      color: usage.map((value) => {
        return value > Total ? allColors["Total"][1] : allColors["Total"][0];
      }),
    },
  };

  return (
    <>
      <Plot
        style={{ width: "100%" }}
        data={[emotionTrace, usageTrace]}
        layout={{
          margin: { l: 50, b: 50, r: 50, t: 0 },
          showlegend: true,
          legend: {
            x: 0.4,
            y: -0.2,
          },
          xaxis: {
            fixedrange: true,
          },
          yaxis: {
            title: "Usage Time",
            fixedrange: true,
            showgrid: false,
          },
          yaxis2: emotionAxis("right"),
          shapes: [
            {
              type: "line",

              x0: xaxis.x0,
              x1: xaxis.x1,
              xref: "paper",

              y0: Total ? Total : 2.5,
              y1: Total ? Total : 2.5,
              yref: "y",

              line: {
                width: 2,
                color: "rgb(0, 0, 0)",
              },
            },
          ],
          paper_bgcolor: "#f9fbff",
          plot_bgcolor: "#f9fbff",
          annotations: [
            {
              text: convertNumToTime(Total),
              x: 0.98,
              xref: 'paper',
              y: Total+0.15,
              yref: 'y',
              showarrow: false,
              font: { size: 16 },
            },
            {
              text: days + " day / week",
              x: 0.98,
              xref: 'paper',
              y: Total-0.15,
              yref: 'y',
              showarrow: false,
              font: { size: 16 },
            }
          ],
        }}
        config={{
          displayModeBar: false,
          edits: {
            shapePosition: true,
          },
        }}
        onUpdate={(figure) => {
          setGoal(figure.layout.shapes[0].y0);
        }}
      />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DraggableGraph);
