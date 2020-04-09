import React from "react";
import axios from "axios";
import Restroom from "./Restroom"

export default class Restrooms extends React.Component {
  render() {
      return (
          <ul>
              {this.props.restrooms.map((restroom)=> {
                  return <Restroom restroom={restroom}/>

              })}
              <Restroom />
          </ul>
      )
  }

}

export default Restrooms;

