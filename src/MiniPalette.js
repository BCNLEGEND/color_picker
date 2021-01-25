import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/MiniPaletteStyles";
import DeleteIcon from "@material-ui/icons/Delete";

class MiniPalette extends Component {
  handleDelete = (e) => {
    e.stopPropagation();
    this.props.deletePalette(this.props.id);
  };
  render() {
    const { classes, paletteName, emoji, colors, handleClick } = this.props;
    const miniColorBoxes = colors.map((color) => (
      <div
        className={classes.minibox}
        style={{ backgroundColor: color.color }}
        key={color.name}
      ></div>
    ));
    return (
      <div className={classes.root}>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={this.handleDelete}
        />
        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title} onClick={handleClick}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);
