import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import DotGraph from "../Components/Graphs/DotGraph";
import SectionTitle from "../Components/SectionTitle";
import { changeCategory } from "../store/modules/counter";

import "../static/customStyle.css";
import "./Goal.css";

const mapStateToProps = (state) => ({
  category: state.counter.category,
  Total: state.counter.Total,
  Entertainment: state.counter.Entertainment,
  SNS: state.counter.SNS,
  Communication: state.counter.Communication,
  Productivity: state.counter.Productivity,
});

const mapDispatchToProps = (dispatch) => ({
  changeCategory: (type) => dispatch(changeCategory(type)),
});

const TimeGoal = (props) => {
  const { category, changeCategory } = props;
  const history = useHistory();
  // const [category, setCategory] = useState("Entertainment");
  const options = ["Entertainment", "SNS", "Communication", "Productivity"];

  const handleRoute = (path) => {
    history.push(path);
  };

  const onChangeHandler = (e) => {
    changeCategory(e.currentTarget.value);
  };

  return (
    <div className="container">
      <div className="content">
        <SectionTitle
          title="Goal Type"
          subtitle="Choose a new type of goal you want to create"
        />

        <div className="goalContainer row">
          <div className="goalType col" style={{ cursor: "default" }}>
            <h2
              style={{ color: "rgba(53, 152, 219, 1)", marginBottom: "32px" }}
            >
              New Goal
            </h2>
            <h4>
              I will not use{" "}
              <select
                onChange={onChangeHandler}
                value={category}
                className="uplifeDropdown"
              >
                {options.map((item, index) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>{" "}
              apps during <span className="blank">1:00 pm ~ 3:00 pm</span>
            </h4>
            <button
              className="uplifeButton"
              style={{ marginTop: "auto" }}
              onClick={() => handleRoute("/")}
            >
              Set Goal
            </button>
          </div>
          <div className="col">
            <div className="uplifeDiv" style={{ marginBottom: "20px" }}>
              Good/bad emotion over the past week
            </div>
            <h6 style={{ textAlign: "center", marginBottom: "25px" }}>
              Each dot is the case when your emotion state was good/bad,
              <br />
              and represented based on the time and app category you used
            </h6>
            <div style={{ width: "100%" }}>
              <DotGraph />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeGoal);
