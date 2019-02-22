/**
 * check to make sure props[propName] is of type google.maps.Data
 * @param {*} props 
 * @param {*} propName 
 * @param {*} componentName 
 */
export function GMDataType(props, propName, componentName) {
    if (!props[propName]) {

        // @TODO this error is misleading
        return new Error(
            'Invalid prop `' + propName + '` supplied to' +
            ' `' + componentName + '`. Validation failed.'
        );

    }
}


/**
 * check to make sure props[propName] is of type google.maps.Data
 * @param {*} props 
 * @param {*} propName 
 * @param {*} componentName 
 */
export function GMPolygonType(props, propName, componentName) {
    if (!props[propName]) {

        // @TODO this error is misleading
        return new Error(
            'Invalid prop `' + propName + '` supplied to' +
            ' `' + componentName + '`. Validation failed.'
        );

    }
}