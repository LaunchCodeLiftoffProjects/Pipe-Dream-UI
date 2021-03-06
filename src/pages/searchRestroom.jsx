import React from "react";
import axios from "axios";
import Map from "../components/map"; 
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, geocodeByPlaceId, getLatLng,} from 'react-places-autocomplete';
// import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export default class RestroomSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      businessType: '',
      address: '',
      hasChangingTable: false,
      isGenderNeutral: false,
      isSingleStall: false,
      isAccessible: false,
      restrooms: [],
      filteredRestrooms: [],
      message: null,
      businesses: [],
    }
  }



  //On Mount GET all restrooms
  componentDidMount() {
    this.getRestrooms();
  }

  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  //Get All Restrooms From API
  getRestrooms = async () => {

    let response = await axios.get(`http://localhost:8080/restrooms`);

    console.log(`Got ${response.data.length} restrooms`);

    this.setState({
      restrooms: response.data,
      filteredRestrooms: response.data,
    });

  };

  //Update & Search By Name
  updateName = async (event) => {

    console.log(`Updating name`);
    await this.setState({ name: event.target.value });
    this.filterRestrooms();

  }

  updateBusinessType = async (event) => {

    console.log(`Updating business type`);
    await this.setState({ businessType: event.target.value });
    this.filterRestrooms();

  }

  updateAddress = async (event) => {

    console.log(`Updating address`);
    await this.setState({ address: event.target.value });
    this.filterRestrooms();

  }

  //Update & Search By Single Stall
  updateSingleStall = async () => {

    console.log(`Updating singleStall`);
    await this.setState(initialState => ({
      isSingleStall: !initialState.isSingleStall
    }));
    this.filterRestrooms();

  }
  
  updateAccessible = async () => {

    console.log(`Updating accessibility`);
    await this.setState(initialState => ({
      isAccessible: !initialState.isAccessible
    }));
    this.filterRestrooms();

  }

  updateGenderNeutral = async () => {

    console.log(`Updating gender-neutral`);
    await this.setState(initialState => ({
      isGenderNeutral: !initialState.isGenderNeutral
    }));
    this.filterRestrooms();

  }
  updateChangingTable = async () => {

    console.log(`Updating changing table`);
    await this.setState(initialState => ({
      hasChangingTable: !initialState.hasChangingTable
    }));
    this.filterRestrooms();

  }
  handleSubmit = (event) => {
    event.preventDefault();
  };

  detailsClicked(id) {
    this.props.history.push(`/restrooms/details/${id}`);
  }


  //Filter Restrooms by Search Parameter entered by User
  filterRestrooms = () => {
    let filteredRestrooms = this.state.restrooms;
    let name = this.state.name;
    let businessType = this.state.businessType;
    let address= this.state.address;
    let isSingleStall = this.state.isSingleStall;
    let isAccessible = this.state.isAccessible;
    let isGenderNeutral = this.state.isGenderNeutral;
    let hasChangingTable = this.state.hasChangingTable;
    

  
    console.log(`filtering restrooms with name: ${name}, Business type is: ${businessType}, singleStall: ${isSingleStall}, is accessible: ${isAccessible}, is gender-neutral:${isGenderNeutral}, has changing table: ${hasChangingTable}, address ${address}`);
    filteredRestrooms = filteredRestrooms.filter((restroom) => {
      return restroom.businessName.toLowerCase().indexOf(name.toLowerCase()) !== -1
    });

    filteredRestrooms = filteredRestrooms.filter((restroom) => {
      return restroom.businessType.toLowerCase().indexOf(businessType.toLowerCase()) !== -1
    });
    filteredRestrooms = filteredRestrooms.filter((restroom) => {
      return restroom.address.toLowerCase().indexOf(address.toLowerCase()) !== -1
    });
    if(isSingleStall === true ){
      filteredRestrooms = filteredRestrooms.filter((restroom) => {
        return restroom.isSingleStall === true
      });
    }
    if(isAccessible === true ){
      filteredRestrooms = filteredRestrooms.filter((restroom) => {
        return restroom.isAccessible === true
      });
    }
    if(isGenderNeutral === true ){
      filteredRestrooms = filteredRestrooms.filter((restroom) => {
        return restroom.isGenderNeutral === true
      });
    }
    if(hasChangingTable === true ){
      filteredRestrooms = filteredRestrooms.filter((restroom) => {
        return restroom.hasChangingTable === true
      });
    }
    this.setState({ filteredRestrooms });
  };

  //Write HTML inside render function
  render() {

    return (
      <div>
        <div className="map">
          <form>
      <Map
     google={this.props.google}
     businesses= {this.state.businesses}
    //  center={{lat: 18.5204, lng: 73.8567}}
    //  height='300px'
    //  zoom={15}
    />
    </form>
    </div>
    <div>{/* Search Form  */}
        
        <form onSubmit={this.handleSubmit.bind(this)}
        class="form"
        className="container">
          <h1> Search for a Restroom:</h1>
          <div>
            <label>Search By Name: </label>
            <input class="inputText"
              type="text"
              value={this.state.name.toLowerCase()}
              onChange={this.updateName.bind(this)}/>
          </div>
          <div>
           <label>Address: </label> 
           <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onClick={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
          {/* <input type="text" name="address" 
          class="inputText"
          value={this.state.address.toLowerCase()} 
          onChange={this.updateAddress.bind(this)}/>  */}
        </div>
          <div>
          <label>Type of Business: </label>
          <select class="select"
          value={this.state.businessType} 
          onChange={this.updateBusinessType}  
          onFocus={this.handleFocus}>
            <option value="">Please select...</option>
            <option value="Gas station">Gas station</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Bar">Bar</option>
            <option value="Retail store">Retail store</option>
            <option value="Other">Other</option> 
          </select>
          </div>
          <label>Single Stall </label>
          <input type="checkbox" class= "checkbox"
            name="isSingleStall"
            checked={this.state.isSingleStall}
            onChange={this.updateSingleStall}
          />
          <div>
          <label>Accessible Restroom </label>
          <input type="checkbox" class= "checkbox"
            name="isAccessible"
            checked={this.state.isAccessible}
            onChange={this.updateAccessible}
          />
          </div>
          <div>
          <label>Gender-Neutral Restroom </label>
          <input type="checkbox" class= "checkbox"
            name="isGenderNeutral"
            checked={this.state.isGenderNeutral}
            onChange={this.updateGenderNeutral}
          />
          </div>
          <div>
          <label>Changing Table </label>
          <input type="checkbox" class= "checkbox"
            name="hasChangingTable"
            checked={this.state.hasChangingTable}
            onChange={this.updateChangingTable}
          />
          </div>
        </form>
        </div>
         

        {/* Restroom Results */}

        <div className="container">
          <h1>Results:</h1>
          {this.state.message && (
            <div className="alert alert-success">{this.state.message}</div>
          )}
          <div className="container">
            <table className="table">
              {" "}
              <tbody>
                {this.state.filteredRestrooms.map((restroom) => (
                  <tr key={restroom.id}>
                    <td>
                      {restroom.businessName}
                   <br/>
                      {restroom.address}
                      </td>
                    <td>
                      Business Type: <br />
                      {restroom.businessType}
                    </td>
                    <td>
                      <button>Directions</button>
                      <br />
                      <button onClick={() => this.detailsClicked(restroom.id)}>Details</button>
                    </td>
                    <td>
                  
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}