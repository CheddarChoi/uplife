import React from "react";
import { useHistory } from "react-router-dom";
import DraggableGraph from "../Components/Graphs/DraggableGraph";
import SectionTitle from "../Components/SectionTitle";
import { connect } from 'react-redux';
import setGoal from '../store/modules/counter'

import "../static/customStyle.css";
import "./Goal.css";

const mapStateToProps = state =>({
  number : state.counter.number
})
// const mapDispatchToProps = dispatch =>({
//   setGoal : number => dispatch(setGoal(number))
// })

const TotalGoal = (props) => {
  const history = useHistory();

  const handleRoute = (path) => {
    history.push(path);
  };
  const {number} = props
  return (
    <div class="container">
      <div class="content">
        <SectionTitle
          title="Goal Type"
          subtitle="Choose a new type of goal you want to create"
        />

        <div class="goalContainer row">
          <div className="goalType col" style={{ cursor: "default" }}>
            {/* <div> */}
            <h2
              style={{ color: "rgba(53, 152, 219, 1)", marginBottom: "32px" }}
            >
              New Goal
            </h2>
            <h4>
              I will use my phone less than{" "}
              <span className="blank">{number}</span> a day.
            </h4>
            {/* </div> */}
            <button
              className="uplifeButton"
              style={{ marginTop: "auto" }}
              onClick={() => handleRoute("/")}
            >
              Set Goal
            </button>
          </div>
          <div className="col">
            <DraggableGraph />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(TotalGoal);
