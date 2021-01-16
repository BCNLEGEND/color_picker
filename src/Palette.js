import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";

import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/PaletteStyles";

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: "hex" };
  }

  changeLevel = (newLevel) => {
    this.setState({ level: newLevel });
  };

  changeFormat = (val) => {
    this.setState({ format: val });
  };
  render() {
    const { colors, paletteName, emoji, id } = this.props.palette;
    const { classes } = this.props;
    const { level, format } = this.state;
    const ColorBoxes = colors[level].map((color) => (
      <ColorBox
        background={color[format]}
        name={color.name}
        key={color.id}
        moreUrl={`/palette/${id}/${color.id}`}
        singleColorBox={false}
      />
    ));
    return (
      <div className={classes.palette}>
        <Navbar
          format={format}
          level={level}
          changeLevel={this.changeLevel}
          changeFormat={this.changeFormat}
          showLevel
        />
        <div className={classes.paletteColors}>{ColorBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
