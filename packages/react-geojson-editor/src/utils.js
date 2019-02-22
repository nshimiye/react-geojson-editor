import scriptjs from 'scriptjs';

export const GeoJsonEditorMode = { CREATE: 'CREATE', EDIT: 'EDIT', VIEW: 'VIEW', DELETE: 'DELETE' };

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

    const ring = [...path.getArray()];
    const reversev2 = ring.reverse;
    const reversedRing = reversev2.call( [ ...ring ] );

    const outerArea = google.maps.geometry.spherical.computeSignedArea(ring);
    console.log('outerAreaouterArea 1', outerArea, ring.map(p => [p.lng(), p.lat()]));
    
    const outerArea2 = google.maps.geometry.spherical.computeSignedArea(reversedRing);
    console.log('outerAreaouterArea 2', outerArea2, reversedRing.map(p => [p.lng(), p.lat()]));

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
