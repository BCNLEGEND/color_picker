import React, { Component } from "react";
import Pallete from "./pallete";
import seedPallete from "./seedColors";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Pallete data={seedPallete} />
      </div>
    );
  }
}

export default App;
