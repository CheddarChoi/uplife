import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import DotGraph from "../Components/Graphs/DotGraph";
import SectionTitle from "../Components/SectionTitle";

import "../static/customStyle.css";
import "./Goal.css";

const TimeGoal = () => {
  const history = useHistory();
  const [category, setCategory] = useState("Entertainment");
  const options = ["Entertainment", "SNS", "Communication", "Productivity"];

  const handleRoute = (path) => {
    history.push(path);
  };

  const onChangeHandler = (e) => {
    setCategory(e.currentTarget.value);
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
          <div class="col">
            <div className="uplifeDiv" style={{ marginBottom: "10px" }}>
              Good/bad emotion over the past week
            </div>
            <h6 style={{ textAlign: "center", marginBottom: "25px" }}>
              Each dot is the case when your emotion state was good/bad,
              <br />
              and represented based on the time and app category you used
            </h6>
            <div style={{ width: "100%", border: "solid 1px black" }}>
              <DotGraph />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeGoal;
