import React from "react";
// import { createStore } from "redux";
// import { Provider } from "react-redux";
// import { reducer } from "./reducers/index";
// import { Player } from "./components/Player/Player";
import './App.scss';
// import { Playlist } from "./components/Playlist";
// import { Header } from "./components/Header";
import { SignIn } from "./pages/SignIn";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// const store = createStore(reducer, {},
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <SignIn />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
