import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GeoJsonEditor } from './component';
import { GeoJsonType } from '../../custom-types';

export class GeoJsonEditorStore extends Component {
  static propTypes = {
    initialGeojson: GeoJsonType,
    children: PropTypes.func.isRequired,
  }

  static defaultProps = {
    initialGeojson: null,
  }

  state = {
    geojson: this.props.initialGeojson,
    center: { lat: 51.528308, lng: -0.3817765 },
  };

  // componentDidMount() {
  //     setTimeout(() => {
  //         this.setState({
  //             center: { lng: -73.9598295, lat: 40.7900869 },
  //             // center: { lat: 51.528308, lng: -0.7817765 },
  //         })
  //     }, 5000);
  // }

  onSaveGeojson(geojson) {
    this.setState({ geojson });
  }

  render() {
    const actions = {
      onSaveGeojson: this.onSaveGeojson.bind(this),
    };
      // console.log(this.state);
    return this.props.children(this.state, actions);
  }
}

export const Demo = () => (
  <GeoJsonEditorStore initialGeojson={
    { type: 'FeatureCollection', features: [{ type: 'Feature', geometry: { type: 'MultiPolygon', coordinates: [[[[-0.43945472265625085, 51.614090500221955], [-0.23483436132812585, 51.63455193356165], [-0.42709510351562585, 51.56716490703792], [-0.43945472265625085, 51.614090500221955]]], [[[-0.31860511328125085, 51.50224248146701], [-0.32409827734375085, 51.43380302232152], [-0.18539588476562585, 51.44921085147424], [-0.17028968359375085, 51.55777397108853], [-0.31860511328125085, 51.50224248146701]]], [[[-0.12222449804687585, 51.63455193356165], [-0.20599525000000085, 51.59447296719683], [-0.10299842382812585, 51.536423721773986], [-0.07827918554687585, 51.52531763251027], [-0.06866614843750085, 51.59703225653475], [-0.08651893164062585, 51.616648684023644], [-0.12222449804687585, 51.63455193356165]]]] }, properties: {} }] }
}
  >
    {({ geojson, center }, { onSaveGeojson }) => (
      <div style={{ width: 1000, height: 700 }}>
        <GeoJsonEditor
          initialMode="VIEW"
          googleMapKey="AIzaSyD_HADQAEoHkZhBhqh-oDaiLHuRyHbyP9c"
          existingPolygons={geojson}
          center={center}
          zoom={10}
          onSave={onSaveGeojson}
          mapHeight={700}
        />
      </div>
    )}
  </GeoJsonEditorStore>);

export const GeoJsonEditorDemo = Demo;
export default Demo;
