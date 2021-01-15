import React, { Component } from "react";
import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";
import "./Palette.css";

export default class Palette extends Component {
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
    const { level, format } = this.state;
    const ColorBoxes = colors[level].map((color) => (
      <ColorBox
        background={color[format]}
        name={color.name}
        key={color.id}
        moreUrl={`/palette/${id}/${color.id}`}
        showLink
      />
    ));
    return (
      <div className="Palette">
        <Navbar
          format={format}
          level={level}
          changeLevel={this.changeLevel}
          changeFormat={this.changeFormat}
          showLevel
        />
        <div className="Palette__colors">{ColorBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}
