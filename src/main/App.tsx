import React from 'react';
import './App.css';
import { Provider } from "react-redux";
import store from "./redux/store/store"
import Simulator from "./components/Simulator"

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <Simulator/>
      </Provider>
    </div>
  );
}

export default App;
