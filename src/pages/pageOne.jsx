import React from "react";
import axios from "axios";
import Restroom from "../Restroom"

export default class RestroomList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      restrooms: [],
      message: null
    }
  }
  updateSearch(event) {
    this.setState({search: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/restroom`)
      .then(
        response => {
         this.setState({restrooms: response.data})
        }
      );
  }

//   refreshRestrooms() {
//     axios.get(`http://localhost:8080/restroom`)
//     .then(
//       response => {
//         this.setState({restrooms: response.data})
//       }
//     );
//   }


  
  //Write HTML inside render function
  render() {
    let filteredRestrooms= this.state.restrooms.filter
    ((restroom) => {
      return restroom.businessName.toLowerCase().indexOf(this.state.search) !== -1;
     }
    );

    return (
       <form onSubmit={this.handleSubmit.bind(this)}>
        <div>
        {filteredRestrooms.map((restroom)=> {
                  return <Restroom restroom={restroom} />
              })}
              </div>
        <h1> Search for a Restroom:</h1>
        <div>
          <label>Search: </label>
          
          <input type="text" 
          value={this.state.search.toLowerCase()}
          onChange={this.updateSearch.bind(this)}></input>
          </div>
        
    return (
      <div className="container">
        <h1>All Restrooms</h1>
        {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
        <div className="container">
          <table className="table">
            <tbody>
              {
                this.state.restrooms.map(
                  restroom => 
                    <tr key={restroom.id}>
                      <td>{restroom.businessName}<br />
                      Insert Address
                      </td>
                      <td>Business Type: <br />
                      {restroom.businessType}</td>
                      <td>
                        <button>Directions</button><br />
                        <button>Details</button>
                      </td>
                      <td><button className="btn btn-warning" onClick={() => this.deleteRestroomClicked(restroom.id)}>Delete</button></td>
                    </tr>
                )
              }

              {// <tr>
              //   <td>LaunchCode<br />
              //     1234 Delmar Blvd.
              //   </td>
              //   <td>1.5 miles away</td>
              //   <td>
              //     <button>Directions</button><br />
              //     <button>Details</button>
              //   </td>
              // </tr>
              }
              
            </tbody>
          </table>
        </div>
      </div>
      </form>
    );
  }
}