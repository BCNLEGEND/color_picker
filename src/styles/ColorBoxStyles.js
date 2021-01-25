import chroma from "chroma-js";
import sizes from "./sizes";

const styles = {
  copyText: {
    color: (props) =>
      chroma(props.background).luminance() < 0.07 ? "#fff" : "rgba(0,0,0,0.6)",
  },
  colorBox: {
    width: "20%",
    height: (props) => (props.singleColorBox ? "50%" : "25%"),
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    "&:hover button": {
      opacity: "1",
      transition: "0.5s",
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: (props) => (props.singleColorBox ? "33.333%" : "20%"),
    },
    [sizes.down("md")]: {
      width: "50%",
      height: (props) => (props.singleColorBox ? "20%" : "10%"),
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: (props) => (props.singleColorBox ? "10%" : "5%"),
    },
  },
  colorBoxMore: {
    color: (props) =>
      chroma(props.background).luminance() < 0.08 ? "#fff" : "rgba(0,0,0,0.4)",
    background: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    border: "none",
    right: "0",
    bottom: "0",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px",
    textTransform: "uppercase",
  },
  colorBoxCopyBtn: {
    color: (props) =>
      chroma(props.background).luminance() < 0.08 ? "#fff" : "rgba(0,0,0,0.4)",
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: "none",
    background: "rgba(255, 255, 255, 0.3)",
    fontSize: "1rem",
    lineHeight: "30px",
    border: "none",
    textDecoration: "none",
    textAlign: "center",
    opacity: "0",
  },
  colorBoxContent: {
    width: "100%",
    position: "absolute",
    bottom: "0",
    left: "0",
    padding: "10px",
    color: "rgba(255, 255, 255, 0.8)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
  },
  colorBoxCopyOverlay: {
    opacity: "0",
    zIndex: "0",
    width: "100%",
    height: "100%",
    transition: "transform 0.6s ease-in-out",
    transform: "scale(0.1)",
  },
  copyOverlayShow: {
    opacity: "1",
    transform: "scale(50)",
    zIndex: "10",
    position: "absolute",
  },
  copyMsg: {
    position: "fixed",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "4rem",
    transform: "scale(0.1)",
    opacity: "0",
    color: "#fff",
    "& h1": {
      fontWeight: "400",
      textShadow: "1px 2px black",
      background: "rgba(255, 255, 255, 0.2)",
      width: "100%",
      textAlign: "center",
      marginBottom: "0",
      padding: "1rem",
      [sizes.down("xs")]: {
        fontSize: "5rem",
      },
    },
    "& p": {
      fontSize: "2rem",
      fontWeight: "100",
    },
  },
  copyMsgShow: {
    opacity: "1",
    transform: "scale(1)",
    zIndex: "25",
    transition: "all 0.4s ease-in-out",
    transitionDelay: "0.3s",
  },
};

export default styles;
