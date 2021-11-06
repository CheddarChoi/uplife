import React from "react";
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

const DailyGraph = () => {
  return (
    <>
      <Plot
        data={[{
                x: ['MON', 'TUE', 'WED', 'THU','FRI','SAT','SUN'],
                y: [4, 1, 3, 5,5,2,1],
                text: ['a', 'b', 'c', 'd'],
                customdata: ['c.a', 'c.b', 'c.c', 'c.d'],
                name: 'Emotion Rate',
                mode: 'bar',
                marker: {
                    'size': 12
                }
            }, {
                x: ['MON', 'TUE', 'WED', 'THU','FRI','SAT','SUN'],
                y: [9, 4, 1, 4,2,3,4],
                text: ['w', 'x', 'y', 'z'],
                customdata: ['c.w', 'c.x', 'c.y', 'c.z'],
                name: 'Total Usage',
                mode: 'bar',
                type:'bar'
                // marker: {
                //     size: 12
                // }
            }]}
        layout={{
          // width: 320, 
          // height: 240, 
          title: 'Phone Usage',
          shapes: [{
                    type: 'line',

                    x0: 0,
                    x1: 1,
                    xref: 'paper',

                    y0: 3,
                    y1: 3,
                    yref: 'y',

                    line: {
                        width: 4,
                        color: 'rgb(30, 30, 30)'
                    }
                }]
        }}
        config={{
            editable: true,
            edits: {
                shapePosition: true
            }
        }}
      />
    </>
  );
};

export default DailyGraph;
