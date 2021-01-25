import React, { Component } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import PaletteMetaForm from "./PaletteMetaForm";
import styles from "./styles/PaletteFormNavStyles";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = { newPaletteName: "", isShowing: false };
  }

  handleIsShowing = () => {
    this.setState({ isShowing: !this.state.isShowing });
  };
  render() {
    const {
      classes,
      open,
      handleDrawerOpen,
      submitPalette,
      palettes,
    } = this.props;
    return (
      <div className={classes.root}>
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
              <LibraryAddIcon />
            </IconButton>
          </Toolbar>
          <Typography variant="h6" noWrap>
            Create a new palette
          </Typography>
          <div className={classes.navbtns}>
            <Link to="/" className={classes.link}>
              <Button
                className={classes.navbtns}
                variant="contained"
                color="secondary"
              >
                Back
              </Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleIsShowing}
              className={classes.navbtns}
            >
              Save
            </Button>
          </div>
        </AppBar>
        {this.state.isShowing && (
          <PaletteMetaForm
            submitPalette={submitPalette}
            palettes={palettes}
            handleIsShowing={this.handleIsShowing}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
