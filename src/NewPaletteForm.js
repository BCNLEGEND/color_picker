import React, { useState } from "react";
import PaletteFormNav from "./PaletteFormNav";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { arrayMove } from "react-sortable-hoc";

import DragableColorList from "./DragableColorList";
import ColorPickerForm from "./ColorPickerForm";
import useStyles from "./styles/NewPaletteFormStyles";

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

  const submitPalette = (newPalette) => {
    const submitNewPalette = {
      paletteName: newPalette.paletteName,
      emoji: newPalette.emoji,
      id: newPalette.paletteName.replace(/ /, "-"),
      colors: colors,
    };
    props.submit(submitNewPalette);
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
