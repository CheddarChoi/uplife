import React from "react";

import SectionTitle from "../Components/SectionTitle";
import CategoryBarGraph from "../Components/Graphs/CategoryBarGraph";
import DailyGraph from "../Components/Graphs/DailyGraph";
import DailyGraph2 from "../Components/Graphs/DailyGraph2";
import { connect } from "react-redux";
import { changeCategory } from "../store/modules/counter";

import "./Home.css";

const allColors = {
  Productivity: "#883DA2",
  Communcation: "#7BAB63",
  SNS: "#FFBC47",
  Entertainment: "#E4567C",
  Total: "#3598DB",
};

const mapStateToProps = (state) => ({
  category: state.counter.category,
});
const mapDispatchToProps = (dispatch) => ({
  changeCategory: (category) => dispatch(changeCategory(category)),
});

const categoryLits = Object.entries(allColors).map((key, i) => {
  return (
    <div className="categoryTag" style={{ backgroundColor: key[1] }}>
      <h6>{key[0]}</h6>
    </div>
  );
});

const Home = () => {
  return (
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
          <div className="col-7">
            <div className="uplifeDiv">Phone Usage &#38; Emotional State</div>
            <div style={{ width: "100%", border: "solid 1px black" }}>
              <DailyGraph />
            </div>
          </div>
          <div className="col-5">
            <div className="uplifeDiv">App Category</div>
            {categoryLits}
          </div>
        </div>
        <div
          className="d-flex justify-content-around"
          style={{ marginTop: "50px", columnGap: "30px" }}
        >
          <div className="col-7">
            <div className="uplifeDiv">Total App Usage</div>
            <div style={{ width: "100%", border: "solid 1px black" }}>
              <DailyGraph2 />
            </div>
          </div>
          <div className="col-5">
            <div className="uplifeDiv">Usage by Category</div>
            <div style={{ width: "100%", border: "solid 1px black" }}>
              <CategoryBarGraph />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
