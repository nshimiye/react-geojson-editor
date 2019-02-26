// 1. has a Context
// 2. has a wrapper component for
//    providing this context to child components
//      (ex: allowing DrawingManager component to access map instance)

import React from 'react';
import PropTypes from 'prop-types';

// import { GoogleMapContext } from './GoogleMapInitialzer';
import { ScriptLoader, ScriptContext } from './ScriptLoader';
import { GoogleMapInitialzer } from './GoogleMapInitialzer';

// Google namespace
// @type {{ maps: { [key:string]: any }}} google

export function GoogleMapWithLoader({
  googleMapURL, children, center, zoom, height, width,
}) {
  return (
    <ScriptLoader scriptUrl={googleMapURL}>
      <GoogleMapInitialzer
        center={center}
        zoom={zoom}
        height={height}
        width={width}
      >
        {children}
      </GoogleMapInitialzer>
    </ScriptLoader>
  );
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

GoogleMapWithLoader.propTypes = {
  googleMapURL: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  zoom: PropTypes.number,
};

GoogleMap.propTypes = {
  google: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.string.isRequired,
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  zoom: PropTypes.number,
};

const GoogleMapDefaultProps = {
  width: '100%',
  zoom: 5,
};

GoogleMapWithLoader.defaultProps = GoogleMapDefaultProps;
GoogleMap.defaultProps = GoogleMapDefaultProps;
