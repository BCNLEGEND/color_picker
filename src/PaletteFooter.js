import React from "react";

export default function PaletteFooter(props) {
  const { paletteName, emoji } = props;
  return (
    <footer className="Palette__footer">
      {paletteName}
      <span className="Palette__footer-emoji">{emoji}</span>
    </footer>
  );
}
