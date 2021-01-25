import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = { open: "namePicker", newPaletteName: "" };
  }
  handleClickOpen = () => {
    this.setState({ open: "namePicker" });
  };

  handleClose = () => {
    this.setState({ open: "namePicker" });
    this.props.handleIsShowing();
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  showEmoji = () => {
    this.setState({ open: "emojiPicker" });
  };

  getEmoji = (emoji) => {
    const newPalette = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native,
    };
    this.props.submitPalette(newPalette);
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
    const { open, newPaletteName } = this.state;
    return (
      <div>
        <Dialog open={open === "emojiPicker"} onClose={this.handleClose}>
          <Picker onSelect={this.getEmoji} />
        </Dialog>
        <Dialog
          open={open === "namePicker"}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Unique Palette Name</DialogTitle>
          <ValidatorForm onSubmit={this.showEmoji}>
            <DialogContent>
              <DialogContentText>
                Please enter a unique Palette Name
              </DialogContentText>
              <TextValidator
                value={newPaletteName}
                name="newPaletteName"
                onChange={this.handleChange}
                validators={["required", "isPaletteUnique"]}
                fullWidth
                margin="normal"
                errorMessages={[
                  "Enter Palette name",
                  "Palette name already excists",
                ]}
              />
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;
