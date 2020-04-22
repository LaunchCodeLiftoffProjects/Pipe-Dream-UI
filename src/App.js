import React from "react";
import "./App.css";
import { Routes } from "./Router";
import { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#42A5FF"
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
       
      </div>
      
    );
  }
}

export default App;