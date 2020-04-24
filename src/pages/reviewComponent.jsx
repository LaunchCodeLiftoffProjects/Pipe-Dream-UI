import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import StarRatings from 'react-star-ratings';
import FormRatings from 'form-ratings'

export default class ReviewComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            id: this.props.match.params.id,
            businessName: '',
            username: '',
            rating: 1,
            reviewText: '',
            message: null
          }
        
        this.loadData = this.loadData.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.refreshReviews = this.refreshReviews.bind(this);
    }

    loadData = async () => {

      console.log(`ID: ${this.props.match.params.id}`)

      let restroom = await axios.get(`http://localhost:8080/restrooms/${this.state.id}`);

      console.log(`Got restroom: ${JSON.stringify(restroom)}`);

      await this.setState({businessName: restroom.data.businessName});

      let reviews = await axios.get(`http://localhost:8080/reviews/${this.state.id}`);

      console.log(`Got ${reviews.data.length} reviews`);

      await this.setState({
        username: reviews.data.username,
        rating: reviews.data.rating,
        reviewText: reviews.data.reviewText
      })


    }

    componentDidMount() {
      this.loadData();
    }

    refreshReviews() {
      axios.get(`http://localhost:8080/reviews`)
      .then(
        response => {
          this.setState({reviews: response.data})
        }
      );
    }
    
    validate(values) {
      let errors = {}
      if (!values.username) {
        errors.username = 'Please enter username.'
      } else if (values.username.length < 5 || values.username.length > 20) {
        errors.username = 'Username must be between 5 and 20 characters.'
      }
  
      return errors
    }

    onSubmit (values){
        const review = {
            id: this.state.id,
            businessName: this.state.businessName,
            username: values.username,
            rating: values.rating,
            reviewText: values.reviewText
          };

          console.log(review);

          if (this.state.id !== -1){
            axios.put(`http://localhost:8080/reviews/`, review)
            .then((response) => {
              this.setState({message: `Review ID: ${this.state.id} updated!`});
              this.refreshReviews();
      
            })
          } else {
          axios.post(`http://localhost:8080/reviews/`, review)
            .then((response) => {
                this.setState({message: `Review added to ${this.state.businessName}!  `});
            })
          }
    }
    render() {
        const {id, restroomId, businessName, username, rating, reviewText} = this.state;
        if (this.state.restroomId === -1) {
            return
        }
          
        return (
            <div>
                { this.state.isLoading && <div>Loading...please wait!</div>}
          
            {!this.state.isLoading && <div>
                <h1>Leave a Review for {this.state.businessName}</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message} &ensp;<a href={`/restrooms/details/${this.state.restroomId}`}>Return to Restroom</a></div>}
                <div className="container">
                    <Formik
                        initialValues = {{id, restroomId, businessName, username, rating, reviewText}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}>
            {
                (props) => (
                  <Form>
                    <ErrorMessage name="username" component="div"
                      className="alert alert-warning" />
                
                    <fieldset className="form-group">
                      <label>Review ID: </label>
                      <Field className="form-control" type="text" name="id" value={this.state.id} disabled />
                    </fieldset>

                    <fieldset className="form-group">
                      <label>Rating: </label>
                      <Field name="rating" as={FormRatings} />
                    </fieldset>
                   
                    <fieldset className="form-group">
                      <label>Username: </label>
                      <Field className="form-control" type="text" name="username" />
                    </fieldset>
                  
                    <fieldset className="form-group">
                      <label>Review: </label>
                      <Field className="form-control" type="textarea" name="reviewText" />
                    </fieldset>

                    <button className="btn btn-success" type="submit">Save</button> &emsp;
                    <a href={`/restrooms/details/${this.state.restroomId}`}>Cancel</a>
                </Form>
                )}
            </Formik>
        </div>
    </div>
           }
    </div>
    );
    }
}
