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
const convertNumToTime =(number) =>{
    var sign = (number >= 0) ? 1 : -1;

    number = number * sign;
    var hour = Math.floor(number);
    var decpart = number - hour;

    var min = 1 / 60;

    decpart = min * Math.round(decpart / min);

    var minute = Math.floor(decpart * 60) + '';


    if (minute.length < 2) {
    minute = '0' + minute; 
    }


    sign = sign == 1 ? '' : '-';


    var time = sign + hour + ' hr ' + minute + ' min';

    return time;
}

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
              <span className="blank">{convertNumToTime(number)}</span> a day.
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
