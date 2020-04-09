import React from "react";
import axios from "axios";
import Restroom from "./Restroom"


// let restrooms =
// [{
//   name: "Cafe Mochi"
// },
// {
//   name: "The Vine"
// },
// { 
//  name: "CBGB"
// }
// ]

class Restrooms extends React.Component {
  render() {
      return (
          <ul>
              {this.props.restrooms.map((restroom)=> {
                  return <Restroom restroom={restroom} key={restroom.id}/>

              })}
              <Restroom />
          </ul>
      )
  }

}

export default Restrooms;

