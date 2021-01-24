import React, { useState, useEffect } from "react";
import PaletteFormNav from "./PaletteFormNav";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { arrayMove } from "react-sortable-hoc";

import DragableColorList from "./DragableColorList";
const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function NewPaletteForm(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [currentColor, setCurrentColor] = useState("teal");
  const [colors, setColors] = useState(props.palettes[0].colors);
  const [newColorName, setNewColorName] = useState("");

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  const handelColorChange = (newColor) => {
    setCurrentColor(newColor.hex);
  };

  const addTocolors = () => {
    const color = { color: currentColor, name: newColorName };
    setColors([...colors, color]);
    setNewColorName("");
  };
  const handleChange = (e) => {
    setNewColorName(e.target.value);
  };

  const deleteColor = (deleteName) => {
    const newcolors = colors.filter(({ name }) => name !== deleteName);
    console.log(newcolors);
    setColors(newcolors);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    console.log(arrayMove(colors, oldIndex, newIndex));
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  const clearPalette = () => {
    setColors([]);
  };

  const submitPalette = (newPaletteName) => {
    const newName = newPaletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.replace(/ /, "-"),
      colors: colors,
    };
    props.submit(newPalette);
    props.history.push("/");
  };

  const randomColor = () => {
    const allColors = props.palettes.map((p) => p.colors).flat();
    const rdn = Math.floor(Math.random() * allColors.length);
    setColors([...colors, allColors[rdn]]);
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
  });
  useEffect(() => {
    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      return colors.every((color) => color !== currentColor);
    });
  });

  return (
    <div className={classes.root}>
      <PaletteFormNav
        classes={classes}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        colors={colors}
        submitPalette={submitPalette}
        palettes={props.palettes}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : ""}
          </IconButton>
        </div>
        <Divider />
        <Typography variant="h6">Pick your color</Typography>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={randomColor}
            disabled={colors.length >= props.maxColors}
          >
            Random Color
          </Button>
          <Button variant="contained" color="secondary" onClick={clearPalette}>
            Clear Palette
          </Button>
        </div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={handelColorChange}
        />
        <ValidatorForm onSubmit={addTocolors} instantValidate={false}>
          <TextValidator
            value={newColorName}
            name="newColorName"
            onChange={handleChange}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "this field is required",
              "this name needs to be Unique",
              "this color needs to be Unique",
            ]}
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            style={{ backgroundColor: currentColor }}
            disabled={colors.length >= props.maxColors}
          >
            Pick your color
          </Button>
        </ValidatorForm>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {" "}
        <div className={classes.drawerHeader} />
        <DragableColorList
          colors={colors}
          deleteColor={deleteColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
}

NewPaletteForm.defaultProps = {
  maxColors: 20,
};
