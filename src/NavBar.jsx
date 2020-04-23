import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { AppBar, Toolbar } from "@material-ui/core";

export const NavBar = ({ color }) => (
  <AppBar color={color} className="navBar">
    <Toolbar>
    <Link to="/">
        <Button>Home</Button>
      </Link>
      <Link to="/search">
        <Button className="navButton">Search</Button>
      </Link>
      <Link to="/add-restroom">
        <Button>Add a Restroom</Button>
      </Link>
      <Link to="/restrooms">
        <Button>Restroom List</Button>
      </Link>
      
    </Toolbar>
  </AppBar>
);