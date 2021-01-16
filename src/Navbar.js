import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import styles from "./styles/NavbarStyles";
import "rc-slider/assets/index.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
  }
  handleFormatChange = (e) => {
    this.setState({ open: true });
    this.props.changeFormat(e.target.value);
  };

  closeSnackbar = () => {
    this.setState({ open: false });
  };
  render() {
    const { level, changeLevel, format, classes } = this.props;
    return (
      <nav className={classes.Navbar}>
        <div className={classes.NavbarLogo}>
          <Link to="/">Elige tu Color</Link>
        </div>
        {this.props.showLevel && (
          <div className={classes.NavbarContainer}>
            <span className={classes.NavbarSpan}>level: {level}</span>
            <div className={classes.NavbarSlider}>
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onAfterChange={changeLevel}
              />
            </div>
          </div>
        )}
        <div className={classes.NavbarSelect}>
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value="hex">Hex - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          autoHideDuration={3000}
          message={
            <span id="message-id">
              Format Changed to {format.toUpperCase()}!
            </span>
          }
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          onClose={this.closeSnackbar}
          action={[
            <IconButton
              onClick={this.closeSnackbar}
              color="inherit"
              key="close"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>,
          ]}
        ></Snackbar>
      </nav>
    );
  }
}

export default withStyles(styles)(Navbar);
