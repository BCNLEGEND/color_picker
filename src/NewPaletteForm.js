import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import DragableColorBox from "./DragableColorBox";

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
  const [paletteColors, setPaletteColors] = useState([]);
  const [newColorName, setNewColorName] = useState("");
  const [newPaletteName, setNewPaletteName] = useState("");

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  const handelColorChange = (newColor) => {
    setCurrentColor(newColor.hex);
  };

  const addToPaletteColors = () => {
    const color = { color: currentColor, name: newColorName };
    setPaletteColors([...paletteColors, color]);
    setNewColorName("");
  };
  const handleChange = (e) => {
    console.log(e);
    if (e.target.name === "newColorName") {
      setNewColorName(e.target.value);
    } else if (e.target.name === "newPaletteName")
      setNewPaletteName(e.target.value);
  };

  const submitPalette = () => {
    const newName = newPaletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.replace(/ /, "-"),
      colors: paletteColors,
    };
    props.submit(newPalette);
    props.history.push("/");
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return paletteColors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
  });
  useEffect(() => {
    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      return paletteColors.every(({ color }) => color !== currentColor);
    });
  });
  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteUnique", (value) => {
      return props.palettes.every(
        ({ paletteName }) =>
          paletteName.toLowerCase() !== newPaletteName.toLowerCase()
      );
    });
  });

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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
          <ValidatorForm onSubmit={submitPalette}>
            <TextValidator
              value={newPaletteName}
              name="newPaletteName"
              onChange={handleChange}
              validators={["required", "isPaletteUnique"]}
              errorMessages={[
                "Enter Palette name",
                "Palette name already excists",
              ]}
            />
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </ValidatorForm>
          <Button variant="contained" color="secondary">
            Back
          </Button>
        </Toolbar>
      </AppBar>
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
          <Button variant="contained" color="primary">
            Random Color
          </Button>
          <Button variant="contained" color="secondary">
            Clear Palette
          </Button>
        </div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={handelColorChange}
        />
        <ValidatorForm onSubmit={addToPaletteColors} instantValidate={false}>
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
        {paletteColors.map((color) => (
          <DragableColorBox color={color.color} name={color.name}>
            {color}
          </DragableColorBox>
        ))}
      </main>
    </div>
  );
}
