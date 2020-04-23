import React, { Component, Fragment } from 'react';
import {Button, Typography }from "@material-ui/core";
import { Link } from "react-router-dom";
import { StylesProvider } from '@material-ui/core/styles';

class Home extends React.Component {
    render() {
      return (
        <Fragment>
            <StylesProvider injectFirst>
        <div classname= "paragraph">
            <Typography color= "primary" variant="h1" size="large">
            What is Pipe Dream?
            </Typography>
            <Typography color= "gray" variant="h3">
        Pipe Dream is a super dope app that everyone should download 
        </Typography>
        
        <Link to="/search">
        <Button color="secondary" size="large">Search</Button>
      </Link>
      <Link to="/add-restroom">
        <Button>Add a Restroom</Button>
      </Link>
      </div>
      </StylesProvider>
      </Fragment>
      
        
        //   <div className="App">
        //      <img src={PipeDreamLogo} alt="Pipe Dream Logo"/>
        //   <MuiThemeProvider theme={theme}>
        //     <Routes />
        //   </MuiThemeProvider>  
        // </div>
      
      );
    }
  }

  export default Home;