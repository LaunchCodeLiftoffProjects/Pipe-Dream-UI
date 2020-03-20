import React from "react";

export default class PageTwo extends React.Component {
  //Write HTML inside render function
  constructor(props){
    super(props);
    this.state = {
      businessName: '',
      businessType: '',
      isAccessible: false,
      isSingleStall: false,
      isGenderNeutral: false,
      hasChangingTable: false
    };

    this.handleBusinessNameChange = this.handleBusinessNameChange.bind(this);
    this.handleBusinessTypeChange = this.handleBusinessTypeChange.bind(this);
    this.handleOnChangeSingleStall = this.handleOnChangeSingleStall.bind(this);
    this.handleOnChangeIsAccessible = this.handleOnChangeIsAccessible.bind(this);
    this.handleOnChangeIsGenderNeutral = this.handleOnChangeIsGenderNeutral.bind(this);
    this.handleOnChangeHasChangingTable = this.handleOnChangeHasChangingTable.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const businessName = localStorage.getItem('businessName');
    this.setState(() => ({businessName}));

    const businessType = localStorage.getItem('businessType');
    this.setState(() => ({businessType}));

    const jsonAccessible = localStorage.getItem('isAccessible');
    const isAccessible = JSON.parse(jsonAccessible);
    this.setState(() => ({isAccessible}));

    const jsonGenderNeutral = localStorage.getItem('isGenderNeutral');
    const isGenderNeutral = JSON.parse(jsonGenderNeutral);
    this.setState(() => ({isGenderNeutral}));

    const jsonSingleStall = localStorage.getItem('isSingleStall');
    const isSingleStall = JSON.parse(jsonSingleStall);
    this.setState(() => ({isSingleStall}));

    const jsonChangingTable = localStorage.getItem('hasChangingTable');
    const hasChangingTable = JSON.parse(jsonChangingTable);
    this.setState(() => ({hasChangingTable}));
  
  }

  componentDidUpdate() {
    console.log('didUpdate');
    localStorage.setItem('businessName', this.state.businessName);
    localStorage.setItem('businessType', this.state.businessType);
    localStorage.setItem('isAccessible', this.state.isAccessible);
    localStorage.setItem('isSingleStall', this.state.isSingleStall);
    localStorage.setItem('isGenderNeutral', this.state.isGenderNeutral);
    localStorage.setItem('hasChangingTable', this.state.hasChangingTable);
  }

  handleBusinessNameChange = (event) => {
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
    alert(`This is the business name: ${this.state.businessName}.  The business type is: ${this.state.businessType}. Single Stall? ${this.state.isSingleStall}. Accessible? ${this.state.isAccessible}. Gender Neutral? ${this.state.isGenderNeutral}. Changing Table? ${this.state.hasChangingTable}`);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Business Name: </label>
          <input type='text' value={this.state.businessName} onChange={this.handleBusinessNameChange}/>
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
            checked={this.state.isSingleStall}
            onChange={this.handleOnChangeSingleStall}
          />
        </div>
        <div>
          <label>Accessible Option? </label>
          <input type="checkbox"
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
        <button type="submit">Submit</button>
      </form>
    );
    }
}
