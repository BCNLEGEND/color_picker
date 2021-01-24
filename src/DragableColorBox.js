import React from "react";
import chroma from "chroma-js";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { SortableElement } from "react-sortable-hoc";

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
  },
  deleteIcon: {
    transition: "all 0.3s ease-in-out",
  },
};

const DragableColorBox = SortableElement((props) => {
  const { color, classes, name, handleClick } = props;

  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
      </div>
    </div>
  );
});

export default withStyles(styles)(DragableColorBox);
