import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import seedPalette from "./seedColors";
import { generatePalette } from "./colorHelpers";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorpalette";
import NewPaletteForm from "./NewPaletteForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorPalettes: [...seedPalette],
    };
  }

  findPalette = (id) => {
    return this.state.colorPalettes.find((palette) => palette.id === id);
  };
  deletePalette = (id) => {
    this.setState((st) => ({
      colorPalettes: st.colorPalettes.filter((palette) => palette.id !== id),
    }));
  };

  submitColorPalette = (newColorPalette) => {
    this.setState({
      colorPalettes: [...this.state.colorPalettes, newColorPalette],
    });
  };

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/palette/new"
          render={(routeProps) => (
            <NewPaletteForm
              submit={this.submitColorPalette}
              {...routeProps}
              palettes={this.state.colorPalettes}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <PaletteList
              palettes={this.state.colorPalettes}
              {...routeProps}
              deletePalette={this.deletePalette}
            />
          )}
        />
        <Route
          exact
          path="/palette/:id"
          render={(routeProps) => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={(routeProps) => (
            <SingleColorPalette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
              colorId={routeProps.match.params.colorId}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
