import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/SingleColorpaletteStyles";

class SingleColorpalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.getShades(this.props.palette, this.props.colorId);
    this.state = { format: "hex" };
  }
  getShades(palette, colorToFilterBy) {
    let shades = [];
    let totalColors = palette.colors;
    for (let key in totalColors) {
      shades = shades.concat(
        totalColors[key].filter((color) => color.id === colorToFilterBy)
      );
    }
    return shades.slice(1);
  }
  changeLevel = (newLevel) => {
    this.setState({ level: newLevel });
  };

  changeFormat = (val) => {
    this.setState({ format: val });
  };
  render() {
    const { format } = this.state;
    const { paletteName, emoji, id } = this.props.palette;
    const { classes } = this.props;
    const colorBoxes = this._shades.map((color) => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[format]}
        singleColorBox={true}
      />
    ));
    return (
      <div className={classes.palette}>
        <Navbar
          format={format}
          changeFormat={this.changeFormat}
          showLevel={false}
        />
        <div className={classes.paletteColors}>
          {colorBoxes}
          <div className={classes.ColorBox}>
            <Link to={`/palette/${id}`} className={classes.ColorBoxBack}>
              Go Back
            </Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorpalette);
