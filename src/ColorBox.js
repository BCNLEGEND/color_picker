import React, { Component } from "react";
import "./ColorBox.css";

export default class ColorBox extends Component {
  render() {
    const { background, name } = this.props;
    return (
      <div className="ColorBox" style={{ background }}>
        <div className="ColorBox__copy-container"></div>
        <div className="ColorBox__content">
          <span>{name}</span>
        </div>
        <button className="ColorBox__copy-btn">Copy</button>
        <span className="ColorBox__more">More</span>
      </div>
    );
  }
}
