import React from "react";

import SectionTitle from "../Components/SectionTitle";
import DraggableGraph from "../Components/Graphs/DraggableGraph";

const Home = () => {
  return (
    <div class="container">
      <div class="content">
        <SectionTitle
          title="Daily Summary"
          subtitle="Check you daily phone usage pattern and overal goal achievement"
        />
        <div class="d-flex justify-content-around">
          <div class="col-md-auto">
            <div className="uplifeDiv">Phone Usage &#38; Emotional State</div>
            <div style={{ width: "100%", border: "solid 1px black" }}>
              <DraggableGraph />
            </div>
          </div>
          <div class="col-md-auto">
            <div className="uplifeDiv">App Category</div>
          </div>
        </div>
        <div
          class="d-flex justify-content-around"
          style={{ marginTop: "50px" }}
        >
          <div class="col-md-auto">
            <div className="uplifeDiv">Total App Usage</div>
            <div style={{ width: "100%", border: "solid 1px black" }}>
              <DraggableGraph />
            </div>
          </div>
          <div class="col-md-auto">
            <div className="uplifeDiv">Usage by Category</div>
            <div style={{ width: "100%", border: "solid 1px black" }}>
              <DraggableGraph />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
