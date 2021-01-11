import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./Pallete.css";

export default class Pallete extends Component {
  render() {
    const ColorBoxes = this.props.colors.map((color) => (
      <ColorBox background={color.color} name={color.name} />
    ));
    return (
      <div className="Pallete">
        {/* Navbar will go here */}
        <div className="Pallete__colors">
          {ColorBoxes}
          {/* a bunch of colorboxes to be rendered here */}
        </div>
        {/* Footer will go here */}
      </div>
    );
  }
}
