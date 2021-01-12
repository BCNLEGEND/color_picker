import React, { Component } from "react";
import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
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
    const { colors } = this.props.palette;
    const { level, format } = this.state;
    const ColorBoxes = colors[level].map((color) => (
      <ColorBox background={color[format]} name={color.name} />
    ));
    return (
      <div className="Palette">
        <Navbar
          format={format}
          level={level}
          changeLevel={this.changeLevel}
          changeFormat={this.changeFormat}
        />
        {/* Navbar will go here */}
        <div className="Palette__colors">
          {ColorBoxes}
          {/* a bunch of colorboxes to be rendered here */}
        </div>
        {/* Footer will go here */}
      </div>
    );
  }
}
