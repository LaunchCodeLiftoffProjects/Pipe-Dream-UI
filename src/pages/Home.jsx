import React, { Component, Fragment } from 'react';
import {Button, Typography }from "@material-ui/core";
import { Link } from "react-router-dom";
import { StylesProvider } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';

class Home extends React.Component {
    render() {
      return (
        <Fragment>
           
        <div className= "paragraph" >
            <Typography color= "primary" variant="h1" size="large">
            What is Pipe Dream?
            </Typography>
            <br/>
            <Typography color= "gray" variant="h4" display="block" >
        Pipe Dream is a restroom locator and reviewer app. <br/>
        It's like Yelp for public restrooms.
        </Typography>
        <br/>

        <Link to="/search">
        <Button color="secondary" size="large" variant="contained" ml={8}>Search</Button>
        </Link>
      <Link to="/add-restroom">
        <Button variant="contained" size="large" ml={8}>Add a Restroom</Button>
      </Link>
      </div>
    
      </Fragment>
      
      );
    }
  }

  export default Home;