import React from "react";
import axios from "axios";

export default class RestroomList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      restrooms: [],
      message: null
    }

    this.refreshRestrooms = this.refreshRestrooms.bind(this);
    this.updateRestroomClicked = this.updateRestroomClicked.bind(this);
    this.deleteRestroomClicked = this.deleteRestroomClicked.bind(this);
    this.addRestroomClicked = this.addRestroomClicked.bind(this);
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/restrooms`)
      .then(
        response => {
          this.setState({restrooms: response.data})
        }
      );
  }

  refreshRestrooms() {
    axios.get(`http://localhost:8080/restrooms`)
    .then(
      response => {
        this.setState({restrooms: response.data})
      }
    );
  }


  updateRestroomClicked(id) {
    console.log('Update: ' + id);
    this.props.history.push(`/restrooms/${id}`);
  }

  deleteRestroomClicked(id) {
    axios.delete(`http://localhost:8080/restrooms/${id}`)
      .then(response => {
        this.setState({message: `Deletion of Restroom ID: ${id} Successful!`});
        this.refreshRestrooms();
    })
  }

 

  addRestroomClicked() {
    this.props.history.push(`/add-restroom`);
  }
  
  //Write HTML inside render function
  render() {
    return (
      <div className="container">
        <h1>All Restrooms</h1>
        {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
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
                      <td><button className="btn btn-success" onClick={() => this.updateRestroomClicked(restroom.id)}>Update</button></td>
                      <td><button className="btn btn-warning" onClick={() => this.deleteRestroomClicked(restroom.id)}>Delete</button></td>
                    </tr>
                )
              }
              
                <tr><td><button className="btn btn-success" onClick={this.addRestroomClicked}>Add Restroom</button></td></tr>
          
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}