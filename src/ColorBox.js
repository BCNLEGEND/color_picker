import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/ColorBoxStyles";

class ColorBox extends Component {
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
    const { background, name, moreUrl, singleColorBox, classes } = this.props;
    const { copied } = this.state;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div className={classes.colorBox} style={{ background }}>
          <div
            style={{ background }}
            className={`${classes.colorBoxCopyOverlay} ${
              copied && classes.copyOverlayShow
            }`}
          />
          <div
            className={`${classes.copyMsg} ${copied && classes.copyMsgShow}`}
          >
            <h1>Copied</h1>
            <p className={classes.copyText}>{background}</p>
          </div>
          <div></div>
          <div className={classes.colorBoxContent}>
            <span className={classes.copyText}>{name}</span>
          </div>
          <button className={classes.colorBoxCopyBtn}>Copy</button>
          {!singleColorBox && (
            <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
              <span className={classes.colorBoxMore}>MORE</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
