// import React from "react";
import "./App.css";
import { Routes } from "./Router";
// import { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import PipeDreamLogo from './pipe-dream-logo.png'
import React, { Component, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from "classnames";
// import { StylesProvider } from '@material-ui/core/styles';





const theme = createMuiTheme({

  // overrides: {
   
  palette: {
    primary: {
      main: "#42A5FF"
    },
    secondary: {
      main: "#FFD4D4"
    }
  },
  status: {
    danger: "#6DDDD0"
  }
// }
});

const useStyles = makeStyles({
  buttonStyles: {
    backgroundColor: 'red',
    color: props => props.color,
  },
});

export default function App() {
  const classes = useStyles();
  // render() {
    return (
      // <StylesProvider injectFirst>
        <div className="App">
           <img src={PipeDreamLogo} alt="Pipe Dream Logo"/>
        <MuiThemeProvider theme={theme}>
          <Routes />
        </MuiThemeProvider>  
      </div>
      // </StylesProvider>
      
      
    );
  }

// }


