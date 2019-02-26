import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { subtractPolygons } from '../../../turfjs-operations/subtraction';
import { convertPolygonToGeoJsonMulti, convertGeojsonToPolygon, convertGeojsonToGMData, gmDataToPolygonList, createGeoJson } from '../../../gm-operations/convert-polygon';

/**
 * In charge of keeping track of polygons
 * @NOTE PolygonDataProvider is not allowed to call polygon methods (ex: polygon.setEditable or polygon.setMap)
 *      these calls should done outside
 */
export const PolygonDataContext = React.createContext({
    gmapData: null, // of type google.maps.Data, used to present existing polygons
    newPolygonList: [], // of type google.maps.Polygon
    polygonList: [], // converted from gmapData for editing purposes
    selectedPolygonList: [], // selected from either newPolygonList or polygonList
  
    // Actions
    // createGmapData: null, // of type Function
    addNewPolygon: null,
    // removeNewPolygon: null,
    selectPolygon: null,
    unSelectPolygon: null,
  
    // gmapData to polygonList
    // generatePolygonList: null,
  
    // Editor actions (applied on selected polygon) ??
    addAction: null, // combine selected polygons
    subtractAction: null,
    deleteAction: null,
    centerAction: null,
  
    discardChanges: null,
    persistChanges: null,
  });
  export class PolygonDataProvider extends Component {
      static contextType = GoogleMapContext;
      constructor(props, context) {
        super(props, context);
        // this.createGmapData = this.createGmapData.bind(this);
        this.addNewPolygon = this.addNewPolygon.bind(this);
        this.selectPolygon = this.selectPolygon.bind(this);
        this.unSelectPolygon = this.unSelectPolygon.bind(this);
        this.subtractAction = this.subtractAction.bind(this);
        this.deleteAction = this.deleteAction.bind(this);
  
        this.discardChanges = this.discardChanges.bind(this);
        this.persistChanges = this.persistChanges.bind(this);
        // this.generatePolygonList = this.generatePolygonList.bind(this);
  
        const gmapData = props.initialGeojson ? convertGeojsonToGMData(props.initialGeojson, context) : null;
        this.state = {
          gmapData,
          newPolygonList: [],
          polygonList: gmapData ? gmDataToPolygonList(gmapData, context) : [],
          selectedPolygonList: [],
  
          // Actions
          // createGmapData: this.createGmapData,
          addNewPolygon: this.addNewPolygon,
          selectPolygon: this.selectPolygon,
          unSelectPolygon: this.unSelectPolygon,
          // generatePolygonList: this.generatePolygonList,
  
          // Editor actions
          addAction: null,
          subtractAction: this.subtractAction,
          deleteAction: this.deleteAction,
          centerAction: null,
  
          discardChanges: this.discardChanges,
          persistChanges: this.persistChanges,
        };
      }
  
      componentDidUpdate(prevProps) {
        const context = this.context;
        const { initialGeojson } = this.props;
  
        if (prevProps.initialGeojson !== initialGeojson) {
          const gmapData = initialGeojson ? convertGeojsonToGMData(initialGeojson, context) : null;
          this.setState({
            gmapData,
            newPolygonList: [],
            polygonList: gmapData ? gmDataToPolygonList(gmapData, context) : [],
            selectedPolygonList: [],
          });
        }
      }
  
      // START Action handlers
      createGmapData_NOT_IN_USE() {
  
      }
      generatePolygonList_NOT_IN_USE() {
        this.setState((state) => {
          const polygonList = gmDataToPolygonList(state.gmapData, this.context);
          return { polygonList };
        });
      }
  
      addNewPolygon(polygon) {
        this.setState(state => ({
          newPolygonList: [...state.newPolygonList, polygon],
          selectedPolygonList: [...state.selectedPolygonList, polygon],
        }));
      }
  
      selectPolygon(polygon) {
        this.setState(state => ({
          selectedPolygonList: [...state.selectedPolygonList, polygon],
        }));
      }
      unSelectPolygon(polygon) {
        this.setState(state => ({
          selectedPolygonList: state.selectedPolygonList.filter(p => p !== polygon),
        }));
      }
  
      subtractAction(/* ev */) {
        // @TODO convertPolygonToGeoJson
        // @TODO convertPolygonToGeoJsonMulti
        // @TODO convertGeojsonToPolygon
        // @TODO convertGeojsonToPolygonMulti
  
        convertPolygonToGeoJsonMulti(this.state.selectedPolygonList, this.context)
          .then(geojsonList => subtractPolygons(geojsonList)) // => subtractedGeojson
          .then(subtractedGeojson => convertGeojsonToPolygon(subtractedGeojson, this.context)) // => subtractedPolygon
          .then((subtractedPolygon) => {
            this.setState(state => ({
              newPolygonList: [
                ...state.newPolygonList.filter(p => !state.selectedPolygonList.includes(p)),
                subtractedPolygon,
              ],
              polygonList: state.polygonList.filter(p => !state.selectedPolygonList.includes(p)),
              selectedPolygonList: [],
            }));
          });
      }
  
      deleteAction(/* ev */) {
        this.setState(state => ({
          newPolygonList: state.newPolygonList.filter(p => !state.selectedPolygonList.includes(p)),
          polygonList: state.polygonList.filter(p => !state.selectedPolygonList.includes(p)),
          selectedPolygonList: [],
        }));
      }
  
      discardChanges(_, cb) {
        this.setState(state => ({
          newPolygonList: [],
          polygonList: state.gmapData ? gmDataToPolygonList(state.gmapData, this.context) : [],
          selectedPolygonList: [],
        }), cb);
      }
  
      persistChanges(_, cb) {
        // 1. create a new GeoJson<MultiPolygon>
        // 2. send onSave action to the parent, telling it to update backend with newly created geojson
        createGeoJson([...this.state.newPolygonList, ...this.state.polygonList], this.context)
          .then(({ geojson, totalArea }) => {
            console.log('[createGeoJson]', geojson, totalArea);
  
            cb(); // @TODO How do i save new GeoJson and turn off edit mode?
            this.props.onSave(geojson, totalArea); // @TODO How do i save new GeoJson and turn off edit mode?
          });
      }
      // END Action handlers
  
      render() {
        return (<PolygonDataContext.Provider value={this.state}>
          {this.props.children}
        </PolygonDataContext.Provider>);
      }
  }
  
  
  export default PolygonDataProvider;
