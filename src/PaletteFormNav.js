import React, { Component } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

export default class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = { newPaletteName: "" };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteUnique", (value) => {
      return this.props.palettes.every(
        ({ paletteName }) =>
          paletteName.toLowerCase() !== this.state.newPaletteName.toLowerCase()
      );
    });
  }

  render() {
    const { classes, open, handleDrawerOpen, submitPalette } = this.props;
    const { newPaletteName } = this.state;
    return (
      <div>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Persistent drawer
            </Typography>
            <ValidatorForm onSubmit={this.submitPalette}>
              <TextValidator
                value={newPaletteName}
                name="newPaletteName"
                onChange={this.handleChange}
                validators={["required", "isPaletteUnique"]}
                errorMessages={[
                  "Enter Palette name",
                  "Palette name already excists",
                ]}
              />
              <Button
                onClick={() => submitPalette(newPaletteName)}
                variant="contained"
                color="primary"
                type="submit"
              >
                Save Palette
              </Button>
            </ValidatorForm>
            <Link to="/">
              <Button variant="contained" color="secondary">
                Back
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
