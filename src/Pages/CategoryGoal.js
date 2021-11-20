import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { setCategoryGoal } from '../store/modules/counter'
import {changeCategory} from '../store/modules/counter'

import DraggableGraph2 from "../Components/Graphs/DraggableGraph2";
import SectionTitle from "../Components/SectionTitle";

import "../static/customStyle.css";
import "./Goal.css";

const mapStateToProps = state =>({
  category : state.counter.category,
  category_goal : state.counter.category_goal,
})
const mapDispatchToProps = dispatch =>({
  setCategoryGoal : (category, num) => dispatch(setCategoryGoal(category, num)),
  changeCategory : (type) => dispatch(changeCategory(type))
})

const CategoryGoal = (props) => {
  const history = useHistory();
  const [category, setCategory] = useState("Entertainment");
  const options = ["Entertainment", "SNS", "Communication", "Productivity","Total"];



  const handleRoute = (path) => {
    history.push(path);
  };

  const onChangeHandler = (e) => {
    setCategory(e.currentTarget.value);
    changeCategory(e.currentTarget.value);
  };
  const handleCategory = (type) =>{
    const {changeCategory} = props
    changeCategory(type)
  }

  useEffect(()=>{
    handleCategory(category)
    console.log("category",props.category)
    console.log("goal",props.category_goal)
  },[category])

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
              apps less than <span className="blank">{"aaa"}</span> a day.
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
            <DraggableGraph2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryGoal);
