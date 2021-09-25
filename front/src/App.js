import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signup";
import { ResetPass } from "./components/resetpass";
import { Reset } from "./components/reset";
import Navbar from "./components/navbar";
import HomePage from "./components/homepage";
import TrelloBoard from "./landing/components/TrelloBoard";
import Home from "./landing/components/Home";
import SignUpWBordId from './components/SignUpWBoard'
import ImageUpload from "./components/ImageUpload";

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <HomePage  />
          </Route>
          <Route exact path="/sign-in">
            <Login  />
          </Route>
          <Route exact path="/sign-up">
            <SignUp  />
          </Route>
          {/* <Route exact path='/sign-up/:boardId'>
            <SignUpWBordId />
          </Route> */}
          <Route exact path="/task">
            <Home  />
          </Route>
          <Route exact path='/task/:boardId'>
            <TrelloBoard />
          </Route>
          <Route path="/resetpass" component={ResetPass} />
          <Route path="/reset" component={Reset} />
          <Route exact path="/upload-img" >
            <ImageUpload/>  
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
