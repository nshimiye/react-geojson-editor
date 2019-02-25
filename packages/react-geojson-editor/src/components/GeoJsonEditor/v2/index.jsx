import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapWithLoader, { PolygonDataProvider } from './GoogleMap';
// import Reader from './geojson-manager/Reader';
import { GeoJsonEditorMode } from '../../../utils';
// import Updator from './geojson-manager/Updator';
// import Controls from './geojson-manager/Controls';
// import Creator from './geojson-manager/Creator';
// import Dropdown from './Dropdown/component';
// import { Button } from './Button';
import { GeoJsonType } from '../../../custom-types';
import { GeoJsonController } from './geojson-manager/GeoJsonController';

// @TODO refactor
export { default as DropdownStory } from './Dropdown/story/index';

export class GeoJsonEditor extends Component {
    state = {
      controlMode: GeoJsonEditorMode.VIEW,
    };

    render() {
      const {
        center, zoom, onSave, existingPolygons, mapHeight, mapWidth,
      } = this.props;
      const { controlMode } = this.state;
      // const active = controlMode === GeoJsonEditorMode.EDIT;
      return (
        <div style={{ position: 'relative' }}>
          <GoogleMapWithLoader
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${this.props.googleMapKey}&v=3.exp&libraries=geometry,drawing,places`}
            center={center}
            zoom={zoom}
            height={mapHeight}
            width={mapWidth}
          >
            <PolygonDataProvider initialGeojson={existingPolygons} onSave={onSave}>
              <GeoJsonController
                mode={controlMode}
                onToggleMode={mode => this.setState({ controlMode: mode })}
              />
              {/*
                    active ?
                    <GeoJsonUpdator> <PolygonEditor /> </GeoJsonUpdator> :
                    <GeoJsonViewer />
                */}
            </PolygonDataProvider>
          </GoogleMapWithLoader>
        </div>
      );
    }
}

export default GeoJsonEditor;

GeoJsonEditor.propTypes = {
  center: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number,
  }),
  zoom: PropTypes.number,
  googleMapKey: PropTypes.string,
  //   initialMode: PropTypes.string,
  existingPolygons: GeoJsonType,
  onSave: PropTypes.func,
  //   onCreate: PropTypes.func,
  //   onUpdate: PropTypes.func,
  mapHeight: PropTypes.number,
  mapWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};
GeoJsonEditor.defaultProps = {
  center: { lng: -73.945, lat: 40.674 },
  zoom: 5,
  existingPolygons: null,
  googleMapKey: process.env.GOOGLE_MAP_KEY,
  //   initialMode: GeoJsonEditorMode.VIEW,
  mapHeight: 500,
  mapWidth: '100%',
  onSave: () => { },
};
