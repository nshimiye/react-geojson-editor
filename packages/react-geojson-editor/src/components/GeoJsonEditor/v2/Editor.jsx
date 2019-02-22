import React, { Component } from 'react';
import TURFDifference from '@turf/difference';
import { polygon as TURFPolygon } from '@turf/helpers';
// import PropTypes from "prop-types";

/**
 * Responsibilities:
 * - Subtract polygons (i.e create hollow)
 * - Add polygons
 * - Delete polygons
 */
export const EditorContext = React.createContext({
  onSelectPolygon: null,
  onUnselectPolygon: null,
  subtract: null,
});
export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polygons: [
        /*
                {
                    id: polygon pointer,
                    geojson: polygon geojson data
                }
                */
      ],
    };

    // const newData = new google.maps.Data();
    // newData.addGeoJson(props.geojsonData);
    // newData.setMap(this.context[MAP]);

    this.onSelectPolygon = this.onSelectPolygon.bind(this);
    this.onUnselectPolygon = this.onUnselectPolygon.bind(this);
    this.subtractAction = this.subtractAction.bind(this);
    this.deleteAction = this.deleteAction.bind(this);
  }

  // shouldComponentUpdate() {
  //     return false;
  // }

  onSelectPolygon(polygon) {
    if (!polygon) {
      return;
    }
    const { id, geojson } = polygon;
    this.setState(state => ({ polygons: [...state.polygons, { id, geojson }] }));
    console.log('onSelectPolygon', id);
  }

  onUnselectPolygon(polygon) {
    if (!polygon) {
      return;
    }
    const { id } = polygon;
    console.log('onUnselectPolygon', id);
    this.setState(state => ({
      polygons: state.polygons.filter(p => p.id !== id),
    }));
  }

  subtractAction() {
    if (this.state.polygons.length === 0) {
      return;
    }
    this.subtractPolygons(this.state.polygons.map(({ geojson }) => geojson));
  }

  deleteAction() {
    if (this.state.polygons.length === 0) {
      return;
    }
    // @TODO use of "google map api" is not allowed in here
    this.state.polygons.map(({ id }) => id.setMap(null));
    this.setState({ polygons: [] }, () => {
      this.props.onDelete(
        this.state.polygons,
        {
          type: 'FeatureCollection',
          features: [], // @TODO geojson of deleted polygons
        },
      );
    });
  }

  render() {
    const { polygons } = this.state;
    const actions = {
      onSelectPolygon: this.onSelectPolygon,
      onUnselectPolygon: this.onUnselectPolygon,
      subtractAction: this.subtractAction,
      deleteAction: this.deleteAction,
    };

    return this.props.children({ ...actions, selectedLength: polygons.length });
  }

  // START helpers
  findLargest(polygons) {
    return polygons[0];
  }
  // END helpers

  // START actions
  deletePolygon() {

  }

  /**
     * Create hollow polygon
     * @see {@link http://turfjs.org/docs/#difference}
     * @param {Array<GeoJson<Polygon>>} polygons
     * @return {google.maps.Polygon} largest polygon - the rest
     */
  subtractPolygons(polygons) {
    const largestPolygon = this.findLargest(polygons);


    console.log(TURFPolygon, largestPolygon);

    const polygon1 = TURFPolygon([
      [[126, -28],
        [140, -28],
        [140, -20],
        [126, -20],
        [126, -28]],
      // largestPolygon.getPaths().getArray().map(p => p.getArray().map(pt => [pt.lng(), pt.lat()]))
    ], {
      fill: '#F00',
      'fill-opacity': 0.1,
    });
    console.log(polygon1, { ...largestPolygon });
    //   console.log('hollow polygon', TURFDifference(json, polygon1));

    //   debugger;
    const subtracted = polygons.filter(p => p !== largestPolygon)
      .reduce(
        (outer, p) => TURFDifference(outer, p),
        largestPolygon,
      );
    console.log('difference', { ...subtracted });
    // debugger;

    const selectedPolygons = [...this.state.polygons];
    this.setState({ polygons: [] }, () => {
      this.props.onSubtract(
        selectedPolygons,
        {
          type: 'FeatureCollection',
          features: [subtracted],
        },
      );
    });
  }
  // END actions
}

