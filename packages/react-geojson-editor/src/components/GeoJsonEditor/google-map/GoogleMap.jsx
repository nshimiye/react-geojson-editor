// 1. has a Context
// 2. has a wrapper component for
//    providing this context to child components (ex: allowing DrawingManager component to access map instance)

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GoogleMapContext } from './GoogleMapInitialzer';
import { ScriptLoader, ScriptContext } from './ScriptLoader';

// Google namespace
// @type {{ maps: { [key:string]: any }}} google

export function GoogleMapWithLoader({
  googleMapURL, children, center, zoom, height, width,
}) {
  return (<ScriptLoader scriptUrl={googleMapURL}>
    <GoogleMapInitialzer
      center={center}
      zoom={zoom}
      height={height}
      width={width}
    >
      {children}
    </GoogleMapInitialzer>
  </ScriptLoader>);
}


export default function GoogleMap({
  google, children, center, zoom, height, width,
}) {
  // in react-google-maps, this where they add event listeners
  return (
    <ScriptContext.Provider value={google}>
      <GoogleMapInitialzer
        center={center}
        zoom={zoom}
        height={height}
        width={width}
      >
        {children}
      </GoogleMapInitialzer>
    </ScriptContext.Provider>
  );
}
