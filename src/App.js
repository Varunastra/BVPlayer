import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./reducers/index";
import { Player } from "./components/Player";
import './App.scss';

const store = createStore(reducer, {}, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  return (
    <Provider store={store}>
      <main>
        <Player />
      </main>
    </Provider>
  );
}

export default App;
