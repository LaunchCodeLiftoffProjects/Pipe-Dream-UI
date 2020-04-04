import React from "react";
import { Map, GoogleApiWrapper } from 'google-maps-react';


export class MapComponent extends React.Component {
    render() {

        return (
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176}}
        />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDtqyBXrriWv5qDusJnG3vZa0dH7jy07yU'
})(MapComponent);

const mapStyles = {
  width: '100%',
  height: '100%',
};

