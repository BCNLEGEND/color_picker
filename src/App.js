import React, { Component } from "react";
import Palette from "./Palette";
import seedPalette from "./seedColors";
import { generatePalette } from "./colorHelpers";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Palette palette={generatePalette(seedPalette[3])} />
      </div>
    );
  }
}

export default App;
