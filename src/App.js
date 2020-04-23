import React from "react";
import "./App.css";
import { Routes } from "./Router";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import PipeDreamLogo from './pipe-dream-logo.png'


const theme = createMuiTheme({ 
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
  },
spacing: 8,

});

export default function App() {
  
  // render() {
    return (
    
        <div className="App">
           <img src={PipeDreamLogo} alt="Pipe Dream Logo"/>
        <MuiThemeProvider theme={theme}>
          <Routes />
        </MuiThemeProvider>  
      </div>
     
      
      
    );
  }

// }



