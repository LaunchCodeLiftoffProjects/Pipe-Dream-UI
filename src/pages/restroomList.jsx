import React from "react";
import axios from "axios";
// import AddRestroom from "./addRestroom"

export default class RestroomList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      restrooms: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/restroom`)
      .then(
        response => {
          this.setState({restrooms: response.data})
        }
      );
  }
  
  //Write HTML inside render function
  render() {
    return (
      <div className="container">
        <h1>Restrooms</h1>
        <div className="container">
          <table className="table">
            <tbody>
              {
                this.state.restrooms.map(
                  restroom => 
                    <tr key={restroom.id}>
                      <td>{restroom.id}</td>
                      <td>{restroom.businessName}</td>
                      <td>{restroom.businessType}</td>
                      <td>Is Accessible? {restroom.isAccessible.toString() }</td>
                      {// <td>{restroom.isSingleStall.toString()}</td>
                      // <td>{restroom.isGenderNeutral.toString()}</td>
                      // <td>{restroom.hasChangingTable.toString()}</td>
                }
                }
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
    );
  }
}