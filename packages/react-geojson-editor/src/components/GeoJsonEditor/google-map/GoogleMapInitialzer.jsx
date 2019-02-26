/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-did-mount-set-state */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScriptContext } from './ScriptLoader';

// withGoogleMap
export const GoogleMapContext = React.createContext({
  google: null,
  map: null,
});
export class GoogleMapInitialzer extends Component {
    static contextType = ScriptContext;

    constructor(props, context) {
      super(props, context);
      if (!context) { throw new Error('No google object found, please make sure you have loaded google map script'); }
      this.mapElement = React.createRef();
    }
    state = { google: null, map: null };

    componentDidMount() {
      const { center, zoom } = this.props;
      const google = this.context;
      const map = new google.maps.Map(this.mapElement.current, {
        center,
        zoom,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        },
      });
      this.setState({ google, map });
    }

    componentDidUpdate(prevProps) {
      const { center } = this.props;
      if (prevProps.center !== center) { this.state.map.setCenter(center); }
    }

    render() {
      const { width, height } = this.props;
      const { map } = this.state;
      return (
        <div style={{ width, height }} ref={this.mapElement}>
          {
            map ?
              <GoogleMapContext.Provider value={this.state}>
                {this.props.children}
              </GoogleMapContext.Provider> :
              null
          }
        </div>
      );
    }
}

GoogleMapInitialzer.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  children: PropTypes.node.isRequired,
  // @note height needs to be greater than 0px
  // @source: https://developers.google.com/maps/documentation/javascript/adding-a-google-map
  height: PropTypes.number.isRequired,
  width: PropTypes.string.isRequired,
  zoom: PropTypes.number.isRequired,
};

export default GoogleMapInitialzer;
