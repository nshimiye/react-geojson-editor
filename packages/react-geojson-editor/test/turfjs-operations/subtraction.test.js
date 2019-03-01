import { findLargest, subtractPolygons } from "../../src/turfjs-operations/subtraction";


describe('helpers - findLargest', () => {
  it('returns largest polygon out of the provided list', () => {
    // Arrange
    const expectedPolygon = {
      "type": "Feature",
      "geometry": {
          "type": "Polygon",
          "coordinates": [
              [
                  [-15.0, -15.0],
                  [10.0, -10.0],
                  [10.0, 10.0],
                  [-15.0, -15.0]
              ]
          ]
      }
    }

    const polygonList = [
      {
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-9.0, -10.0],
                    [10.0, -10.0],
                    [10.0, 10.0],
                    [-9.0, -10.0]
                ]
            ]
        }
      },
      expectedPolygon,
      {
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-10.0, -10.0],
                    [10.0, -10.0],
                    [10.0, 10.0],
                    [-10.0, -10.0]
                ]
            ]
        }
      }
    ];

    // Act
    const outputPolygon = findLargest(polygonList);

    // Asset
    expect(outputPolygon).toEqual(expectedPolygon);
  })
})

describe('subtraction', () => {

  it('generates a new polygon', () => {
    
    const polygonList = [
      {
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-9.0, -10.0],
                    [10.0, -10.0],
                    [10.0, 10.0],
                    [-9.0, -10.0]
                ]
            ]
        }
      },
      {
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-20.0, -20.0],
                    [20.0, -20.0],
                    [20.0, 20.0],
                    [-20.0, -20.0]
                ]
            ]
        }
      }
    ];

    // Act
    const outputPolygon = subtractPolygons(polygonList);

    // Asset
    // should a polygon
    expect(outputPolygon).toHaveProperty('geometry.type', 'Polygon');
    // should not be part of the existing polygons
    expect(polygonList).not.toContain(outputPolygon);

  })
})

