import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "./Layout";
import PageOne from "./pages/pageOne.jsx";
import AddRestroom from "./pages/addRestroom.jsx";
import RestroomList from "./pages/restroomList.jsx";
import RestroomComponent from "./pages/restroomComponent.jsx";
import RestroomDetails from "./pages/restroomDetails.jsx";
import ReviewComponent from "./pages/reviewComponent.jsx";

export const Routes = () => {
  return (
    <Router>
      <Layout>
        <div style={{ marginTop: "100px" }}>
          <Route path="/" exact component={PageOne} />
          <Route path="/add-restroom" exact component={AddRestroom} />
          <Route path="/restrooms" exact component={RestroomList} />
          <Route path="/restrooms/update/:id/" component={RestroomComponent} />
          <Route path="/restrooms/details/:id/" component={RestroomDetails} />
          <Route path="/add-review/:id" component={ReviewComponent} />
        </div>
      </Layout>
    </Router>
  );
};