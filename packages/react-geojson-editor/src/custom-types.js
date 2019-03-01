/* global google */
/**
 * check to make sure props[propName] is of type google.maps.Data
 * @param {*} props
 * @param {string} propName
 * @param {string} componentName
 */
export function GMDataType(props, propName, componentName) {
  if (props[propName] instanceof google.maps.Data) {
    return null;
  }
  return new Error(`Invalid prop \`${propName}\` supplied to` +
    ` \`${componentName}\`. Expecting instance of google.maps.Data.`);
}


/**
 * check to make sure props[propName] is of type google.maps.Polygon
 * @param {*} props
 * @param {string} propName
 * @param {string} componentName
 */
export function GMPolygonType(props, propName, componentName) {
  if (props[propName] instanceof google.maps.Polygon) {
    return null;
  }
  return new Error(`Invalid prop \`${propName}\` supplied to` +
    ` \`${componentName}\`. Expecting instance of google.maps.Polygon.`);
}

/**
 * check to make sure props[propName] is of type GeoJson

example geojson => {
  "type": "FeatureCollection",
  "features": [{
      "type": "Feature",
      "geometry": {
          "type": "Point",
          "coordinates": [102.0, 0.5]
      },
      "properties": {
          "prop0": "value0"
      }
  }]
}
 * @param {*} props
 * @param {string} propName
 * @param {string} componentName
 */
export function GeoJsonType(props, propName, componentName) {
  if (
    typeof props[propName] === 'object' &&
      props[propName].type === 'FeatureCollection' &&
      Array.isArray(props[propName].features)
  ) {
    return null;
  }
  return new Error(`Invalid prop \`${propName}\` supplied to` +
    ` \`${componentName}\`. Expecting a GeoJson object`);
}

/**
 * jsx styles is an object whose values are strings or numbers
 * @param {Object} props
 * @param {string} propName
 * @param {string} componentName
 */
export function StylesType(props, propName, componentName) {
  if (
    typeof props[propName] === 'object' &&
    Object.keys(props[propName]).every(key =>
      typeof props[propName][key] === 'string' || typeof props[propName][key] === 'number')
  ) {
    return null;
  }
  return new Error(`Invalid prop \`${propName}\` supplied to` +
    ` \`${componentName}\`. Expecting react jsx styles.`);
}
