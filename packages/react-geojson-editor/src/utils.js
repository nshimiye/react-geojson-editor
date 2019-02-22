import scriptjs from 'scriptjs';

export const GeoJsonEditorMode = { CREATE: 'CREATE', EDIT: 'EDIT', VIEW: 'VIEW', DELETE: 'DELETE' };

// export const createGeoJson = (google, polygons, cb) => {
//     const newData = new google.maps.Data();
//     newData.add(new google.maps.Data.Feature({
//         geometry: new google.maps.Data.MultiPolygon(
//             polygons.map(
//                 polygon => polygon.getPaths().getArray().map(path => path.getArray()),
//             )
//         )
//     }));

//     const area = polygons.reduce((acc, polygon) => {
//         const [ first ] = polygon.getPaths().getArray().map(path => path.getArray());
//         const outerArea = google.maps.geometry.spherical.computeArea(first); // @TODO test correctness
//         return acc + outerArea;
//     }, 0);

//     newData.toGeoJson((geoJSON) => {
//         // console.log('[createMPGeojson1] geoJSON', geoJSON);
//         if(typeof cb === 'function') cb(geoJSON, area);
//     })
// }

/**
 * From jsdoc
 * @external google.maps.Data
 * @see https://developers.google.com/maps/documentation/javascript/reference/data
 */

/**
 * Figure out the drawing orientation of a given polygon
 * NOTE that this refers to the orientation of the outer path for hollow polygons.
 * @param {Google Namespace} google
 * @param {google.maps.Data.LinearRing | google.maps.MVCArray<LatLng>} path closed path
 * @return {boolean}
 */
export function isPathClockwise(google, path) {
    const outerArea = google.maps.geometry.spherical.computeSignedArea(path.getArray());
    console.log('outerAreaouterArea', outerArea, path);
    
    return outerArea > 0;
}

// NOT related to GeoJson
export function fetchJsScript(url, onloadFunction, onErrorFunction) {
    scriptjs(url, onloadFunction);
}
export function fetchJsScriptCustom(url, onloadFunction, onErrorFunction) {
    const tag = document.createElement('script');
    if (onloadFunction) { tag.onload = onloadFunction; }
    if (onErrorFunction) { tag.onerror = onErrorFunction; }
    tag.async = true;
    tag.src = url;
    document.currentScript.parentNode.insertBefore(tag, document.currentScript)
}
