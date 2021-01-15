import React, { Component } from "react";
import { Link } from "react-router-dom";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";

export default class SingleColorpalette extends Component {
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
    const colorBoxes = this._shades.map((color) => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[format]}
        showLink={false}
      />
    ));
    return (
      <div className="SingleColorpalette Palette">
        <Navbar
          format={format}
          changeFormat={this.changeFormat}
          showLevel={false}
        />
        <div className="Palette__colors">
          {colorBoxes}
          <div to="/" className="ColorBox">
            <Link to={`/palette/${id}`} className="ColorBox__back">
              Go Back
            </Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}
