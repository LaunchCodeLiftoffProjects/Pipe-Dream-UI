// import React from "react";
import "./App.css";
import { Routes } from "./Router";
// import { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import PipeDreamLogo from './pipe-dream-logo.png'
import React, { Component, Fragment } from 'react';

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
           <img src={PipeDreamLogo} alt="Pipe Dream Logo"/>
        <MuiThemeProvider theme={theme}>
          <Routes />
        </MuiThemeProvider>  
      </div>
      
      
    );
  }
}

export default App;