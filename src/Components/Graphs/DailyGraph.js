import React, { useEffect } from "react";
import { useState } from "react";
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);



const DailyGraph = () => {
  return (
    <>
      <Plot
        data={[
          {
            x: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
            y: [9, 4, 1, 4, 2, 3, 4],
            name: "Total Usage",
            mode: "bar",
            type: "bar",
            // marker: {
            //     size: 12
            // }
          },
        ]}
        layout={{
          // width: 320,
          // height: 240,
          title: "Phone Usage",
        }}
        config={{
          editable: true,
          edits: {
            shapePosition: true,
          },
        }}
      />
    </>
  );
};

export default DailyGraph;
