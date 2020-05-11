import React from "react";
import { Map, Listing, InfoWindow, GoogleApiWrapper, Marker } from 'google-maps-react';
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
Geocode.setApiKey( 'AIzaSyDtqyBXrriWv5qDusJnG3vZa0dH7jy07yU' );
Geocode.enableDebug();



export class MapContainer extends React.Component {
  constructor(props){
        super(props);
    
      this.state = {
      businesses: this.props.businesses,

      }
    }

    fetchPlaces(mapProps, map) {
      const {google} = mapProps;
      const service = new google.maps.places.PlacesService(map);
    }

    mapClicked(mapProps, map, clickEvent) {
      // ...
    }

    centerMoved(mapProps, map) {
      // ...
    }

  render() {
    return (
      <Map 
      google={this.props.google} 
      onReady={this.fetchPlaces}
      onClick={this.mapClicked}
      initialCenter={{ lat: 38.592220, lng: -90.295372}}
      Listing places={this.state.places}
      onDragend={this.centerMoved}
      visible= {true}
      zoom={14} >
        
         
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        {/* <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow> */}
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyDtqyBXrriWv5qDusJnG3vZa0dH7jy07yU')
})(MapContainer)







// export class MapComponent extends React.Component {
//   constructor(props){
//     super(props);

// this.state = {
//   businesses: this.props.businesses,

//   mapPosition: {
//     lat: this.props.center.lat,
//     lng: this.props.center.lng
//   },
//   markerPosition: {
//     lat: this.props.center.lat,
//     lng: this.props.center.lng
//   }
// }
//   }

//   displayMarkers = () => {
//     return this.state.businesses.map((business, index) => {
//       return <Marker key={index} id={index} position={{
//        lat: business.latitude,
//        lng: business.longitude
//      }}
//      onClick={() => console.log("Welcome!")} />
//     })
//   }

//     render() {
//         return (
//         <Map
//           google={this.props.google}
//           zoom={8}
//           // style={mapStyles}
//           initialCenter={{ lat: 38.592220, lng: -90.295372}}
//         >
//           {this.displayMarkers()}
//           </Map>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyDtqyBXrriWv5qDusJnG3vZa0dH7jy07yU'
// })(MapComponent);

// const mapStyles = {
//   width: '50%',
//   height: '50%',
  
  
// // };