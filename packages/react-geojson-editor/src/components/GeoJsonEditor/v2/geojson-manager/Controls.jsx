// @ts-check
import React, { Component } from 'react';
import { GoogleMapContext } from '../GoogleMap';

/**
 * React version of this Google sample Example
 * source: https://developers.google.com/maps/documentation/javascript/examples/control-custom
 */
export default class Controls extends Component {
    static contextType = GoogleMapContext;

    // @TODO this.controlId = IDGenerator.next();
    gmapControls = null;
    gmapControl = null;
    controlId = `gmap-control-${Math.random().toFixed(5).replace('0.', '')}`;
    controlRef = React.createRef();

    componentDidMount() {
      const { map, google } = this.context;
      this.gmapControls = map
        .controls[google.maps.ControlPosition.TOP_RIGHT];
      this.gmapControl = this.controlRef.current.firstChild;

      // console.log('[Controls centerControlDiv] 1', this.controlElement, this.controlRef.current.firstChild);

      this.gmapControls.push(this.gmapControl);
      // console.log('[Controls centerControlDiv] 1', centerControlDiv)
    }

    componentWillUnmount() {
      const controlIndex = this.gmapControls.indexOf(this.gmapControl);
      if (controlIndex >= 0) {
        this.gmapControls.removeAt(controlIndex);
      }
    }

    render() {
      const { children } = this.props;
      return (<div ref={this.controlRef} style={{ display: 'none' }}>
        <div id={this.controlId}>
          <ControlUI>
            {children}
          </ControlUI>
        </div>
              </div>);
    }
}

const controlUIStyle = {
  backgroundColor: '#fff',
  // border: '2px solid #fff',
  border: 'none',
  // borderRadius: '2px',
  borderRadius: '0',
  // boxShadow: '0 2px 6px rgba(0,0,0,.3)',
  boxShadow: 'none',
  cursor: 'pointer',
  marginTop: '10px',
  marginRight: '10px',
  marginBottom: '22px',
};

export function ControlUI({ children }) {
  return (<div style={{ ...controlUIStyle, textAlign: 'center' }}>
    {children}
  </div>);
}
