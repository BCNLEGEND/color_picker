import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import "./ColorBox.css";

export default class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
  }
  changeCopyState = () => {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  };

  render() {
    const { background, name, moreUrl, showLink } = this.props;
    const { copied } = this.state;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div className="ColorBox" style={{ background }}>
          <div
            style={{ background }}
            className={`ColorBox__copy-overlay ${copied && "show"}`}
          />
          <div className={`ColorBox__copy-msg ${copied && "show"}`}>
            <h1>Copied</h1>
            <p>{background}</p>
          </div>
          <div className="ColorBox__copy-container"></div>
          <div className="ColorBox__content">
            <span>{name}</span>
          </div>
          <button className="ColorBox__copy-btn">Copy</button>
          {showLink && (
            <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
              <span className="ColorBox__more">More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}
