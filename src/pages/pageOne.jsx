import React from "react";
import axios from "axios";
import Restrooms from "../Restrooms"
import Restroom from "../Restroom"

let restrooms =
[{
  name: "Cafe Mochi",
  id: 1
},
{
  name: "The Vine",
  id: 2
},
{ 
 name: "CBGB",
 id: 3
}
]

export default class PageOne extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      search: '',
      businessName: '',
      businessType: 'restaurant',
      isAccessible: false,
      isSingleStall: false,
      isGenderNeutral: false,
      hasChangingTable: false
    };

  
  }

  updateSearch(event) {
    this.setState({search: event.target.value});
  }

  searchBusinessName = (event) => {
    console.log(event.target.value)
    this.setState({
      businessName: event.target.value
    })
  }

  searchBusinessType = (event) => {
    this.setState({
      businessType: event.target.value
    })
  }

  searchSingleStall = () => {
    this.setState(initialState => ({
      isSingleStall: !initialState.isSingleStall
    }));
  }

  searchIsAccessible = () => {
    this.setState(initialState => ({
      isAccessible: !initialState.isAccessible
    }));
  }

searchIsGenderNeutral = () => {
    this.setState(initialState => ({
      isGenderNeutral: !initialState.isGenderNeutral
    }));
  }

  searchHasChangingTable = () => {
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
        console.log(restroom);
        console.log(response.data);
      })
  }

  render() {
    let filteredRestrooms= restrooms.filter
    ((restroom) => {
      return restroom.name.toLowerCase().indexOf(this.state.search) !== -1;
     }
    );

    return (
       <form onSubmit={this.handleSubmit.bind(this)}>
        <div>
        {filteredRestrooms.map((restroom)=> {
                  return <Restroom restroom={restroom} key={restroom.id}/>

              })}
        <h1> Search for a Restroom:</h1>
        <div>
          <label>Search: </label>
          
          <input type="text" 
          value={this.state.search.toLowerCase()}
          onChange={this.updateSearch.bind(this)}></input>
          </div>
          <label>Business Name: </label>
          <input type="text" name="businessName" value={this.state.businessName} onChange={this.searchBusinessName.bind(this)}/>
        </div>
        <div>
          <label>Type of Business: </label>
          <select value={this.state.businessType} onChange={this.searchBusinessType.bind(this)}>
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
            onChange={this.searchSingleStall.bind(this)}
          />
        </div>
        <div>
          <label>Accessible Option? </label>
          <input type="checkbox"
            name="isAccessible"
            checked={this.state.isAccessible}
            onChange={this.searchIsAccessible.bind(this)}
          />
        </div>
        <div>
          <label>Gender Neutral Option? </label>
          <input type="checkbox"
            checked={this.state.isGenderNeutral}
            onChange={this.searchIsGenderNeutral.bind(this)}
          />
        </div>
        <div>
          <label>Has Changing Table(s)? </label>
          <input type="checkbox"
            checked={this.state.hasChangingTable}
            onChange={this.searchHasChangingTable.bind(this)}
          />
        </div>
        <button type="submit">Search</button>
      </form>
    );
    };
  }