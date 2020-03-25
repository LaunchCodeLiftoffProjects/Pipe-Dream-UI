import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "./Layout";
import PageOne from "./pages/pageOne.jsx";
import PageTwo from "./pages/addRestroom.jsx";
import PageThree from "./pages/restroomList.jsx";
import PageFour from "./pages/pageFour.jsx";

export const Routes = () => {
  return (
    <Router>
      <Layout>
        <div style={{ marginTop: "100px" }}>
          <Route path="/" exact component={PageOne} />
          <Route path="/2" exact component={PageTwo} />
          <Route path="/3" exact component={PageThree} />
          <Route path="/4" exact component={PageFour} />
        </div>
      </Layout>
    </Router>
  );
};