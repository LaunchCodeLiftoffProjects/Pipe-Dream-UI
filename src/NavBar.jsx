import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { AppBar, Toolbar } from "@material-ui/core";

export const NavBar = ({ color }) => (
  <AppBar color={color}>
    <Toolbar>
      <Link to="/">
        <Button>Home</Button>
      </Link>
      <Link to="/add-restroom">
        <Button>Add a Restroom</Button>
      </Link>
      <Link to="/restroom-list">
        <Button>Restroom List</Button>
      </Link>
      <Link to="/restroom-profile">
        <Button>Restroom Profile</Button>
      </Link>
    </Toolbar>
  </AppBar>
);