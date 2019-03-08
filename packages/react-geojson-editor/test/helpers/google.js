// START extra
// export const mockedGeoJsonCollection = { 'type': 'FeatureCollection' };
export const mockedGeoJsonFeature = { 'type': 'Feature' };
export const getPathsMock = jest.fn(() => new MVCArray());
export const toGeoJsonMock = jest.fn(cb =>  cb(mockedGeoJsonFeature));
export const computeSignedAreaMock = jest.fn(() => 0);
export const addGeoJsonMock = jest.fn(() => null);
export const addListenerMock = jest.fn(() => null);
export const forEachMock = jest.fn(cb => cb(new Data.Feature()));
export const setMapMock = jest.fn(() => null);
export const setCenterMock = jest.fn(() => null);
export const getGeometryMock = jest.fn(() => new Data.Geometry());
export const getPolygonTypeMock = jest.fn(() => 'Polygon');
export const getMultiPolygonTypeMock = jest.fn(() => 'MultiPolygon');
// END extra

const MapTypeControlStyle = {
    DROPDOWN_MENU: 'DROPDOWN_MENU',
};

const ControlPosition = {
    TOP_CENTER: 'TOP_CENTER',
};
const OverlayType = {
    POLYGON: 'POLYGON',
};



class MVCArray {
    getArray() {
        return [] // MVCArray<LatLng>
    }
};

class DrawingManager {
    addListener = addListenerMock;
    setMap = setMapMock;
}

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
    addListener = addListenerMock;
    setMap = setMapMock;
};
class Map {
    setCenter = setCenterMock;
    addListener = addListenerMock;
};

const geometry = {
    spherical: {
        computeSignedArea: computeSignedAreaMock,
    }
};

const drawing = {
    DrawingManager,
    OverlayType
}

export const google = {
    maps: {
        MapTypeControlStyle,
        ControlPosition,
        Map,
        Data,
        Polygon,
        geometry,
        drawing
    }
};

export default google;
