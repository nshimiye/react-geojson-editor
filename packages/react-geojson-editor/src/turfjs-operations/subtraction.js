import turfDifference from '@turf/difference';
import turfArea from '@turf/area';
// import { polygon as TURFPolygon } from '@turf/helpers';

// START helpers
/**
 *
 * @param {GeoJson<Polygon>} polygons
 */
export function findLargest(polygons) {
  // @TODO use area to decide on which polygon is the largest
  const [first, ...rest] = polygons;
  let polygon = first;
  let area = turfArea(first);
  for (let i = 0; i < rest.length; i += 1) {
    const newArea = turfArea(rest[i]);
    if (area < newArea) {
      polygon = rest[i];
      area = newArea;
    }
  }
  return polygon;
}
// END helpers

/**
 * Create hollow polygon
 * @see {@link http://turfjs.org/docs/#difference}
 * @param {Array<GeoJson<Polygon>>} polygons
 * @return {GeoJson<Polygon>} largest polygon - the rest
 */
export function subtractPolygons(polygons) {
  const largestPolygon = findLargest(polygons); // assume findLargest does NOT mutate its input

  const subtracted = polygons.filter(p => p !== largestPolygon)
    .reduce(turfDifference, largestPolygon);
  // console.log('difference', { ...subtracted });
  return subtracted;
}

