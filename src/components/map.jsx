import React from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
Geocode.setApiKey( 'AIzaSyDtqyBXrriWv5qDusJnG3vZa0dH7jy07yU' );
Geocode.enableDebug();



export class MapComponent extends React.Component {
  constructor(props){
    super(props);

this.state = {
  businesses: [{lat: 38.592220, lng: -90.295372},
    {latitude: 38.592220, longitude: -90.295372},
    {latitude: 38.591511, longitude: -90.293442},
    {latitude: 38.593860, longitude: -90.293510}]
}
  // mapPosition: {
  //   lat: this.props.center.lat,
  //   lng: this.props.center.lng
  // },
  // markerPosition: {
  //   lat: this.props.center.lat,
  //   lng: this.props.center.lng
  // }
// }
  }

  displayMarkers = () => {
    return this.state.businesses.map((business, index) => {
      return <Marker key={index} id={index} position={{
       lat: business.latitude,
       lng: business.longitude
     }}
     onClick={() => console.log("Welcome!")} />
    })
  }

    render() {
        return (
        <Map
          google={this.props.google}
          zoom={8}
          // style={mapStyles}
          initialCenter={{ lat: 38.592220, lng: -90.295372}}
        >
          {this.displayMarkers()}
          </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDtqyBXrriWv5qDusJnG3vZa0dH7jy07yU'
})(MapComponent);

// const mapStyles = {
//   width: '50%',
//   height: '50%',
  
  
// };

