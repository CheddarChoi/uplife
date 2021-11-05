import React from "react";
import "../static/customStyle.css";

const SectionTitle = (props) => {
  return (
    <>
      <div style={{ display: "flex", marginBottom: "45px" }}>
        {/* <div classNAme="col-md-auto">
          <div
            style={{
              width: "30px",
              height: "3px",
              backgroundColor: "black",
              marginTop: "24px",
              marginRight: "20px",
            }}
          ></div>
        </div> */}
        <div className="col">
          <h1>{props.title}</h1>
          <h5 style={{ marginTop: "10px" }} className="gray">
            {props.subtitle}
          </h5>
        </div>
      </div>
    </>
  );
};

export default SectionTitle;
