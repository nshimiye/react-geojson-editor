import { convertPolygonToGeoJson, convertPolygonToGeoJsonMulti, convertGeojsonToPolygon } from "../../src/gm-operations/convert-polygon";
import { toGeoJsonMock, getPathsMock, addGeoJsonMock, mockedGeoJsonFeature } from "../helpers/google";

// @DONE convertPolygonToGeoJson
describe('convertPolygonToGeoJson', () => {
  beforeEach(() => {
    getPathsMock.mockClear();
    toGeoJsonMock.mockClear();
  });

  // we just need to clarify that this function depends on google.maps functionality
  it('calls getPaths', async () => {
    const polygon = new google.maps.Polygon();
    const context = { google };

    const output = await convertPolygonToGeoJson(polygon, context);

    expect(getPathsMock).toHaveBeenCalled();
  })

  it('calls  toGeoJson', async () => {
    const polygon = new google.maps.Polygon();
    const context = { google };

    const output = await convertPolygonToGeoJson(polygon, context);

    expect(toGeoJsonMock).toHaveBeenCalled();
  });

  it('return a json object', async () => {

    const polygon = new google.maps.Polygon();
    const context = { google };

    const output = await convertPolygonToGeoJson(polygon, context);

    expect(output).toEqual(mockedGeoJsonFeature);
  });
})
// @DONE convertPolygonToGeoJsonMulti
describe('convertPolygonToGeoJsonMulti', () => {

  it('return a json array', async () => {

    const polygons = [new google.maps.Polygon(), new google.maps.Polygon()];
    const context = { google };

    const output = await convertPolygonToGeoJsonMulti(polygons, context);

    expect(output).toHaveLength(2);
    expect(output).toContain(mockedGeoJsonFeature);
  });
})
// @DONE convertGeojsonToPolygon
describe('convertGeojsonToPolygon', () => {
  beforeEach(() => {
    addGeoJsonMock.mockClear();
  });
  it('calls addGeoJson', async () => {
    const polygon = new google.maps.Polygon();
    const context = { google };

    const output = await convertGeojsonToPolygon(polygon, context);

    expect(addGeoJsonMock).toHaveBeenCalled();
  });

  it('return a google.maps.Polygon object', async () => {
    const geojson = mockedGeoJsonFeature;
    const context = { google };

    const output = await convertGeojsonToPolygon(geojson, context);

    expect(output).toBeInstanceOf(google.maps.Polygon);
  });

})
// @TODO convertGeojsonToPolygonMulti
