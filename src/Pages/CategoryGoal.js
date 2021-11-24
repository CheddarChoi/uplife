import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setCategoryGoal } from "../store/modules/counter";
import { changeCategory } from "../store/modules/counter";
import { Range, getTrackBackground } from "react-range";
import usageData from "../static/data/usageTime.json";

import DraggableGraph2 from "../Components/Graphs/DraggableGraph2";
import SectionTitle from "../Components/SectionTitle";
import { convertSecToTime } from "../Components/Functions/convertNumToTime";
import { convertNumToTime } from "../Components/Functions/convertNumToTime";

import "../static/customStyle.css";
import "./Goal.css";

const mapStateToProps = (state) => ({
  category: state.counter.category,
  Entertainment: state.counter.Entertainment,
  SNS: state.counter.SNS,
  Communication: state.counter.Communication,
  Total: state.counter.Total,
  Productivity: state.counter.Productivity,
});
const mapDispatchToProps = (dispatch) => ({
  setCategoryGoal: (category, num) => dispatch(setCategoryGoal(category, num)),
  changeCategory: (type) => dispatch(changeCategory(type)),
});

const CategoryGoal = (props) => {
  const history = useHistory();
  const { setCategoryGoal } = props;
  const [category, setCategory] = useState("Entertainment");
  const options = ["Entertainment", "SNS", "Communication", "Productivity"];
  const min = 0.01;

  const usage = usageData.map(
    (d) => Math.round(convertSecToTime(d[category]) * 100) / 100
  );

  const getGoal = (type) => {
    switch (type) {
      case "Entertainment":
        return props.Entertainment;
      case "SNS":
        return props.SNS;
      case "Communication":
        return props.Communication;
      case "Productivity":
        return props.Productivity;
      case "Total":
        return props.Total;
      default:
        return null;
    }
  };

  // const [max, setMax] = useState(Math.max.apply(Math, usage.slice(0, 7)));
  const [max, setMax] = useState(Math.max.apply(Math, usage.slice(0, 7)));

  const Direction = {
    Right: "to right",
    Left: "to left",
    Down: "to bottom",
    Up: "to top",
  };

  const handleRoute = (path) => {
    history.push(path);
  };

  const onChangeHandler = (e) => {
    setCategory(e.currentTarget.value);
  };
  const handleCategory = (type) => {
    const { changeCategory } = props;
    changeCategory(type);
  };
  const handleMax = (type) => {
    setMax(Math.max.apply(Math, usage.slice(0, 7)));
  };

  useEffect(() => {
    handleCategory(category);
    handleMax(category);
  }, [category]);

  return (
    <div className="container">
      <div className="content">
        <SectionTitle
          title="Goal Type"
          subtitle="Choose a new type of goal you want to create"
        />

        <div className="goalContainer row">
          <div className="goalType col-3" style={{ cursor: "default" }}>
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
              apps less than{" "}
              <span className="blank">
                {convertNumToTime(getGoal(category))}
              </span>{" "}
              a day.
            </h4>
            <button
              className="uplifeButton"
              style={{ marginTop: "auto" }}
              onClick={() => handleRoute("/")}
            >
              Set Goal
            </button>
          </div>
          <div className="col-8">
            <div className="uplifeDiv" style={{ marginBottom: "20px" }}>
              Categorical phone usage over the past week
            </div>
            <h6 style={{ textAlign: "center", marginBottom: "25px" }}>
              Drag the black bar to set your own goal
            </h6>
            <div style={{ width: "100%" }}>
              <DraggableGraph2 />
            </div>
          </div>
          <div className="col">
            <Range
              direction={Direction.Up}
              values={[
                getGoal(category) > max
                  ? max
                  : getGoal(category)
                  ? getGoal(category)
                  : 0.5,
              ]}
              step={0.01}
              min={min}
              max={max}
              onChange={(values) => {
                setCategoryGoal(category, values[0]);
              }}
              renderTrack={({ props, children }) => (
                <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                    ...props.style,
                    margin: "150px 0px",
                    height: "60%",
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <div
                    ref={props.ref}
                    style={{
                      height: "100%",
                      width: "5px",
                      borderRadius: "0px",
                      background: getTrackBackground({
                        values: [
                          getGoal(category) > max
                            ? max
                            : getGoal(category)
                            ? getGoal(category)
                            : 0.25,
                        ],
                        colors: ["#548BF4", "#ccc"],
                        min: min,
                        max: max,
                        direction: Direction.Up,
                      }),
                      alignSelf: "center",
                    }}
                  >
                    {children}
                  </div>
                </div>
              )}
              renderThumb={({ props, isDragged }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "40px",
                    width: "40px",
                    borderRadius: "20px",
                    backgroundColor: "#FFF",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0px 2px 6px #AAA",
                  }}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryGoal);
