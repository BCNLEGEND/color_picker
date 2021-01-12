import React, { Component } from "react";
import Slider from "rc-slider";
import ColorBox from "./ColorBox";
import "rc-slider/assets/index.css";
import "./Palette.css";

export default class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500 };
  }

  changeLevel = (newLevel) => {
    this.setState({ level: newLevel });
  };

  render() {
    const { colors } = this.props.palette;
    const { level } = this.state;
    const ColorBoxes = colors[level].map((color) => (
      <ColorBox background={color.hex} name={color.name} />
    ));
    return (
      <div className="Palette">
        <div className="Palette__slider">
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onAfterChange={this.changeLevel}
          />
        </div>
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
