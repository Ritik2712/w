import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import TrelloBoard from "../components/TrelloBoard";
import Home from "../components/Home";

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/:boardId" component={TrelloBoard} />
      </div>
    </Router>
  );
};

export default AppRouter;
