import React from "react";
import axios from "axios";

export default class RestroomDetails extends React.Component {
  
    constructor(props) {
      super(props);
  
        this.state = {
            id: this.props.match.params.id,
            businessName: '',
            businessType: '',
            address: '',
            isAccessible: false,
            isSingleStall: false,
            isGenderNeutral: false,
            hasChangingTable: false,
            message: null
        }

    this.loadData = this.loadData.bind(this);
    this.addReviewClicked = this.addReviewClicked.bind(this);

    }

    loadData() {
        axios.get(`http://localhost:8080/restrooms/${this.state.id}`)
        .then(
          response => {
            this.setState({
              businessName: response.data.businessName,
              businessType: response.data.businessType,
              address: response.data.address,
              isAccessible: response.data.isAccessible,
              isSingleStall: response.data.isSingleStall,
              isGenderNeutral: response.data.isGenderNeutral,
              hasChangingTable: response.data.hasChangingTable
            })
          })
      }
    
      componentDidMount() {
        this.loadData();
      }

      addReviewClicked(){
        this.props.history.push(`/add-review/${this.state.id}`);
      }

    render() {
        const restroom = {
            businessName: this.state.businessName,
            address: this.state.address,
            businessType: this.state.businessType,
            isAccessible: this.state.isAccessible,
            isSingleStall: this.state.isSingleStall,
            isGenderNeutral: this.state.isGenderNeutral,
            hasChangingTable: this.state.hasChangingTable
        }
        return(
       
            <div className="container">
            <h1>{restroom.businessName}</h1>
            <table className="table">
              <tbody>
            
                <tr>
                    <td>Address: </td>
                    <td>{restroom.address}</td>
                </tr>

                <tr>
                    <td>Business Type: </td>
                    <td>{restroom.businessType}</td>
                </tr>
                
                <tr>
                    <td>Single Stall?</td>
                    <td>{restroom.isSingleStall? "Yes" : "No"}</td>
                </tr>

                <tr>
                    <td>Accessible Option?</td>
                    <td>{restroom.isAccessible? "Yes" : "No"}</td>
                </tr>

                <tr>
                    <td>Gender Neutral Option?</td>
                    <td>{restroom.isGenderNeutral? "Yes" : "No"}</td>
                </tr>

                <tr>
                    <td>Has Changing Table(s)?</td>
                    <td>{restroom.hasChangingTable? "Yes" : "No"}</td>
                </tr>
            
              </tbody>
            </table>
            <button className="btn btn-success" onClick={this.addReviewClicked}>Add Review</button>
        </div>

        )
    }


    }