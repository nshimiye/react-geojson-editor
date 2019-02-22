import TURFDifference from '@turf/difference';
// import { polygon as TURFPolygon } from '@turf/helpers';

/**
 * Create hollow polygon
 * @see {@link http://turfjs.org/docs/#difference}
 * @param {Array<GeoJson<Polygon>>} polygons
 * @return {google.maps.Polygon} largest polygon - the rest
 */
export function subtractPolygons(polygons) {
    let largestPolygon = findLargest(polygons); // assume findLargest does NOT mutate its input

    //   debugger;
    const subtracted = polygons.filter(p => p !== largestPolygon)
        .reduce(TURFDifference, largestPolygon);
    console.log('difference', {...subtracted});
    return subtracted;
}


// START helpers
export function findLargest(polygons) {
    // @TODO use area to decide on which polygon is the largest
    return polygons[0];
}
// END helpers