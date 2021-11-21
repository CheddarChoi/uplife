export const customLayout = {
  paper_bgcolor: "#f9fbff",
  plot_bgcolor: "#f9fbff",
};

export const customConfig = {
  displayModeBar: false,
};

export const emotionAxis = (direction) => {
  if (direction === "right")
    return {
      title: "Emotional Rate",
      fixedrange: true,
      range: [-10, 10],
      showgrid: false,
      overlaying: "y",
      side: "right",
    };
  if (direction === "left")
    return {
      title: "Emotional Rate",
      fixedrange: true,
      range: [-10, 10],
      showgrid: false,
    };
};
