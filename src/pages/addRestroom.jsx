import React from "react";
import axios from "axios";
// eslint-disable-next-line
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default class AddRestroom extends React.Component {
  
  constructor(props) {
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
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);

  }

   
  validate(values) {
    let errors = {}
    if (!values.businessName) {
      errors.businessName = 'Please enter business name.'
    } else if (values.businessName.length < 5 || values.businessName.length > 100) {
      errors.businessName = 'Business Name must be between 5 and 100 characters.'
    }

    return errors
  }

  refreshRestrooms() {
    axios.get(`http://localhost:8080/restrooms`)
    .then(
      response => {
        this.setState({restrooms: response.data})
      }
    );
  }

  onSubmit = (values) => {
    
    const restroom = {
      businessName: values.businessName,
      businessType: values.businessType,
      address: values.address,
      isAccessible: values.isAccessible,
      isSingleStall: values.isSingleStall,
      isGenderNeutral: values.isGenderNeutral,
      hasChangingTable: values.hasChangingTable
    };
    console.log(restroom);
   
    axios.post(`http://localhost:8080/restrooms`, restroom)
      .then((response)=> {
        this.setState({message: `Restroom at ${restroom.businessName} added!`});
      })
  }


  //Write HTML inside render function
  render() {
    let {businessName, businessType, address, isAccessible, isSingleStall, isGenderNeutral, hasChangingTable} = this.state;
    
    if (this.state.id === -1) {
      return
    }

    return (
       <div>
          { this.state.isLoading &&
            <div>Loading...please wait!</div>
          }

    {!this.state.isLoading &&
      <div>
        <h1>Add a Restroom</h1>
        {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
        <div className="container">
          <Formik
            initialValues = {{businessName, businessType, address, isAccessible, isSingleStall, isGenderNeutral, hasChangingTable}}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
            enableReinitialize={true}
          >
            {
              (props) => (
                <Form>

                  <ErrorMessage name="businessName" component="div"
                    className="alert alert-warning" />

                  <fieldset className="form-group">
                    <label>Business Name: </label>
                    <Field className="form-control" type="text" name="businessName"/>
                  </fieldset>

                  <fieldset className="form-group">
                    <label>Address: </label>
                    <Field className="form-control" type="text" name="address" />
                  </fieldset>

                  <fieldset className="form-group">
                    <label>Business Type: </label>
                    <Field as="select" className="form-control" name="businessType" >
                    <option value="">Please select...</option>
                      <option value="Gas Station">Gas station</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Bar">Bar</option>
                      <option value="Retail Store">Retail Store</option>
                      <option value="Other">Other</option>
                    </Field>
                  </fieldset>

                  <fieldset>
                    <label>Single Stall? </label>
                    <Field className="form-control" type="checkbox" name="isSingleStall" >
                    </Field>
                  </fieldset>
                  
                  <fieldset>
                    <label>Accessible Option? </label>
                    <Field className="form-control" type="checkbox" name="isAccessible" >
                    </Field>
                  </fieldset>
                  
                  <fieldset>
                    <label>Gender Neutral Option? </label>
                    <Field className="form-control" type="checkbox" name="isGenderNeutral" >
                    </Field>
                  </fieldset>

                  <fieldset>
                    <label>Has Changing Table(s)? </label>
                    <Field className="form-control" type="checkbox" name="hasChangingTable" >
                    </Field>
                  </fieldset>
                  <br />
                  <button className="btn btn-success" type="submit">Save</button>&emsp;
                  <a href='/restrooms'>Cancel</a>

                </Form>
              )
            }
          </Formik>
        </div>
  
      </div>
    }
    </div>
    );
  }
}