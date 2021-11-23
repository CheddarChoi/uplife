import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DraggableGraph from "../Components/Graphs/DraggableGraph";
import SectionTitle from "../Components/SectionTitle";
import { connect } from "react-redux";
import { convertNumToTime } from "../Components/Functions/convertNumToTime";
import { Range, getTrackBackground } from 'react-range';
import { setCategoryGoal, setGoal } from "../store/modules/counter";
import usageData from "../static/data/usageTime.json";
import { convertSecToTime } from "../Components/Functions/convertNumToTime";

import "../static/customStyle.css";
import "./Goal.css";

const mapStateToProps = (state) => ({
  Total: state.counter.Total,
});
const mapDispatchToProps = (dispatch) => ({
  setGoal: (Total) => dispatch(setGoal(Total)),
});

const TotalGoal = (props) => {
  const {Total, setGoal} = props
  console.log("Total", [Total])
  const history = useHistory();
  const [values, setValues] = useState([Total])
  const min = 0
  const [max, setMax] = useState(24)

  const usage = usageData.map(
    (d) => Math.round(convertSecToTime(d["Total"]) * 100) / 100
  );

  const [success, setSuccess] = useState(usage.map((value) => {
        return value > Total ? true : false;
  }))

  useEffect(()=>{
    console.log("value changed", values)
    setGoal(values[0])
    console.log("new goal",Total)
  },[values])
  const handleRoute = (path) => {
    history.push(path);
  };

  return (
    <div class="container">
      <div class="content">
        <SectionTitle
          title="Goal Type"
          subtitle="Choose a new type of goal you want to create"
        />

        <div class="goalContainer row">
          <div className="goalType col" style={{ cursor: "default" }}>
            <h2
              style={{ color: "rgba(53, 152, 219, 1)", marginBottom: "32px" }}
            >
              New Goal
            </h2>
            <h4>
              I will use my phone less than{" "}
              <span className="blank">{convertNumToTime(Total)}</span> a day.
            </h4>
            <button
              className="uplifeButton"
              style={{ marginTop: "auto" }}
              onClick={() => handleRoute("/")}
            >
              Set Goal
            </button>
          </div>
          <div class="col">
            <div className="uplifeDiv" style={{ marginBottom: "20px" }}>
              Total phone usage over the past week
            </div>
            <h6 style={{ textAlign: "center", marginBottom: "25px" }}>
              Drag the black bar to set your own goal
            </h6>
            <div style={{ width: "100%" }}>
              <DraggableGraph />
            </div>
          </div>
          <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "2em"
        }}
      >
        <Range
          values={[Total]}
          step={0.1}
          min={min}
          max={max}
          onChange={(values) => {
            setGoal(values[0])
          }}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%"
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values: [Total],
                    colors: ["#548BF4", "#ccc"],
                    min: min,
                    max: max
                  }),
                  alignSelf: "center"
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "42px",
                width: "42px",
                borderRadius: "4px",
                backgroundColor: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA"
              }}
            >
              <div
                style={{
                  height: "16px",
                  width: "5px",
                  backgroundColor: isDragged ? "#548BF4" : "#CCC"
                }}
              />
            </div>
          )}
        />
        <output style={{ marginTop: "30px" }} id="output">
          {convertNumToTime(Total)}
        </output>
        <br/>
        <output style={{ marginTop: "30px" }} id="output">
          {usage.map((value) => {
        return value > Total ? true : false;
  }).filter(x=> x==true).length} day/week success
        </output>
      </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TotalGoal);
