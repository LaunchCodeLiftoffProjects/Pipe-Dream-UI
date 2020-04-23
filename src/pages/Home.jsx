import React, { Fragment } from 'react';
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

class Home extends React.Component {
    render() {
      return (
        <Fragment>
        <div classname= "paragraph"><p>Pipe Dream is a super dope app that everyone should download</p> </div>
        <Link to="/search">
        <Button>Search</Button>
      </Link>
      <Link to="/add-restroom">
        <Button>Add a Restroom</Button>
      </Link>
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