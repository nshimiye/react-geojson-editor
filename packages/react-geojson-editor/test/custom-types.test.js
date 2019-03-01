import { GMDataType, GMPolygonType, GeoJsonType, StylesType } from "../src/custom-types";

describe('custom prop-types', () => {
  describe('GMDataType', () => {
    it('checks to make sure props[propName] is of type google.maps.Data', () => {
      const propVerification = GMDataType({ gmapData: new google.maps.Data() }, 'gmapData', 'Reader');
      expect(propVerification).not.toBeInstanceOf(Error);

    })

    it('returns error if wrong type is provided', () => {
      
      const propVerification = GMDataType({ gmapData: {} }, 'gmapData', 'Reader');
      expect(propVerification).toBeInstanceOf(Error);

    })

  });

  describe('GMPolygonType', () => {

    it('checks to make sure props[propName] is of type google.maps.Polygon', () => {
      const propVerification = GMPolygonType({ newPolygon: new google.maps.Polygon() }, 'newPolygon', 'Reader');
      expect(propVerification).not.toBeInstanceOf(Error);
    })

    it('returns error if wrong type is provided', () => {
      
      const propVerification = GMPolygonType({ newPolygon: {} }, 'newPolygon', 'Reader');
      expect(propVerification).toBeInstanceOf(Error);

    })
  });

  describe('GeoJsonType', () => {

    it('checks to make sure props[propName] is of type GeoJson', () => {
      const propVerification = GeoJsonType(
        { 
          existingPolygons: {
            "type": "FeatureCollection",
            "features": []
          } 
        },
        'existingPolygons', 'GeoJsonEditor');
      expect(propVerification).not.toBeInstanceOf(Error);
    })

    it('returns error if wrong type is provided', () => {
      
      const propVerification = GeoJsonType({ existingPolygons: {} }, 'existingPolygons', 'GeoJsonEditor');
      expect(propVerification).toBeInstanceOf(Error);

    })
  });

  describe('StylesType', () => {

    it('checks to make sure props[propName] has a list of styles', () => {
      const propVerification = StylesType({ containerStyle: { width: 120 } }, 'containerStyle', 'Dropdown');
      expect(propVerification).not.toBeInstanceOf(Error);
    })

    it('returns error if wrong type is provided', () => {
      
      const propVerification = StylesType({ containerStyle: 'width: 120;' }, 'containerStyle', 'Dropdown');
      expect(propVerification).toBeInstanceOf(Error);

    })
  });

});
