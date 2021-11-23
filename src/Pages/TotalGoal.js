import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import DraggableGraph from "../Components/Graphs/DraggableGraph";
import SectionTitle from "../Components/SectionTitle";
import { connect } from "react-redux";
import { convertNumToTime } from "../Components/Functions/convertNumToTime";
import { Range, getTrackBackground } from 'react-range';

import "../static/customStyle.css";
import "./Goal.css";

const mapStateToProps = (state) => ({
  Total: state.counter.Total,
});

const TotalGoal = (props) => {
  const history = useHistory();
  const [values, setValues] = useState([50])

  const handleRoute = (path) => {
    history.push(path);
  };
  const { Total } = props;

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
          values={values}
          step={0.1}
          min={0}
          max={100}
          onChange={(values) => setValues(values)}
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
                    values: values,
                    colors: ["#548BF4", "#ccc"],
                    min: 0,
                    max: 100
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
          {values[0].toFixed(1)}
        </output>
      </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(TotalGoal);
