import React from "react";
import { useHistory } from "react-router-dom";
import DraggableGraph from "../Components/Graphs/DraggableGraph";
import SectionTitle from "../Components/SectionTitle";
import { connect } from "react-redux";
import { convertNumToTime } from "../Components/Functions/convertNumToTime";

import "../static/customStyle.css";
import "./Goal.css";

const mapStateToProps = (state) => ({
  Total: state.counter.Total,
});

const TotalGoal = (props) => {
  const history = useHistory();

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
              onClick={() => handleRoute("/goal")}
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
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(TotalGoal);
