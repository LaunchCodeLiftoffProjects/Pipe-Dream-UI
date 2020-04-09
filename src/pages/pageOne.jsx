import React from "react";
import axios from "axios";

export default class PageOne extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // search: '',
      businessName: '',
      businessType: 'restaurant',
      isAccessible: false,
      isSingleStall: false,
      isGenderNeutral: false,
      hasChangingTable: false
    };

    this.searchBusinessName = this.searchBusinessName.bind(this);
    this.handleBusinessTypeChange = this.handleBusinessTypeChange.bind(this);
    this.handleOnChangeSingleStall = this.handleOnChangeSingleStall.bind(this);
    this.handleOnChangeIsAccessible = this.handleOnChangeIsAccessible.bind(this);
    this.handleOnChangeIsGenderNeutral = this.handleOnChangeIsGenderNeutral.bind(this);
    this.handleOnChangeHasChangingTable = this.handleOnChangeHasChangingTable.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  searchBusinessName = (event) => {
    console.log(event.target.value)
    this.setState({
      businessName: event.target.value
    })
  }

  handleBusinessTypeChange = (event) => {
    this.setState({
      businessType: event.target.value
    })
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
      businessType: this.state.businessType,
      isAccessible: this.state.isAccessible,
      isSingleStall: this.state.isSingleStall,
      isGenderNeutral: this.state.isGenderNeutral,
      hasChangingTable: this.state.hasChangingTable
    }

    axios.get(`http://localhost:8080/restroom`, restroom)
      .then(response => {
        console.log(response);
        console.log(response.data);
      })
  }

  render() {
    return (
       <form onSubmit={this.handleSubmit}>
        <div>
        <h1> Search for a Restroom:</h1>
          <label>Business Name: </label>
          <input type="text" name="businessName" value={this.state.businessName} onChange={this.searchBusinessName.bind(this)}/>
        </div>
        <div>
          <label>Type of Business: </label>
          <select value={this.state.businessType} onChange={this.handleBusinessTypeChange}>
            <option value="restaurant">Restaurant</option>
            <option value="gas-station">Gas station</option>
            <option value="retail-store">Retail Store</option>
            <option value="other">Other</option>
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
        <button type="submit">Search</button>
      </form>
    );
    };
  }