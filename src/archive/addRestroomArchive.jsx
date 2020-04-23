import axios from 'axios';
import React from 'react';

export default class AddRestroom extends React.Component {
  //Write HTML inside render function
  constructor(props){
    super(props);
    this.state = {
      businessName: '',
      businessType: '',
      address: '',
      isAccessible: false,
      isSingleStall: false,
      isGenderNeutral: false,
      hasChangingTable: false,
      message: null
    };

    this.handleBusinessNameChange = this.handleBusinessNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleBusinessTypeChange = this.handleBusinessTypeChange.bind(this);
    this.handleOnChangeSingleStall = this.handleOnChangeSingleStall.bind(this);
    this.handleOnChangeIsAccessible = this.handleOnChangeIsAccessible.bind(this);
    this.handleOnChangeIsGenderNeutral = this.handleOnChangeIsGenderNeutral.bind(this);
    this.handleOnChangeHasChangingTable = this.handleOnChangeHasChangingTable.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleBusinessNameChange = (event) => {
    this.setState({
      businessName: event.target.value
    })
  }

  handleAddressChange = (event) => {
    this.setState({
      address: event.target.value
    })
  }

  handleBusinessTypeChange = (event) => {
    this.setState({
      businessType: event.target.value
    })
  }

  handleFocus = (event) => {
    this.setState({businessType: ''});
  }
  handleOnChangeSingleStall = () => {
    this.setState(initialState => ({
      isSingleStall: !initialState.isSingleStall
    }));
  }

  handleOnChangeIsAccessible = () => {
    this.setState(initialState => ({
      isAccessible: !initialState.isAccessible
    }));
  }

  handleOnChangeIsGenderNeutral = () => {
    this.setState(initialState => ({
      isGenderNeutral: !initialState.isGenderNeutral
    }));
  }

  handleOnChangeHasChangingTable = () => {
    this.setState(initialState => ({
      hasChangingTable: !initialState.hasChangingTable
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    const restroom = {
      businessName: this.state.businessName,
      address: this.state.address,
      businessType: this.state.businessType,
      isAccessible: this.state.isAccessible,
      isSingleStall: this.state.isSingleStall,
      isGenderNeutral: this.state.isGenderNeutral,
      hasChangingTable: this.state.hasChangingTable
    }

    axios.post(`http://localhost:8080/restrooms`, restroom)
        .then((response) => {
            this.setState({message: `Restroom ID: ${response.data.id} added!`});
        })
    }

  render() {
   
    return (
      <form onSubmit={this.handleSubmit}>
      {this.state.message && <div className="alert alert-success">{this.state.message} <a href="/restrooms">See All Restrooms</a></div>}
        <div>
          <label>Business Name: </label>
          <input type="text" name="businessName" 
          value={this.state.businessName} 
          onChange={this.handleBusinessNameChange}/>
        </div>

        <div>
          <label>Address: </label>
          <input type="text" name="address" value={this.state.address} onChange={this.handleAddressChange}/>
        </div>

        <div>
          <label>Type of Business: </label>
          <select value={this.state.businessType} 
          onChange={this.handleBusinessTypeChange}
          onFocus={this.handleFocus}>
            <option value="">Please select...</option>
            <option value="Gas Station">Gas station</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Bar">Bar</option>
            <option value="Retail Store">Retail Store</option>
            <option value="Other">Other</option> 
          </select>
        </div>
       
        <div>
          <label>Single Stall? </label>
          <input type="checkbox"
            name="isSingleStall"
            checked={this.state.isSingleStall}
            onChange={this.handleOnChangeSingleStall}
          />
        </div>
        <div>
          <label>Accessible Option? </label>
          <input type="checkbox"
            name="isAccessible"
            checked={this.state.isAccessible}
            onChange={this.handleOnChangeIsAccessible}
          />
        </div>
        <div>
          <label>Gender Neutral Option? </label>
          <input type="checkbox"
            checked={this.state.isGenderNeutral}
            onChange={this.handleOnChangeIsGenderNeutral}
          />
        </div>
        <div>
          <label>Has Changing Table(s)? </label>
          <input type="checkbox"
            checked={this.state.hasChangingTable}
            onChange={this.handleOnChangeHasChangingTable}
          />
        </div>
        <button className="btn btn-success" type="submit">Submit</button>
      </form>
    );
    };
  }
