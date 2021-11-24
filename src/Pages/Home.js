import React from "react";

import SectionTitle from "../Components/SectionTitle";
import CategoryBarGraph from "../Components/Graphs/CategoryBarGraph";
import DailyGraph from "../Components/Graphs/DailyGraph";
import AppUsageGraph from "../Components/Graphs/AppUsageGraph";
import { connect } from "react-redux";
import { changeCategory } from "../store/modules/counter";
import { useHistory } from "react-router-dom";

import { allColors } from "../Components/variables/categories";
import { allCategory } from "../Components/variables/categories";
import { appByCategory } from "../Components/variables/categories";

import "./Home.css";
import DotGraph from "../Components/Graphs/DotGraph";
import Header from "../Components/Header";

const mapStateToProps = (state) => ({
  category: state.counter.category,
});
const mapDispatchToProps = (dispatch) => ({
  changeCategory: (category) => dispatch(changeCategory(category)),
});

const Home = (props) => {
  const categoryButs = Object.entries(allColors).map((key, i) => {
    const { changeCategory, category } = props;
    const setCategory = () => {
      changeCategory(allCategory[4 - i]);
    };
    return (
      <div
        onClick={setCategory}
        className="categoryTag"
        style={{ backgroundColor: category === key[0] ? key[1][0] : key[1][1] }}
      >
        <div className="categoryButton">{key[0]}</div>
      </div>
    );
  });

  var apps = [];
  if (props.category === "Total")
    Object.entries(appByCategory).forEach(
      (key) => (apps = apps.concat(key[1]))
    );
  else apps = appByCategory[props.category];
  apps.sort();

  const history = useHistory();
  const handleRoute = (path) => {
    history.push(path);
  };

  return (
    <>
      <Header selected="Home" />
      <div className="container">
        <div className="content">
          <SectionTitle
            title="Daily Summary"
            subtitle="Check you daily phone usage pattern and overal goal achievement"
          />
          <div
            className="d-flex justify-content-around"
            style={{ marginTop: "50px", columnGap: "30px" }}
          >
            <div className="col-8">
              <div className="uplifeDiv">
                Today's Phone Usage &#38; Emotional State
              </div>
              <div style={{ width: "100%" }}>
                <DailyGraph />
              </div>
            </div>
            <div className="col-4">
              <div className="uplifeDiv">App Category</div>
              <div className="d-flex">
                <div className="col-6">{categoryButs}</div>
                <div className="col-6">
                  <div className="appList">
                    {apps.map((name) => {
                      return (
                        <div className="appLogoTooltip">
                          <img
                            src={
                              process.env.PUBLIC_URL + "/app/" + name + ".jpg"
                            }
                            alt={name + " logo"}
                            className="appLogo"
                          />
                          <div className="tooltiptext appName">{name}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="d-flex justify-content-around"
            style={{ marginTop: "50px", columnGap: "30px" }}
          >
            <div className="col-7">
              <div className="uplifeDiv">Weekly Total App Usage</div>
              <div style={{ width: "100%" }}>
                <AppUsageGraph />
              </div>
            </div>
            <div className="col-5">
              <div className="uplifeDiv">Today's Usage by Category</div>
              <div style={{ width: "100%" }}>
                <CategoryBarGraph />
              </div>
            </div>
          </div>
          <div style={{ marginTop: "50px", columnGap: "30px" }}>
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
          <div
            className="d-flex justify-content-around"
            style={{ marginTop: "50px", columnGap: "30px" }}
          >
            <button
              className="uplifeToGoal"
              onClick={() => handleRoute("/goal")}
              s
            >
              Set / Change Goals
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
