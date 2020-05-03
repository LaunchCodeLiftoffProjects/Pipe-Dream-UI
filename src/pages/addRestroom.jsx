import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, geocodeByPlaceId, getLatLng,} from 'react-places-autocomplete';


export default class AddRestroom extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      businessName: '',
      businessType: '',
      address: '',
      isAccessible: false,
      isSingleStall: false,
      isGenderNeutral: false,
      hasChangingTable: false,
      message: null,
      businesses: []
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);

  }

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };
  handleChange = address => {
    this.setState({ address });
  };

  handleScriptLoad = () => {
    // Declare Options For Autocomplete
    const options = {
      types: ['(establishment)'],
    };

      // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options,
    );

     // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components and formatted
    // address.
    this.autocomplete.setFields(['address_components', 'formatted_address']);

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }
  handlePlaceSelect = () => {

    // Extract City From Address Object
    const addressObject = this.autocomplete.getPlace();
    const address = addressObject.address_components;

    // Check if address is valid
    if (address) {
      // Set State
      this.setState(
        {
          address: addressObject.formatted_address,
        }
      );
    }
  }
  validate(values) {
    let errors = {}
    if (!values.businessName) {
      errors.businessName = 'Please enter business name.'
    } else if (values.businessName.length < 5 || values.businessName.length > 100) {
      errors.businessName = 'Business Name must be between 5 and 100 characters.'
    }
    if (!values.address) {
      errors.address = 'Please enter address.'
    } else if (values.address.length < 5 || values.address.length > 200) {
      errors.address = 'Address must be between 5 and 200 characters.'
    }
    if (!values.businessType) {
      errors.businessType = 'Please select type of business.'
    }

    return errors
  }

  refreshRestrooms() {
    axios.get(`http://localhost:8080/restrooms`)
    .then(
      response => {
        this.setState({restrooms: response.data})
      }
    );
  }

  onSubmit = (values) => {
    
    const restroom = {
      businessName: values.businessName,
      businessType: values.businessType,
      address: values.address,
      isAccessible: values.isAccessible,
      isSingleStall: values.isSingleStall,
      isGenderNeutral: values.isGenderNeutral,
      hasChangingTable: values.hasChangingTable
    };
    console.log(restroom);
   
    axios.post(`http://localhost:8080/restrooms`, restroom)
      .then((response)=> {
        this.setState({message: `Restroom at ${restroom.businessName} added!`});
      })
  }


  //Write HTML inside render function
  render() {
    let {businessName, businessType, address, isAccessible, isSingleStall, isGenderNeutral, hasChangingTable} = this.state;
    
    if (this.state.id === -1) {
      return
    }

    return (
       <div>
          { this.state.isLoading &&
            <div>Loading...please wait!</div>
          }

    {!this.state.isLoading &&
      <div>
        <h1>Add a Restroom</h1>
        {this.state.message && <div className="alert alert-success">{this.state.message}&ensp;
        <a href="/restrooms">See All Restrooms</a></div>}
        <div className="container">
          <Formik
            initialValues = {{businessName, businessType, address, isAccessible, isSingleStall, isGenderNeutral, hasChangingTable}}
            onLoad={this.handleScriptLoad}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
            enableReinitialize={true}
          >
            {
              (props) => (
                <Form>

                  <ErrorMessage name="businessName" component="div"
                    className="alert alert-warning" />
                  <ErrorMessage name="address" component="div"
                    className="alert alert-warning" />
                  <ErrorMessage name="businessType" component="div"
                    className="alert alert-warning" />

                  <fieldset className="form-group">
                    <label>Business Name: </label>
                    <Field className="form-control" type="text" name="businessName"/>
                  </fieldset>

                  {/* <fieldset className="form-group"> */}
                    <label>Address: </label>
                    {/* <Field  /> */}
                    <PlacesAutocomplete 
                    className="form-control" 
                    type="text"
                    name="address" 
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
  
  
                  {/* </fieldset> */}

                  <fieldset className="form-group">
                    <label>Business Type: </label>
                    <Field as="select" className="form-control" name="businessType" >
                    <option value="">Please select...</option>
                      <option value="Gas station">Gas station</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Bar">Bar</option>
                      <option value="Retail store">Retail store</option>
                      <option value="Other">Other</option>
                    </Field>
                  </fieldset>

                  <fieldset>
                    <label>Single Stall? </label>
                    <Field className="form-control" type="checkbox" name="isSingleStall" >
                    </Field>
                  </fieldset>
                  
                  <fieldset>
                    <label>Accessible Option? </label>
                    <Field className="form-control" type="checkbox" name="isAccessible" >
                    </Field>
                  </fieldset>
                  
                  <fieldset>
                    <label>Gender Neutral Option? </label>
                    <Field className="form-control" type="checkbox" name="isGenderNeutral" >
                    </Field>
                  </fieldset>

                  <fieldset>
                    <label>Has Changing Table(s)? </label>
                    <Field className="form-control" type="checkbox" name="hasChangingTable" >
                    </Field>
                  </fieldset>
                  <br />
                  <button className="btn btn-success" type="submit">Save</button>&emsp;
                  <a href='/restrooms'>Cancel</a>

                </Form>
              )
            }
          </Formik>
        </div>
  
      </div>
    }
    </div>
    );
  }
}