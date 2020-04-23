import React from "react";
import {Button, Typography }from "@material-ui/core";
import { Link } from "react-router-dom";
import { AppBar, Toolbar } from "@material-ui/core";

export const NavBar = ({ color, size }) => (
  <AppBar color={color} size={size} className="navBar">
    <Toolbar>
    <Link to="/">
      <Typography variant="h4">
        <Button>Home</Button>
        </Typography>
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