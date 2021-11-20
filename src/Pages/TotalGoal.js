import React from "react";
import { useHistory } from "react-router-dom";
import DraggableGraph from "../Components/Graphs/DraggableGraph";
import SectionTitle from "../Components/SectionTitle";
import { connect } from "react-redux";
import convertNumToTime from "../Components/Functions/convertNumToTime";

import "../static/customStyle.css";
import "./Goal.css";

const mapStateToProps = (state) => ({
  total_goal: state.counter.total_goal,
});
// const convertNumToTime =(total_goal) =>{
//     var sign = (total_goal >= 0) ? 1 : -1;

//     total_goal = total_goal * sign;
//     var hour = Math.floor(total_goal);
//     var decpart = total_goal - hour;

//     var min = 1 / 60;

//     decpart = min * Math.round(decpart / min);

//     var minute = Math.floor(decpart * 60) + '';

//     if (minute.length < 2) {
//     minute = '0' + minute;
//     }

//     sign = sign == 1 ? '' : '-';

//     var time = sign + hour + ' hr ' + minute + ' min';

//     return time;
// }

const TotalGoal = (props) => {
  const history = useHistory();

  const handleRoute = (path) => {
    history.push(path);
  };
  const { total_goal } = props;
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
              <span className="blank">{convertNumToTime(total_goal)}</span> a day.
            </h4>
            <button
              className="uplifeButton"
              style={{ marginTop: "auto" }}
              onClick={() => handleRoute("/goal")}
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
