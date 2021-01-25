import chroma from "chroma-js";
import sizes from "./sizes";

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    "&:hover svg": {
      color: (props) =>
        chroma(props.color).luminance() > 0.07
          ? "rgba(255, 255, 255, 0.8)"
          : "rgba(0,0,0,0.6)",
      transform: "scale(1.5)",
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: "20%",
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "10%",
    },
    [sizes.down("sm")]: {
      width: "100%",
      height: "5  %",
    },
  },
  boxContent: {
    width: "100%",
    position: "absolute",
    bottom: "0",
    left: "0",
    padding: "10px",
    color: (props) =>
      chroma(props.color).luminance() < 0.07
        ? "rgba(255, 255, 255, 0.8)"
        : "rgba(0,0,0,0.6)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
  },
  deleteIcon: {
    transition: "all 0.3s ease-in-out",
  },
};

export default styles;
