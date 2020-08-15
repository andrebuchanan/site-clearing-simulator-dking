import React, { useEffect } from 'react';
import './App.css';
import { Provider } from "react-redux";
import store from "./store/index"
import Simulator from "./components/Simulator"

function App() {

  useEffect(() => {
    console.log(store.getState());
  })

  return (
    <div className="App">
      <Provider store={store}>
        <Simulator/>
      </Provider>
    </div>
  );
}

export default App;
