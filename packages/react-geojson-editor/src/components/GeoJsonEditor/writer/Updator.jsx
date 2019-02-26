import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GoogleMapContext } from '../google-map';
import { GMPolygonType } from '../../../custom-types';

export default class Updator extends Component {
    static contextType = GoogleMapContext;
    static propTypes = {
      polygons: PropTypes.arrayOf(GMPolygonType),
      newPolygonList: PropTypes.arrayOf(GMPolygonType),
      onMount: PropTypes.func,
      onSelect: PropTypes.func,
      onUnSelect: PropTypes.func,
    };

    static defaultTypes = { // TODO
      polygons: [],
      newPolygonList: [],
    }

    constructor(props, context) {
      super(props, context);
      console.log('[GeoJsonViewer] map', this.context.map);
    }

    // componentDidMount() {
    //     this.props.onMount();
    // }

    componentDidMount() {
      const { map } = this.context;
      const { onSelect, onUnSelect, polygons } = this.props;

      polygons.forEach((p) => {
        addSelectListener(p, { onSelect, onUnSelect });
        p.setMap(map);
      });

      // @TODO this is a duplicate from Updator component
      this.props.newPolygonList.forEach((p) => {
        addSelectListener(p, { onSelect, onUnSelect });
        p.setMap(map);
      });
    }

    componentDidUpdate(prevProps) {
      const { map } = this.context;
      const {
        onSelect, onUnSelect, polygons, newPolygonList,
      } = this.props;

      // START @TODO this code is inefficient
      prevProps.polygons.forEach((p) => {
        removeSelectListener(p, this.context);
        p.setMap(null);
      });

      // @TODO this is a duplicate from Reader component
      prevProps.newPolygonList.forEach((p) => {
        removeSelectListener(p, this.context);
        p.setMap(null);
      });

      polygons.forEach((p) => {
        addSelectListener(p, { onSelect, onUnSelect });
        p.setMap(map);
      });

      // @TODO this is a duplicate from Reader component
      newPolygonList.forEach((p) => {
        addSelectListener(p, { onSelect, onUnSelect });
        p.setMap(map);
      });
      // END @TODO this code is inefficient
    }


    componentWillUnmount() {
      this.props.polygons.forEach((p) => {
        removeSelectListener(p, this.context);
        p.setMap(null);
      });

      // @TODO this is a duplicate from Reader component
      this.props.newPolygonList.forEach((p) => {
        removeSelectListener(p, this.context);
        p.setMap(null);
      });
    }

    render() {
      return null;
    }
}

/**
 * @TODO remove reference to polygon
 * @TODO this should just be a listener that takes object, events and callbacks
 * @param {google.maps.Polygon} uiPolygon
 * @param {{ [key:string]: (polygon: google.maps.Polygon) => void }} callbacks
 * @return void
 */
export function addSelectListener(uiPolygon, { onSelect, onUnSelect }) {
  uiPolygon.addListener('click', () => {
    console.log('addListener', uiPolygon);
    uiPolygon.setEditable(!uiPolygon.getEditable());
    // @TODO is .setEditable synchronous ?
    if (uiPolygon.getEditable()) {
      onSelect(uiPolygon);
    } else {
      onUnSelect(uiPolygon);
    }
  });
}
/**
 * @TODO research: why NOT implement uiPolygon.removeListener ?
 * @link https://developers.google.com/maps/documentation/javascript/events
 *
 * @param {*} uiPolygon
 * @param {*} param1
 */
export function removeSelectListener(uiPolygon, { google }) {
  google.maps.event.clearInstanceListeners(uiPolygon);
}

// OLD Version
// export default class Updator extends Component {
//     static contextType = GoogleMapContext;
//     polygonList = [];

//     constructor(props, context) {
//         super(props, context);
//         console.log('[GeoJsonViewer] map', this.context.map);
//     }

//     componentDidMount() {
//         const { map, google } = this.context;
//         const { geojson, onPolygonClick, onSelectPolygon, onUnselectPolygon } = this.props;
//         if(!geojson){ return; }
//         const gmapData = new google.maps.Data();
//         gmapData.addGeoJson(geojson);

//         let polygonList = [];
//         gmapData.forEach(feature => {
//             const geometry = feature.getGeometry();
//             // @TODO research: how to convert from google.maps.Data.Polygon to google.maps.Polygon

//             let innerPolygonList = [];
//             switch (geometry.getType()) {
//                 case 'MultiPolygon':
//                     innerPolygonList = geometry.getArray().map(this.createUIPolygon(google, onPolygonClick, onSelectPolygon, onUnselectPolygon, map));
//                     break;
//                 case 'Polygon':
//                     innerPolygonList = [this.createUIPolygon(google, onPolygonClick, onSelectPolygon, onUnselectPolygon, map)(geometry)];
//                     break;
//             }

//             polygonList = [...polygonList , ...innerPolygonList];
//         });
//         this.polygonList = polygonList;
//     }

//     componentWillUnmount() {
//         this.polygonList.forEach(p => p.setMap(null))
//     }

//     componentDidUpdate(prevProps) {
//         if(prevProps.geojson === this.props.geojson) {
//             return;
//         }

//         this.polygonList.forEach(p => p.setMap(null));
//         this.polygonList = [];

//         const { map, google } = this.context;
//         const { geojson, onPolygonClick, onSelectPolygon, onUnselectPolygon } = this.props;
//         if(!geojson){ return; }
//         const gmapData = new google.maps.Data();
//         gmapData.addGeoJson(geojson);

//         let polygonList = [];
//         gmapData.forEach(feature => {
//             const geometry = feature.getGeometry();
//             // @TODO research: how to convert from google.maps.Data.Polygon to google.maps.Polygon
//             let innerPolygonList = [];
//             switch (geometry.getType()) {
//                 case 'MultiPolygon':
//                     innerPolygonList = geometry.getArray().map(this.createUIPolygon(google, onPolygonClick, onSelectPolygon, onUnselectPolygon, map));
//                     break;
//                 case 'Polygon':
//                     innerPolygonList = [this.createUIPolygon(google, onPolygonClick, onSelectPolygon, onUnselectPolygon, map)(geometry)];
//                     break;
//             }

//             polygonList = [...polygonList , ...innerPolygonList];
//         });
//         this.polygonList = polygonList;
//     }

//     createUIPolygon(google, onPolygonClick, onSelectPolygon, onUnselectPolygon, map) {
//         return dataPolygon => {
//             const [first, ...pathList] = dataPolygon.getArray(); // polygon can have multiple paths
//             const isFirstClockwise = isPathClockwise(google, first);
//             // isClockwise(google, first);
//             // START create Polygon
//             const uiPolygon = new google.maps.Polygon({
//                 paths: [
//                     first.getArray(),
//                     // @TODO research: https://developers.google.com/maps/documentation/javascript/shapes#polygon_hole
//                     ...pathList.map(path => isFirstClockwise && isPathClockwise(google, path) ?
//                         [...path.getArray()].reverse() :
//                         path.getArray())
//                 ],
//                 editable: false,
//                 clickable: true,
//             });
//             // END create Polygon
//             // @TODO add listener cleanup process
//             // START add listeners
//             // const [path] = uiPolygon.getPaths().getArray();
//             uiPolygon.addListener('click', _ => {
//                 uiPolygon.setEditable(!uiPolygon.getEditable());
//                 onPolygonClick(uiPolygon);
//                 // @TODO is .setEditable synchronous ?
//                 if (uiPolygon.getEditable()) {

//                             // START convert google.maps.Polygon to google.maps.Data.Polygon
//         const geometry2 = new google.maps.Data.Polygon(
//             uiPolygon.getPaths().getArray().map(p => p.getArray())
//         )
//         // END convert google.maps.Polygon to google.maps.Data.Polygon
//         const feature2 = new google.maps.Data.Feature({ geometry: geometry2 });

//         feature2.toGeoJson(geojson => {
//             onSelectPolygon({ id: uiPolygon, geojson });
//         })
//                 }
//                 else {
//                     onUnselectPolygon({ id: uiPolygon });
//                 }
//             });
//             // END add listeners
//             // START show map
//             uiPolygon.setMap(map);
//             // END show map
//             return uiPolygon;
//         };
//     }

//     render() {
//         return null;
//     }
// }

