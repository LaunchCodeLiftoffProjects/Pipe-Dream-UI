import React from "react";
import "./App.css";
import { Routes } from "./Router";
import { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0b5994"
    },
    secondary: {
      main: "#ffa500"
    }
  }
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Routes />
        </MuiThemeProvider>
        {/* <h1> Restrooms</h1>
        <Restrooms restrooms= {this.props.restrooms} /> */}
      </div>
      
    );
  }
}

export default App;