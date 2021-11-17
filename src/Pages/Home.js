import React from "react";

import SectionTitle from "../Components/SectionTitle";
import DraggableGraph from "../Components/Graphs/DraggableGraph";
import CategoryBarGraph from "../Components/Graphs/CategoryBarGraph";
import DailyGraph from "../Components/Graphs/DailyGraph";

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
          </div>
        </div>
        <div
          className="d-flex justify-content-around"
          style={{ marginTop: "50px", columnGap: "30px" }}
        >
          <div className="col-7">
            <div className="uplifeDiv">Total App Usage</div>
            <div style={{ width: "100%", border: "solid 1px black" }}>
              <DraggableGraph />
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

export default Home;
