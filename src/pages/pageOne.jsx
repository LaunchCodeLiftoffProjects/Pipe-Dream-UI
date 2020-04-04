import React from "react";
import MapComponent from "../components/map"; 

export default class PageOne extends React.Component {
  //Write HTML inside render function
  render() {
    return (
      <div>
        <h1>Page 1</h1>
        <p>Welcome to the first page!</p>
        <MapComponent/>
      </div>
    );
  }
}


