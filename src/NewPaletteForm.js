import React, { useState } from "react";
import PaletteFormNav from "./PaletteFormNav";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { arrayMove } from "react-sortable-hoc";

import DragableColorList from "./DragableColorList";
import ColorPickerForm from "./ColorPickerForm";

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
    display: "flex",
    alignItems: "center",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "right",
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
  container: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    width: "100%",
  },
  button: {
    width: "50%",
  },
}));

export default function NewPaletteForm(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState(props.palettes[0].colors);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  const addTocolors = (color) => {
    setColors([...colors, color]);
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

  return (
    <div className={classes.root}>
      <PaletteFormNav
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
        <div className={classes.container}>
          <Typography variant="h6" gutterBottom>
            Pick your color
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={randomColor}
              disabled={colors.length >= props.maxColors}
              className={classes.button}
            >
              Random Color
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearPalette}
              className={classes.button}
            >
              Clear Palette
            </Button>
          </div>
          <ColorPickerForm
            addTocolors={addTocolors}
            disabled={colors.length >= props.maxColors}
            colors={colors}
          />
        </div>
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
