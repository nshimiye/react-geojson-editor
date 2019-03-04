import { isPathClockwise } from '../utils';

// @DONE convertPolygonToGeoJson
// @DONE convertPolygonToGeoJsonMulti
// @DONE convertGeojsonToPolygon
// @TODO convertGeojsonToPolygonMulti

/**
 * @async
 * @param {google.maps.Polygon} uiPolygon polygon to be converted
 * @param {(geojson: GeoJson<Polygon>) => void} cb used to
 *   provide access to the generated geojson object
 * @param {ReactContext} context
 */
export function convertPolygonToGeoJsonWithCB(uiPolygon, cb, { google }) {
  // START convert google.maps.Polygon to google.maps.Data.Polygon
  const geometry = new google.maps.Data.Polygon(uiPolygon
    .getPaths().getArray().map(p => p.getArray()));
  // END convert google.maps.Polygon to google.maps.Data.Polygon

  const feature = new google.maps.Data.Feature({ geometry });

  return feature.toGeoJson(cb);
}

/**
 * @async
 * @param {google.maps.Polygon} polygon
 * @param {ReactContext} context
 */
export function convertPolygonToGeoJson(polygon, context) {
  return new Promise(resolve =>
    convertPolygonToGeoJsonWithCB(polygon, resolve, context));
}

/**
 * @async
 * @param {Array<google.maps.Polygon>} polygonList
 * @param {ReactContext} context
 */
export function convertPolygonToGeoJsonMulti(polygonList, context) {
  return Promise.all(polygonList.map(p => convertPolygonToGeoJson(p, context)));
}

/**
 * @param {JSON} geojson data
 * @param {ReactContext} context react context object
 * @return {google.maps.Data}
 */
export function convertGeojsonToGMData(geojson, { google }) {
  if (!geojson) { return null; }
  const gmapData = new google.maps.Data();
  gmapData.addGeoJson(geojson);
  return gmapData;
}

/**
 * From google.maps.Data.Polygon to google.maps.Polygon
 *
 * @sync
 * @param {google.maps.Data.Polygon} dataPolygon
 * @param {ReactContext} context object
 *
 * @return {google.maps.Polygon}
 */
export function createUIPolygon(dataPolygon, { google }) {
  const [first, ...pathList] = dataPolygon.getArray(); // polygon can have multiple paths
  const isFirstClockwise = isPathClockwise(google, first);

  const uiPolygon = new google.maps.Polygon({
    paths: [
      first.getArray(),
      // @DONE research:
      //    https://developers.google.com/maps/documentation/javascript/shapes#polygon_hole
      // @OUTCOME:
      // - Google maps shows hollow polygons if outer path is drawn in
      //    the opposite direction with the rest of the paths.
      // - google.maps.Data reorders inner arrays only if
      //    it is added to map (through setMap), so
      //    to convert it(google.maps.Data) to Array<google.maps.Polygon>,
      //    you will need to do "custom reorder"
      ...pathList.map(path => (isFirstClockwise && isPathClockwise(google, path) ?
        (path.getArray().reverse).call([...path.getArray()]) :
        path.getArray())),
    ],
    editable: false,
    clickable: true,
  });
  return uiPolygon;
}

/**
 * @NOTE Conversion is needed in order to be able to delete/update individual polygons
 *
 * @sync
 * @param {any<google.maps.Data>} gmData
 * @param {ReactContext} context react context object
 * @return {Array<google.maps.Polygon>}
 */
export function gmDataToPolygonList(gmData, context) {
  let polygonList = [];
  gmData.forEach((feature) => {
    const geometry = feature.getGeometry();
    // @DONE research: How to convert from google.maps.Data.Polygon to google.maps.Polygon
    // @OUTCOME: created createUIPolygon function to handle this
    let innerPolygonList = [];
    switch (geometry.getType()) {
      case 'MultiPolygon':
        innerPolygonList = geometry.getArray().map(p => createUIPolygon(p, context));
        break;
      case 'Polygon':
        innerPolygonList = [createUIPolygon(geometry, context)];
        break;
      default:
        innerPolygonList = [];
    }

    polygonList = [...polygonList, ...innerPolygonList];
  });
  return polygonList;
}


/**
 * @sync
 * @param {GeoJson} geojson
 * @param {ReactContext} context
 * @return {google.maps.Polygon}
 */
export function convertGeojsonToPolygon(geojson, context) {
  const gmData = convertGeojsonToGMData(geojson, context);
  const [polygon] = gmDataToPolygonList(gmData, context);
  return polygon;
}

/**
 * @async
 * @param {Array<google.maps.Polygon>} polygons list of polygon used to generate geojson
 * @param {({ geojson: GeoJson<MultiPolygon>, totalArea: number }) => void} cb
 * @param {ReactContext} context
 */
export function createGeoJsonWithCB(polygons, cb, { google }) {
  const newData = new google.maps.Data();
  newData.add(new google.maps.Data.Feature({
    geometry: new google.maps.Data.MultiPolygon(polygons
      .map(polygon => polygon.getPaths().getArray().map(path => path.getArray()))),
  }));

  const totalArea = polygons.reduce((acc, polygon) => {
    const [first] = polygon.getPaths().getArray().map(path => path.getArray());
    const outerArea = google.maps.geometry.spherical.computeArea(first); // @TODO test correctness
    return acc + outerArea;
  }, 0);

  // console.log('[createGeoJsonWithCB]', newData, totalArea);

  return newData.toGeoJson((geojson) => {
    // console.log('[createGeoJsonWithCB]', geojson);
    if (typeof cb === 'function') cb({ geojson, totalArea });
  });
}

/**
 * @async
 * @param {Array<google.maps.Polygon>} polygons list of polygon used to generate geojson
 * @param {ReactContext} context
 * @return {Promise<{ geojson: GeoJson<MultiPolygon>, totalArea: number }>}
 */
export function createGeoJson(polygons, context) {
  return new Promise(resolve =>
    createGeoJsonWithCB(polygons, resolve, context));
}
