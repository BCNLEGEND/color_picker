import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import seedPalette from "./seedColors";
import { generatePalette } from "./colorHelpers";
import PaletteList from "./PaletteList";

class App extends Component {
  findPalette = (id) => {
    return seedPalette.find((palette) => palette.id === id);
  };
  render() {
    return (
      <Switch>
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
      </Switch>
      // <div className="App">
      //   <Palette palette={generatePalette(seedPalette[3])} />
      // </div>
    );
  }
}

export default App;
