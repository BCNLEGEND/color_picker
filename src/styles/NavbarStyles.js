import sizes from "./sizes";

const styles = {
  Navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "5vh",
  },
  NavbarLogo: {
    marginRight: "15px",
    padding: "0 13px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#eceff1",
    fontFamily: "Roboto",
    height: "100%",
    "& a": {
      textDecoration: "none",
      color: "black",
    },
    [sizes.down("xs")]: {
      display: "none",
    },
  },
  NavbarContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  NavbarSpan: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  NavbarSlider: {
    paddingLeft: "10px",
    display: "flex",
    alignItems: "center",
    width: "340px",
    height: "40px",
    "& .rc-slider-track": {
      background: "transparent",
    },
    "& .rc-slider-rail": {
      height: "8px",
    },
    "& .rc-slider-handle, .rc-slider-handle:hover, .rc-slider-handle:focus, .rc-slider-handle:active": {
      outline: "none",
      background: "green",
      border: "2px solid green",
      boxShadow: "none",
      width: "13px",
      height: "13px",
      marginLeft: "-7px",
      marginTop: "-3px",
    },
    [sizes.down("md")]: {
      width: "125px",
    },
  },
  NavbarSelect: {
    marginLeft: "auto",
    marginRight: "20px",
  },
};

export default styles;
