import React from "react";
import axios from "axios";

export default class Restroom extends React.Component {
  render() {
      return (
          <ul>
              <li> {this.props.restroom.name}</li>
          </ul>
      )
  }

}



