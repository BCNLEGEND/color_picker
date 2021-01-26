import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import styles from "./styles/PaletteListStyles";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Dialog } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteDialogOpen: false,
      deletingId: "",
    };
  }

  toggleDialog = (id) => {
    this.setState({
      deleteDialogOpen: !this.state.deleteDialogOpen,
      deletingId: id,
    });
  };

  handleDelete = () => {
    this.props.deletePalette(this.state.deletingId);
    this.toggleDialog("");
  };

  goToPallete(id) {
    this.props.history.push(`/palette/${id}`);
  }
  render() {
    const { palettes, classes } = this.props;
    const { deleteDialogOpen } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors</h1>
            <Link to="/palette/new">Create new Palette</Link>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {palettes.map((palette) => (
              <CSSTransition key={palette.id} timeout={500} classNames="fade">
                <MiniPalette
                  {...palette}
                  handleClick={() => this.goToPallete(palette.id)}
                  // deletePalette={deletePalette}
                  deletePalette={this.toggleDialog}
                  key={palette.id}
                  id={palette.id}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog
          open={deleteDialogOpen}
          aria-labelledby="delete-dialog-title"
          onClose={this.toggleDialog}
        >
          <DialogTitle id="delete-dialog-title">Delete Palette?</DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar
                  style={{ backgroundColor: green[100], color: green[600] }}
                >
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete" />
            </ListItem>
            <ListItem button onClick={this.toggleDialog}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <ClearIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Back" />
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
