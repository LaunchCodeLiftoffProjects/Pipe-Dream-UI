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
            <Typography color= "gray" variant="p">
        Pipe Dream is a restroom locator and reviewer app. 
        It's like the Yelp for public restrooms.
        </Typography>
        <div>
        <Link to="/search">
        <Button color="secondary" size="large" variant="contained">Search</Button>
      </Link>
      <Link to="/add-restroom">
        <Button variant="contained" size="large">Add a Restroom</Button>
      </Link>
      </div>
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