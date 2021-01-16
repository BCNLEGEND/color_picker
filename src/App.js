import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import seedPalette from "./seedColors";
import { generatePalette } from "./colorHelpers";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorpalette";
import NewPaletteForm from "./NewPaletteForm";

class App extends Component {
  findPalette = (id) => {
    return seedPalette.find((palette) => palette.id === id);
  };
  render() {
    return (
      <Switch>
        <Route exact path="/palette/new" render={() => <NewPaletteForm />} />
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <PaletteList palettes={seedPalette} {...routeProps} />
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
      // <div className="App">
      //   <Palette palette={generatePalette(seedPalette[3])} />
      // </div>
    );
  }
}

export default App;
