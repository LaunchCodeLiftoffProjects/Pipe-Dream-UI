import React from "react";

export default class RestroomProfile extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      description: ''
    }
  }
  //Write HTML inside render function
  render() {
    return (
      <div>
        <h1>Restroom</h1>
        <p>Here you will see details about an individual restroom.</p>
      </div>
    );
  }
}