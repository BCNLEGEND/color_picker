import React, { Component } from "react";
import Pallete from "./Pallete";
import seedPallete from "./seedColors";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Pallete {...seedPallete[3]} />
      </div>
    );
  }
}

export default App;
