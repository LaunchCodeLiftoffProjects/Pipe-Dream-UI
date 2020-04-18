import React from "react";
import axios from "axios";

export default class RestroomSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      singleStall: false,
      restrooms: [],
      filteredRestrooms: [],
      message: null,
    };
  }

  //On Mount GET all restrooms
  componentDidMount() {
    this.getRestrooms();
  }

  //Get All Restrooms From API
  getRestrooms = async () => {

    let response = await axios.get(`http://localhost:8080/restroom`);

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

  //Update & Search By Single Stall
  updateSingleStall = async () => {

    console.log(`Updating singleStall`);
    await this.setState(initialState => ({
      singleStall: !initialState.singleStall
    }));
    this.filterRestrooms();

  }

  handleSubmit = (event) => {
    event.preventDefault();
  };

  //Filter Restrooms by Search Parameter entered by User
  filterRestrooms = () => {

    let filteredRestrooms = this.state.restrooms;
    let name = this.state.name;
    let singleStall = this.state.singleStall;

    console.log(`filtering restrooms with name: ${name} and singleStall: ${singleStall}`);

    filteredRestrooms = filteredRestrooms.filter((restroom) => {
      return restroom.businessName.toLowerCase().indexOf(name) !== -1 && restroom.isSingleStall === singleStall;
    });

    this.setState({ filteredRestrooms });
  };

  //Write HTML inside render function
  render() {

    return (
      <div>

        {/* Search Form */}

        <form onSubmit={this.handleSubmit.bind(this)}>
          <h1> Search for a Restroom:</h1>
          <div>
            <label>Search By Name: </label>
            <input
              type="text"
              value={this.state.name.toLowerCase()}
              onChange={this.updateName.bind(this)}/>
          </div>
          <label>Single Stall </label>
          <input type="checkbox"
            name="singleStall"
            checked={this.state.singleStall}
            onChange={this.updateSingleStall}
          />
        </form>

        {/* Restroom Results */}

        <div className="container">
          <h1>All Restrooms</h1>
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
                      <br />
                      Insert Address
                    </td>
                    <td>
                      Business Type: <br />
                      {restroom.businessType}
                    </td>
                    <td>
                      <button>Directions</button>
                      <br />
                      <button>Details</button>
                    </td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => this.deleteRestroomClicked(restroom.id)}
                      >
                        Delete
                      </button>
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
