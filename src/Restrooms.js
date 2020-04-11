import React from "react";
import axios from "axios";
import Restroom from "./Restroom"


// let restrooms =
// [{
//   name: "Cafe Mochi",
//   id: 1
// },
// {
//   name: "The Vine",
//   id: 2
// },
// { 
//  name: "CBGB",
//  id: 3
// }
// ]

class Restrooms extends React.Component {
  render() {
      return (
          <ul>
              {this.props.restrooms.map((restroom)=> {
                  return <Restroom restroom={restroom} key={restroom.id}/>

              })}
             
          </ul>
      )
  }

}

export default Restrooms;

