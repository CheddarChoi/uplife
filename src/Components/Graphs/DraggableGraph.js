import React, { useEffect, useState } from "react";
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { connect } from "react-redux";
import { setGoal } from "../../store/modules/counter";
import { allCategory, allColors, allDays } from "../variables/categories";
import { convertSecToTime } from "../Functions/convertNumToTime";
import usageData from "../../static/data/usageTime.json";

const Plot = createPlotlyComponent(Plotly);

const mapStateToProps = (state) => ({
  Total: state.counter.Total,
});
const mapDispatchToProps = (dispatch) => ({
  setGoal: (Total) => dispatch(setGoal(Total)),
});

const DraggableGraph = (props) => {
  const [goal, setGoal2] = useState(props.Total);
  const [xaxis, setXaxis] = useState({ x0: 0, x1: 1 });
  const emotion = [4, 1, 3, 5, 5, 2, 1];

  const usage = [];
  usageData.forEach((d) => {
    var total = 0;
    allCategory.forEach((c) => (total = c === "Total" ? total : total + d[c]));
    usage.push(Math.round((convertSecToTime(total) + Number.EPSILON) * 100) / 100);
  });

  const handleGoal = (Total) => {
    const { setGoal } = props;
    setGoal(Total);
  };

  useEffect(() => {
    handleGoal(goal);
  }, [goal]);

  const emotionTrace = {
    x: allDays,
    y: emotion,
    yaxis: "y2",
    name: "Emotion Rate",
    marker: {
      size: 12,
      color: "#7BAB63",
    },
  };

  const usageTrace = {
    x: allDays,
    y: usage,
    name: "Total Usage",
    mode: "bar",
    type: "bar",
    marker: {
      color: usage.map((value) => {
        return value > goal ? allColors["Total"][1] : allColors["Total"][0];
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
          yaxis2: {
            title: "Emotional Rate",
            fixedrange: true,
            showgrid: false,
            overlaying: "y",
            side: "right",
          },
          shapes: [
            {
              type: "line",

              x0: xaxis.x0,
              x1: xaxis.x1,
              xref: "paper",

              y0: goal ? goal : 3,
              y1: goal ? goal : 3,
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
        }}
      />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DraggableGraph);
