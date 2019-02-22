import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapWithLoader from './GoogleMap';
import Reader from './geojson-manager/Reader';
import { GeoJsonEditorMode } from '../../../utils';
import Updator from './geojson-manager/Updator';
import Controls from './geojson-manager/Controls';
import Creator from './geojson-manager/Creator';
import Editor from './Editor';
import Dropdown from './Dropdown/component';
import { Button } from './Button';

// @TODO refactor
export { default as DropdownStory } from './Dropdown/story/index';

export class GeoJsonEditor extends Component {
    state = {
      controlMode: GeoJsonEditorMode.VIEW,
      existingPolygons: this.props.existingPolygons,
    };

    render() {
      const { center, zoom } = this.props;
      const { controlMode, existingPolygons } = this.state;
      const active = controlMode === GeoJsonEditorMode.EDIT;
      return (<div style={{ position: 'relative' }}>
        <GoogleMapWithLoader
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${this.props.googleMapKey}&v=3.exp&libraries=geometry,drawing,places`}
          center={center}
          zoom={zoom}
        >
          <Controls title="Edit Mode">
            <button
              style={{
                            outline: 'none',
                            cursor: 'pointer',
                            display: 'inline-block',
                            // width: 'calc(100% - 20px)',
                            // 22 = padding-(left + right) + border-(left+right)
                            // height: 40,
                            background: '#FFFFFF',
                            // border: 1px solid #AAA9AA;
                            border: 'none',
                            boxShadow: 'rgba(0, 0, 0, 0.3) 0px 2px 6px',
                            borderRadius: '2px',
                            fontFamily: "'Noto Sans', sans-serif",
                            fontSize: 13,
                            lineHeight: '17px',
                            color: '#333333',
                            textAlign: 'left',
                            padding: 10,
                            position: 'relative',
                            fontWeight: active ? 'bold' : 'normal',
                        }}
              onClick={() => {
                        this.setState(state => ({ controlMode: state.controlMode === GeoJsonEditorMode.EDIT ? GeoJsonEditorMode.VIEW : GeoJsonEditorMode.EDIT }));
                    }}
            >EDIT MODE - {active ? ' ON' : ' OFF'}
            </button>
          </Controls>
          {controlMode === GeoJsonEditorMode.EDIT &&
          <Editor
            onSubtract={(polygons, result) => {
                        // @TODO refactor
                        polygons.map(({ id }) => { id.setMap(null); });
                        console.log('', polygons, result);
                        this.setState({ existingPolygons: result });
                    }}
            onDelete={() => {}}
          >
            {({
 selectedLength, onSelectPolygon, onUnselectPolygon, subtractAction, deleteAction,
}) =>
  (<>'                       '<Controls title="Edit Mode" >
    <Dropdown name={`Actions - ${selectedLength}`} style={{ padding: 0 }} containerStyle={{ width: 120 }} >
      <div style={{ padding: 0 }}>
        <Button disabled={selectedLength < 2} title="Merge">Add TODO</Button>
        <Button disabled={selectedLength < 2} onClick={subtractAction} title="Make Hollow">Subtract</Button>
        <Button disabled={selectedLength <= 0} onClick={deleteAction}>Delete</Button>
        <Button disabled={selectedLength !== 1} >Center TODO</Button>
      </div>
    </Dropdown>
  </Controls>'                               '<Creator
                                onSelectPolygon={onSelectPolygon}
                                onUnselectPolygon={onUnselectPolygon}
                              />'                               '<Updator
    geojson={existingPolygons}
    onPolygonClick={(p, ev) => {
                                        console.log('[][][][][][][]', ev === p, p, ev);
                                    }}
    onSelectPolygon={onSelectPolygon}
    onUnselectPolygon={onUnselectPolygon}
  />'                           '
  </>)
                        }
          </Editor>
                }
          {controlMode === GeoJsonEditorMode.VIEW && <Reader
            geojson={existingPolygons}
            onPolygonClick={(p, ev) => {
                    console.log('[][][][][][][]', ev === p, p, ev);
                }}
          />}
        </GoogleMapWithLoader>
              </div>);
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
  initialMode: PropTypes.string,
  existingPolygons: PropTypes.object,
  onSave: PropTypes.func,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
};
GeoJsonEditor.defaultProps = {
  center: { lng: -73.945, lat: 40.674 },
  zoom: 5,
  googleMapKey: process.env.GOOGLE_MAP_KEY,
  initialMode: GeoJsonEditorMode.VIEW,
  onSave: () => {},
};
