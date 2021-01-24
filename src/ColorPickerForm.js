import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/styles";

const styles = {
  container: {
    width: "100%",
  },
  picker: {
    width: "100% !important",
    marginTop: "2rem",
  },
  addColor: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem",
  },
  colorNameInput: {
    width: "100%",
  },
};

class ColorPickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: "teal",
      newColorName: "",
    };
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      return this.props.colors.every(
        (color) => color !== this.state.currentColor
      );
    });
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
  }

  handelColorChange = (newColor) => {
    this.setState({ currentColor: newColor.hex });
  };

  handleChange = (e) => {
    this.setState({ newColorName: e.target.value });
  };

  handleSubmit = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName,
    };
    this.props.addTocolors(newColor);
    this.setState({ newColorName: "" });
  };
  render() {
    const { currentColor, newColorName } = this.state;
    const { classes, disabled } = this.props;
    return (
      <div className={classes.container}>
        <ChromePicker
          color={currentColor}
          onChangeComplete={this.handelColorChange}
          className={classes.picker}
        />
        <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
          <TextValidator
            value={newColorName}
            placeholder="Color name"
            name="newColorName"
            variant="filled"
            margin="normal"
            onChange={this.handleChange}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "this field is required",
              "this name needs to be Unique",
              "this color needs to be Unique",
            ]}
            className={classes.colorNameInput}
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            style={{ backgroundColor: currentColor }}
            disabled={disabled}
            className={classes.addColor}
          >
            Add color
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);
