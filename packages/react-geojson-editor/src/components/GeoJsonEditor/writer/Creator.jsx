import React, { Component } from 'react';

import { GoogleMapContext } from '../google-map';

// @TODO where should I put the code for selecting/unSelecting new polygons ?
// Maybe inside Updator component
export default class Creator extends Component {
    static contextType = GoogleMapContext;

    drawingManager = null;
    // polygonList = [];

    // constructor(props, context) {
    //     super(props, context);
    //     console.log('[GeoJsonViewer] map', this.context.map);
    // }

    componentDidMount() {
      const { map, google } = this.context;
      const { onCreate } = this.props;

      this.drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,

        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.POLYGON,
          ],
        },

        polygonOptions: {
          fillColor: '#455A64',
          fillOpacity: 0.3,
          strokeColor: '#455A64',
          strokeWeight: 3,
          clickable: true,
          editable: true, // @TODO
          zIndex: 1,
        },
      });
      this.drawingManager.addListener('polygoncomplete', (polygon) => {
        polygon.setMap(null);
        onCreate(polygon);
      });

      this.drawingManager.setMap(map);
    }

    componentDidUpdatesaved(prevProps) {
      const { map, google } = this.context;
      const { onCreate } = this.props;

      this.drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,

        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.POLYGON,
          ],
        },

        polygonOptions: {
          fillColor: '#455A64',
          fillOpacity: 0.3,
          strokeColor: '#455A64',
          strokeWeight: 3,
          clickable: true,
          editable: true, // @TODO
          zIndex: 1,
        },
      });
      this.drawingManager.addListener('polygoncomplete', (polygon) => {
        polygon.setMap(null);
        onCreate(polygon);
      });

      this.drawingManager.setMap(map);
    }


    componentWillUnmount() {
      this.drawingManager.setMap(null);
      // this.polygonList.forEach(p => p.setMap(null))
    }

    render() {
      return null;
    }
}


// @TODO add a drawingManager
// export default class Creator extends Component {
//     static contextType = GoogleMapContext;

//     drawingManager = null;
//     polygonList = [];

//     constructor(props, context) {
//         super(props, context);
//         this.polygonRefs = [];
//         console.log('[GeoJsonViewer] map', this.context.map);
//     }

//     componentDidMount() {
//         const { map, google } = this.context;
//         const { onSelectPolygon, onUnselectPolygon } = this.props;

//         this.drawingManager = new google.maps.drawing.DrawingManager({
//             drawingMode: null,
//             drawingControl: true,

//             drawingControlOptions: {
//                 position: google.maps.ControlPosition.TOP_CENTER,
//                   drawingModes: [
//                       google.maps.drawing.OverlayType.POLYGON,
//                   ],
//             },

//             polygonOptions: {
//                 fillColor: '#455A64',
//                 fillOpacity: 0.3,
//                 strokeColor:'#455A64',
//                 strokeWeight:3,
//                 clickable: true,
//                 editable: true, // @TODO
//                 zIndex: 1,
//             },
//         });
//         this.drawingManager.addListener('polygoncomplete', (polygon) => {
//             this.polygonList.push(polygon);
//             // props.onCreatePolygon(polygon);
//             console.log('[addListener] path insert_at', polygon);
//             // polygon.setEditable(false);

//         // START convert google.maps.Polygon to google.maps.Data.Polygon
//         const geometry1 = new google.maps.Data.Polygon(
//             polygon.getPaths().getArray().map(p => p.getArray())
//         )
//         // END convert google.maps.Polygon to google.maps.Data.Polygon
//         const feature1 = new google.maps.Data.Feature({ geometry: geometry1 });

//         feature1.toGeoJson(geojson => {
//                     onSelectPolygon({ id: polygon, geojson });
//         })


//             polygon.addListener('click',  _ => {
//                 polygon.setEditable(!polygon.getEditable());
//                 // @TODO is .setEditable synchronous ?
//                 if (polygon.getEditable()) {

//         // START convert google.maps.Polygon to google.maps.Data.Polygon
//         const geometry2 = new google.maps.Data.Polygon(
//             polygon.getPaths().getArray().map(p => p.getArray())
//         )
//         // END convert google.maps.Polygon to google.maps.Data.Polygon
//         const feature2 = new google.maps.Data.Feature({ geometry: geometry2 });

//         feature2.toGeoJson(geojson => {
//             onSelectPolygon({ id: polygon, geojson });
//         })
//                 } else {
//                     onUnselectPolygon({ id: polygon });
//                 }
//             });
//         })
//         this.drawingManager.setMap(map);
//     }

//     componentWillUnmount() {
//         this.drawingManager.setMap(null);
//         this.polygonList.forEach(p => p.setMap(null))
//     }

//     render() {
//         return null;
//     }
// }

