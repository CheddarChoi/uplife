import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import SectionTitle from "../Components/SectionTitle";
import { connect } from "react-redux";
import { convertNumToTime } from "../Components/Functions/convertNumToTime";

import { allCategory } from "../Components/variables/categories";
import { Button } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { changeCategory } from "../store/modules/counter";
import { setCategoryGoal } from "../store/modules/counter";
import "./Goal.css";

const GoalNum = (props) => {
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

const mapStateToProps = (state) => ({
  category: state.counter.category,
  Entertainment: state.counter.Entertainment,
  SNS: state.counter.SNS,
  Communication: state.counter.Communication,
  Total: state.counter.Total,
  Productivity: state.counter.Productivity,
});

const mapDispatchToProps = (dispatch) => ({
  changeCategory: (type) => dispatch(changeCategory(type)),
  setCategoryGoal: (category, num) => dispatch(setCategoryGoal(category, num)),
});

const Goal = (props) => {
  useEffect(()=>{
    console.log("Goal Rendered")
  },[])
  const history = useHistory();
  const { setCategoryGoal } = props;

  const handleRoute = (path) => {
    history.push(path);
  };

  var currentGoal = {};
  allCategory.forEach((c) => {
    currentGoal[c] = props[c];
  });

  return (
    <div class="container">
      <div class="content">
        <div class="d-flex">
          <div
            class="colSection"
            style={{ borderRight: "solid 1px black", paddingRight: "30px" }}
          >
            <SectionTitle
              title="Current Goals"
              subtitle="Check your current goal lists"
            />
            <ul>
              {!!currentGoal["Total"] && (
                <li>
                  <h5>
                    I will use my phone less than{" "}
                    <b>{convertNumToTime(currentGoal["Total"])}</b> a day.
                    &nbsp;
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        setCategoryGoal("Total", NaN);
                      }}
                    >
                      <FaTrashAlt />
                    </Button>
                  </h5>
                </li>
              )}
              {allCategory.map((c) => {
                if (c !== "Total" && currentGoal[c])
                  return (
                    <li>
                      <h5>
                        I will use <b>{c}</b> apps less than{" "}
                        <b>{convertNumToTime(currentGoal[c])}</b> a day. &nbsp;
                        <Button
                          variant="outline-danger"
                          size="sm"
                          // style={{ cursor: pointer }}
                          onClick={() => {
                            setCategoryGoal(c, NaN);
                          }}
                        >
                          <FaTrashAlt />
                        </Button>
                      </h5>
                    </li>
                  );
                else return <></>;
              })}
            </ul>
          </div>
          <div class="colSection" style={{ marginLeft: "35px" }}>
            <SectionTitle
              title="Add New Goals"
              subtitle="Choose a new type of goal you want to create"
            />
            <div class="goalContainer row">
              <div
                className="goalType col"
                onClick={() => handleRoute("/goal/total")}
              >
                <GoalNum num="1" />
                <h4>
                  I will use my phone less than{" "}
                  <span className="blank">
                    {convertNumToTime(currentGoal["Total"])}
                  </span>{" "}
                  a day.
                </h4>
              </div>

              <div
                className="goalType col"
                onClick={() => handleRoute("/goal/category")}
              >
                <GoalNum num="2" />
                <h4>
                  I will use <span className="blank">entertainment</span> apps
                  less than <span className="blank">1 hr 15 min</span> a day.
                </h4>
              </div>

              {/* <div
            className="goalType col"
            // onClick={() => alert("Not implemented yet!")}
            onClick={() => handleRoute("/goal/time")}
          >
            <GoalNum num="3" />
            <h4>
              I will not use <span className="blank">social</span> apps during{" "}
              <span className="blank">1:00 pm ~ 3:00 pm</span>
            </h4>
          </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Goal);
