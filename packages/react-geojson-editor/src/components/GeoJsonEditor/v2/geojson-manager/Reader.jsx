import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GoogleMapContext } from '../GoogleMap';
import { GMPolygonType, GMDataType } from '../../../../custom-types';

export default class Reader extends Component {
    static contextType = GoogleMapContext;
    static propTypes = {
      gmapData: GMDataType,
      newPolygonList: PropTypes.arrayOf(GMPolygonType),
    };

    componentDidMount() {
      if (!this.props.gmapData) { return; }

      const { map } = this.context;
      this.props.gmapData.setMap(map);

      // @TODO this is a duplicate from Updator component
      this.props.newPolygonList.forEach(p => p.setMap(map));
    }

    componentDidUpdate(prevProps) {
      const { map } = this.context;
      const { gmapData, newPolygonList } = this.props;

      if (prevProps.gmapData !== gmapData) {
        // cleanup
        if (prevProps.gmapData) prevProps.gmapData.setMap(null);

        if (gmapData) gmapData.setMap(map);
      }

      if (prevProps.newPolygonList !== newPolygonList) {
        // cleanup
        prevProps.newPolygonList.forEach(p => p.setMap(null));

        newPolygonList.forEach(p => p.setMap(map));
      }
    }

    componentWillUnmount() {
      const { gmapData, newPolygonList } = this.props;

      if (gmapData) gmapData.setMap(null);

      // @TODO this is a duplicate from Updator component
      newPolygonList.forEach(p => p.setMap(null));
    }

    render() {
      return null;
    }
}


// OLD version
// export default class Reader extends Component {
//     static contextType = GoogleMapContext;

//     gmapData = null;

//     constructor(props, context) {
//         super(props, context);
//         this.polygonRefs = [];
//         console.log('[GeoJsonViewer] map', this.context.map);
//     }

//     componentDidMount() {
//         const { map, google } = this.context;
//         const { geojson } = this.props;
//         if(!geojson){ return; }
//         this.gmapData = new google.maps.Data();
//         this.gmapData.addGeoJson(geojson);
//         this.gmapData.setMap(map);
//     }

//     componentWillUnmount() {
//         if(!this.gmapData){ return; }
//         this.gmapData.setMap(null);
//     }

//     render() {
//         return null;
//     }
// }

