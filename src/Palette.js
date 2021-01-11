import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";

export default class Palette extends Component {
  render() {
    const ColorBoxes = this.props.colors.map((color) => (
      <ColorBox background={color.color} name={color.name} />
    ));
    return (
      <div className="Palette">
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
