import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import DraggableGraph from "../Components/Graphs/DraggableGraph";
import SectionTitle from "../Components/SectionTitle";

import "../static/customStyle.css";
import "./Goal.css";

const CategoryGoal = () => {
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
              I will use{" "}
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
              apps less than <span className="blank">3 hr 42 min</span> a day.
            </h4>
            <button
              className="uplifeButton"
              style={{ marginTop: "auto" }}
              onClick={() => handleRoute("/")}
            >
              Set Goal
            </button>
          </div>
          <div className="col-md-auto">
            <DraggableGraph />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryGoal;
