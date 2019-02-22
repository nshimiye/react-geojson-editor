import React, { Component } from 'react';

// import { GeoJsonEditorDemo } from './GeoJsonEditorDemo';

import './App.css';
import LocationSearch from './LocationSearch';

class App extends Component {
  render() {
    return (
      <div className="App">
          <LocationSearch />
          {/* <GeoJsonEditorDemo /> */}
      </div>
    );
  }
}

export default App;
