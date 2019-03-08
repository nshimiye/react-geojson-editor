import React, { Component } from 'react';

import { GoogleMapContext } from '../google-map';

// @TODO where should I put the code for selecting/unSelecting new polygons ?
// Maybe inside Updator component
export class Creator extends Component {
    static contextType = GoogleMapContext;

    drawingManager = null;

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

    componentDidUpdatesaved(/* prevProps */) {
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
    }

    render() {
      return null;
    }
}

export default Creator;
