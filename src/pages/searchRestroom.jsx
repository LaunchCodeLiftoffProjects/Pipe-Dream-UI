// import React, { Component } from "react";
// import axios from "axios";

// import { search } from "./utils";


// class App extends Component {
//   state = {
//     restroom: null,
//     loading: false,
//     value: ""
//   };

//   search = async val => {
//     this.setState({ loading: true });
//     const results = await search(
//         `http://localhost:8080/restroom`
//     );
//     const restroom = results;

//     this.setState({ restrooms, loading: false });
//   };

//   onChangeHandler = async e => {
//     this.search(e.target.value);
//     this.setState({ value: e.target.value });
//   };

//   get renderRestrooms() {
//     let restrooms = <h1>There's no restrooms</h1>;
//     if (this.state.restrooms) {
//         restrooms = <Restroom list={this.state.restrooms} />;
//     }

//     return restrooms;
//   }

//   render() {
//     return (
//       <div>
//         <input
//           value={this.state.value}
//           onChange={e => this.onChangeHandler(e)}
//           placeholder="Type something to search"
//         />
//         {this.renderRestrooms}
//       </div>
//     );
//   }
// }

// export default App;
