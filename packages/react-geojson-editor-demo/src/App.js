import React, { Component } from 'react';

import { HelloWorld } from 'react-geojson-editor';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-container">
          <HelloWorld />
        </div>
      </div>
    );
  }
}

export default App;
