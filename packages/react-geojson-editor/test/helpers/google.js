// START extra
// export const mockedGeoJsonCollection = { 'type': 'FeatureCollection' };
export const mockedGeoJsonFeature = { 'type': 'Feature' };
export const getPathsMock = jest.fn(() => new MVCArray());
export const toGeoJsonMock = jest.fn(cb =>  cb(mockedGeoJsonFeature));
export const computeSignedAreaMock = jest.fn(() => 0);
export const addGeoJsonMock = jest.fn(() => null);
export const forEachMock = jest.fn(cb => cb(new Data.Feature()));
export const setMapMock = jest.fn(() => null);
export const getGeometryMock = jest.fn(() => new Data.Geometry());
export const getPolygonTypeMock = jest.fn(() => 'Polygon');
export const getMultiPolygonTypeMock = jest.fn(() => 'MultiPolygon');
// END extra

class MVCArray {
    getArray() {
        return [] // MVCArray<LatLng>
    }
};

class Data {
    static Feature = class Feature {
        toGeoJson = toGeoJsonMock;
        getGeometry = getGeometryMock;
    };

    static Geometry = class Geometry {
        getArray = () => [new Data.LinearRing()];
        getType = getPolygonTypeMock;
    }
    static Polygon = class Polygon {}
    static LinearRing = class LinearRing {
        // getType = getLinearRingTypeMock;
        getArray = () => [];
    }

    addGeoJson = addGeoJsonMock;
    forEach = forEachMock;
    setMap = setMapMock;
};

class Polygon {
    getPaths = getPathsMock;
};
class Map {};

const geometry = {
    spherical: {
        computeSignedArea: computeSignedAreaMock
    }
};

const MapTypeControlStyle = {
    DROPDOWN_MENU: 'DROPDOWN_MENU',
};

export const google = {
    maps: {
        MapTypeControlStyle,
        Map,
        Data,
        Polygon,
        geometry,
    }
};

export default google;

