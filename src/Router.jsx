import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "./Layout";
import searchRestroom from "./pages/searchRestroom.jsx";
import AddRestroom from "./pages/addRestroom.jsx";
import RestroomList from "./pages/restroomList.jsx";
import RestroomProfile from "./pages/restroomProfile.jsx";
import Home from "./pages/Home.jsx";

export const Routes = () => {
  return (
    <Router>
      <Layout>
        <div style={{ marginTop: "100px" }}>
        <Route path="/" exact component={Home} />
          <Route path="/search" exact component={searchRestroom} />
          <Route path="/add-restroom" exact component={AddRestroom} />
          <Route path="/restroom-list" exact component={RestroomList} />
          <Route path="/restroom-profile" exact component={RestroomProfile} />
        </div>
      </Layout>
    </Router>
  );
};