import React, { useEffect, useState } from "react";
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { connect } from "react-redux";
import { setCategoryGoal } from "../../store/modules/counter";
import { changeCategory } from "../../store/modules/counter";
import { allColors, allDays } from "../variables/categories";
import { convertSecToTime } from "../Functions/convertNumToTime";
import { convertNumToTime } from "../Functions/convertNumToTime";

import usageData from "../../static/data/usageTime.json";
import emotionAvgData from "../../static/data/emotionAvg.json";
import { emotionAxis } from "./configs";

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
  const { category, setCategoryGoal } = props;

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
  const [goal, setGoal2] = useState(getGoal(category));

  const handleGoal = (goal) => {
    setGoal2(goal);
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
    },
  };

  const usage = usageData.map(
    (d) => Math.round(convertSecToTime(d[props.category]) * 100) / 100
  );
  // console.log(Math.max.apply(Math, usage.slice(0, 7)));
  const days =
    8 -
    usage
      .map((value) => {
        return value > goal ? true : false;
      })
      .filter((x) => x === true).length;
  // console.log(days);

  const usageTrace = {
    x: allDays,
    y: usage,
    name: category + " Total Usage",
    mode: "bar",
    type: "bar",
    marker: {
      color: usage.map((value) => {
        return value > goal ? allColors[category][1] : allColors[category][0];
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

              x0: 0,
              x1: 1,
              xref: "paper",

              y0: getGoal(category) ? (getGoal(category) > Math.max.apply(Math, usage.slice(0, 7)) ?  Math.max.apply(Math, usage.slice(0, 7)) : getGoal(category)) : 0.25,
              y1: getGoal(category) ? (getGoal(category) > Math.max.apply(Math, usage.slice(0, 7)) ?  Math.max.apply(Math, usage.slice(0, 7)) : getGoal(category)) : 0.25,
              // y0: getGoal(category) ? getGoal(category) : 0.25,
              // y1: getGoal(category) ? getGoal(category) : 0.25,
              yref: "y",

              line: {
                width: 2,
                color: "rgb(30, 30, 30)",
              },
            },
          ],
          paper_bgcolor: "#f9fbff",
          plot_bgcolor: "#f9fbff",
          annotations: [
            {
              text: convertNumToTime(goal),
              x: 0.98,
              xref: "paper",
              y: goal + ( Math.max.apply(Math, usage.slice(0, 7)) * 0.05),
              yref: "y",
              showarrow: false,
              font: { size: 16 },
            },
            {
              text: days + " day / week",
              x: 0.98,
              xref: "paper",
              y: goal - ( Math.max.apply(Math, usage.slice(0, 7)) * 0.05),
              yref: "y",
              showarrow: false,
              font: { size: 16 },
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
          // setXaxis({ x0 : 0, x1 : 1 })
          setGoal2(figure.layout.shapes[0].y0);
          setCategoryGoal(props.category, figure.layout.shapes[0].y0);
        }}
      />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DraggableGraph2);
