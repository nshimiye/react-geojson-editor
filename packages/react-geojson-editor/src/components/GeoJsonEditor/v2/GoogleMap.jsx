// 1. has a Context
// 2. has a wrapper component for
//    providing this context to child components (ex: allowing DrawingManager component to access map instance)

import React, { Component } from 'react';
import { fetchJsScript } from '../../../utils';
import { subtractPolygons } from '../../../turfjs-operations/subtraction';
import { convertPolygonToGeoJsonMulti, convertGeojsonToPolygon, convertGeojsonToGMData, gmDataToPolygonList, createGeoJson } from '../../../gm-operations/convert-polygon';

// Google namespace
// @type {{ maps: { [key:string]: any }}} google

// withScriptjs
const LOADING_STATE_NONE = 'NONE';
const LOADING_STATE_BEGIN = 'BEGIN';
const LOADING_STATE_LOADED = 'LOADED';
export const ScriptContext = React.createContext(null); // context is the global window.google object set when the script has been loaded

export class ScriptLoader extends Component {
    isUnmounted = false
    state = {
      loadingState: LOADING_STATE_NONE,
      google: null,
    };

    constructor(props) {
      super(props);
      this.handleLoaded = this.handleLoaded.bind(this);
    }
    componentDidMount() {
      const { scriptUrl } = this.props;
      const { loadingState } = this.state;
      if (loadingState !== LOADING_STATE_NONE) return;
      this.setState({ loadingState: LOADING_STATE_BEGIN }, () => {
        // @TODO have fetchJsScript provide google object in the callback
        // fetchJsScript(scriptUrl, google => this.handleLoaded(google))
        fetchJsScript(scriptUrl, () => this.handleLoaded(google));
      });
    }
    componentWillUnmount() {
      this.isUnmounted = true;
    }

    handleLoaded(google) {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        google,
        loadingState: LOADING_STATE_LOADED,
      });
    }

    render() {
      const { google, loadingState } = this.state;
      if (loadingState !== LOADING_STATE_LOADED) { return <div> Loading ... </div>; }

      if (!google) { return <div> Error Loading Script </div>; }

      return (<ScriptContext.Provider value={google}>
        {this.props.children}
              </ScriptContext.Provider>);
    }
}

// withGoogleMap
export const GoogleMapContext = React.createContext({
  google: null,
  map: null,
});
export class GoogleMapInitialzer extends Component {
    static contextType = ScriptContext;
    state = { google: null, map: null };
    constructor(props, context) {
      super(props, context);
      if (!context) { throw new Error('No google object found, please make sure you have loaded google map script'); }
      this.mapElement = React.createRef();
    }

    componentDidMount() {
      const { center, zoom } = this.props;
      const google = this.context;
      const map = new google.maps.Map(this.mapElement.current, {
        center,
        zoom,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        },
      });
      this.setState({ google, map });
    }

    componentDidUpdate(prevProps) {
      const { center } = this.props;
      if (prevProps.center !== center) {
        this.state.map.setCenter(center);
        requestAnimationFrame(() => {
          alert('CENTER CHANGED! ' + JSON.stringify(center, null, 4));
        })
      }
    }
  
    render() {
      const { map } = this.state;
      return (<div style={{ width: '90vw', height: '90vh' }} ref={this.mapElement}>
        {map ?
          <GoogleMapContext.Provider value={this.state}>
            {this.props.children}
          </GoogleMapContext.Provider> :
                null
            }
      </div>);
    }
}

export default function GoogleMapWithLoader({
  googleMapURL, children, center, zoom,
}) {
  return (<ScriptLoader scriptUrl={googleMapURL}>
    <GoogleMapInitialzer
      center={center}
      zoom={zoom}
    >
      {children}
    </GoogleMapInitialzer>
  </ScriptLoader>);
}


export function GoogleMap({ children }, { map }) {
  // in react-google-maps, this where they add event listeners
  return children;
}
GoogleMap.contextType = GoogleMapContext;


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

    persistChanges(/* ev */) {
      // 1. create a new GeoJson<MultiPolygon>
      // 2. send onSave action to the parent, telling it to update backend with newly created geojson
      createGeoJson([...this.state.newPolygonList, ...this.state.polygonList], this.context)
        .then(({ geojson, totalArea }) => {
          console.log('[createGeoJson]', geojson, totalArea);
          this.props.onSave(geojson, totalArea); // @TODO
        });
    }
    // END Action handlers

    render() {
      return (<PolygonDataContext.Provider value={this.state}>
        {this.props.children}
      </PolygonDataContext.Provider>);
    }
}

