import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapWithLoader, { PolygonDataContext, PolygonDataProvider } from './GoogleMap';
import Reader from './geojson-manager/Reader';
import { GeoJsonEditorMode } from '../../../utils';
import Updator from './geojson-manager/Updator';
import Controls from './geojson-manager/Controls';
import Creator from './geojson-manager/Creator';
import Dropdown from './Dropdown/component';
import { Button } from './Button';

// @TODO refactor
export { default as DropdownStory } from './Dropdown/story/index'

export class GeoJsonEditor extends Component {
    state = {
        controlMode: GeoJsonEditorMode.VIEW,
    };

    render() {
        const { center, zoom, onSave, existingPolygons, mapHeight, mapWidth } = this.props;
        const { controlMode } = this.state;
        const active = controlMode === GeoJsonEditorMode.EDIT;
        return <div style={{ position: 'relative' }}>
            <GoogleMapWithLoader
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${this.props.googleMapKey}&v=3.exp&libraries=geometry,drawing,places`}
                center={center}
                zoom={zoom}
                height={mapHeight}
                width={mapWidth}
            >
<PolygonDataProvider initialGeojson={existingPolygons} onSave={onSave}>

                <Controls title="Managing geojson changes">
                    {active ?
                        <Dropdown name="Changes" openAtStart style={{ padding: 0 }} containerStyle={{ width: 120 }} >
                        <PolygonDataContext.Consumer>
                            {({ discardChanges, persistChanges, newPolygonList, polygonList }) => 
                                <div style={{ padding: 0 }} title="GeoJsonControls">
                                    <Button onClick={ev => {
                                        this.setState({ controlMode: GeoJsonEditorMode.VIEW }, ()=>{
                                            [...newPolygonList, ...polygonList].forEach(p => p.setMap(null));
                                            persistChanges(ev);
                                        })
                                    }} title="Save changes">Save</Button>
                                    <Button onClick={ev => discardChanges(
                                        ev,
                                        () => this.setState({ controlMode: GeoJsonEditorMode.VIEW })
                                    )
                                    } title="Discard changes">Cancel</Button>                 
                                </div>
                            }
                        </PolygonDataContext.Consumer>
                        </Dropdown> :
                        <Button onClick={() => {
                            this.setState({ controlMode: GeoJsonEditorMode.EDIT });
                        }} style={{
                            width: 120, boxShadow: 'rgba(0, 0, 0, 0.3) 0px 2px 6px', borderRadius: 2
                        }} title="Turn on Edit mode">Create / Edit</Button>
                    }
                </Controls>

{/* @TODO move control inside Updator component */}
{controlMode === GeoJsonEditorMode.EDIT && <Controls title="Managing polygon edits">
<PolygonDataContext.Consumer>
    {({ selectedPolygonList, subtractAction, deleteAction }) => {
        const selectedLength = selectedPolygonList.length;
        return (<Dropdown name={`${selectedLength} Selected`} style={{ padding: 0 }} containerStyle={{ width: 120 }} >
        {/* @TODO put this code inside its EditorControls component */}
        <div style={{ padding: 0 }} title="EditorControls">
            <Button disabled={selectedLength < 2} title="Merge">Add TODO</Button>
            <Button disabled={selectedLength < 2} onClick={(ev) => {
                    selectedPolygonList.forEach(p => p.setMap(null));
                    subtractAction(ev);
                }
            } title="Make Hollow">Subtract</Button>
            <Button disabled={selectedLength <= 0} onClick={(ev) => {
                selectedPolygonList.forEach(p => p.setMap(null));
                deleteAction(ev);
            }}>Delete</Button>
            <Button disabled={selectedLength !== 1} >Center TODO</Button>
        </div>
    </Dropdown>)
}}
</PolygonDataContext.Consumer>
</Controls>}

<PolygonDataContext.Consumer>
{({ gmapData, newPolygonList, polygonList, selectPolygon, unSelectPolygon, addNewPolygon }) => {
    return <React.Fragment>
    {controlMode === GeoJsonEditorMode.EDIT && <Creator onCreate={addNewPolygon}/>}
    {controlMode === GeoJsonEditorMode.VIEW && <Reader newPolygonList={newPolygonList} gmapData={gmapData} />}
    {controlMode === GeoJsonEditorMode.EDIT && <Updator newPolygonList={newPolygonList} polygons={polygonList}
        // onMount={generatePolygonList}
        onSelect={selectPolygon}
        onUnSelect={unSelectPolygon}
        onClick={(p, ev) => { // @TODO
            console.log('[][][][][][][]', ev === p, p, ev);
        }}
    />}</React.Fragment>
}}
</PolygonDataContext.Consumer>

</PolygonDataProvider>
            </GoogleMapWithLoader>
        </div>
    }
}

export default GeoJsonEditor;

GeoJsonEditor.propTypes = {
    center:  PropTypes.shape({
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
    mapHeight: 500,
    mapWidth: '100%',
    onSave: () => {},
};
