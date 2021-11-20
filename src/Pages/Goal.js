import React from "react";
import { useHistory } from "react-router-dom";
import SectionTitle from "../Components/SectionTitle";
import { connect } from "react-redux";
import { setGoal } from "../store/modules/counter";
import convertNumToTime from "../Components/Functions/convertNumToTime";

import "./Goal.css";

const total_goal = (props) => {
  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        backgroundColor: "#3598DB",
        borderRadius: "50%",
        marginBottom: "32px",
      }}
    >
      <h2 style={{ color: "white", textAlign: "center" }}>{props.num}</h2>
    </div>
  );
};

const mapStateToProps = ({ counter }) => ({
  total_goal: counter.total_goal,
});
const mapDispatchToProps = (dispatch) => ({
  setGoal: (total_goal) => dispatch(setGoal(total_goal)),
});

const Goal = (props) => {
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
          <div
            className="goalType col"
            onClick={() => handleRoute("/goal/total")}
          >
            <total_goal num="1" />
            <h4>
              I will use my phone less than{" "}
              <span className="blank">{convertNumToTime(total_goal)}</span> a day.
            </h4>
          </div>

          <div
            className="goalType col"
            onClick={() => handleRoute("/goal/category")}
          >
            <total_goal num="2" />
            <h4>
              I will use <span className="blank">entertainment</span> apps less
              than <span className="blank">1 hr 15 min</span> a day.
            </h4>
          </div>

          <div
            className="goalType col"
            onClick={() => alert("Not implemented yet!")}
            // onClick={() => handleRoute("/goal/time")}
          >
            <total_goal num="3" />
            <h4>
              I will not use <span className="blank">social</span> apps during{" "}
              <span className="blank">1:00 pm ~ 3:00 pm</span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Goal);
