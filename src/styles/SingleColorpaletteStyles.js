const styles = {
  palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  paletteColors: {
    height: "87%",
  },
  ColorBox: {
    width: "20%",
    height: "50%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    backgroundColor: "black",
  },
  ColorBoxBack: {
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
    color: "#fff",
    textAlign: "center",
  },
};

export default styles;
