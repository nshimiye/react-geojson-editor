import React, {Component} from 'react';
import { GeoJsonEditor } from 'react-geojson-editor';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faEllipsisH } from '@fortawesome/free-solid-svg-icons'

import 'flexboxgrid/css/flexboxgrid.min.css'
import { SearchRegion } from './SearchRegion';

// @TODO cleanup demo
/**
 * Select for extra regions to combine with current location
 */

function * IdGenerator( i = 2, n = 100) {
  while(i < n) {
    yield ++i;
  }
}
const generator = IdGenerator();

// const geojsonInput1 = {"type":"FeatureCollection","features":[{
//   "type":"Feature",
//   "geometry": {
//     type: 'MultiPolygon',
//     coordinates: [
//       [[
//         [51.614090500221955, -0.24650733496093835],
//         [51.57057931201116, -0.23414771582031335],
//         [51.5893539558775, -0.20256202246093835],
//         [51.61835405978723, -0.08445899511718835],
//         [51.614090500221955, -0.24650733496093835],
//       ].map(([f,l]) => [l,f])],
//       [[
//         [51.614090500221955, -0.24650733496093835],
//         [51.68396230862656, -0.04600684667968835],
//         [51.684813739230265, -0.22865455175781335],
//         [51.6362566365055, -0.25337379003906335],
//         [51.614090500221955, -0.24650733496093835],
//       ].map(([f,l]) => [l,f])],
//     ]
//   }
// }]}

// const geojsonInput2 = {"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[-0.43945472265625085,51.614090500221955],[-0.23483436132812585,51.63455193356165],[-0.42709510351562585,51.56716490703792],[-0.43945472265625085,51.614090500221955]]],[[[-0.31860511328125085,51.50224248146701],[-0.32409827734375085,51.43380302232152],[-0.18539588476562585,51.44921085147424],[-0.17028968359375085,51.55777397108853],[-0.31860511328125085,51.50224248146701]]],[[[-0.12222449804687585,51.63455193356165],[-0.20599525000000085,51.59447296719683],[-0.10299842382812585,51.536423721773986],[-0.07827918554687585,51.52531763251027],[-0.06866614843750085,51.59703225653475],[-0.08651893164062585,51.616648684023644],[-0.12222449804687585,51.63455193356165]]]]},"properties":{}}]};

const LocationLink = ({ onClick, name, description }) => {
    return <button style={{ border: 'none', outline: 'none' ,width: '100%', padding: 0, margin: 0, opacity: 0.5 }} onClick={onClick}>
      <div style={{ width: 'calc(100% - 30px)', height: 120, border: '1px gray solid', cursor: 'pointer', padding: 15 }}>
        <div style={{ width: '100%', height: '100%', padding: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ height: '100%', padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <h2 style={{ textAlign: 'left' }}>{name}</h2>
            <div style={{ textAlign: 'left' }}>{description}</div>
            <div></div>
            <div></div>
          </div>
          <div style={{ width: 25, marginLeft: 5, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </button>;
}

const ActiveLocationLink = ({ onClick, name, description }) => {
  return <div style={{ border: 'none', outline: 'none' ,width: '100%', padding: 0, margin: 0 }} >
    <div style={{ width: 'calc(100% - 30px)', height: 120, border: '1px gray solid', padding: 15 }}>
      <div style={{ width: '100%', height: '100%', padding: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ border: 'none', outline: 'none', cursor: 'pointer', height: '100%', padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} >
          <h2 style={{ textAlign: 'left' }}>{name}</h2>
          <div style={{ textAlign: 'left' }}>{description}</div>
          <div></div>
          <div></div>
        </div>
        <div style={{ width: 25, marginLeft: 5, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div></div>
          <div>
            <div style={{ border: 'none', outline: 'none', cursor: 'pointer', paddingTop: '0.2em' }} ><FontAwesomeIcon icon={faAngleRight} style={{ color: '#0074ff' }} /></div>
          </div>
              <button style={{ border: 'none', outline: 'none', cursor: 'pointer', }} onClick={() => {
                debugger;
              }}><FontAwesomeIcon icon={faEllipsisH} /></button>
        </div>
      </div>
    </div>
  </div>;
}

const EmptyLocationLink = ({ showControls, onClick, name, description }) => {
  return <button style={{ border: 'none', outline: 'none' ,width: '100%', padding: 0, margin: 0, opacity: showControls ? 1 : 0.5 }} disabled={showControls} onClick={onClick}>
    <div style={{ width: 'calc(100% - 30px)', height: 120, border: '1px gray solid', cursor: 'pointer', padding: 15 }}>
      <div style={{ width: '100%', height: '100%', padding: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ height: '100%', padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <h2 style={{ textAlign: 'left' }}>{name}</h2>
          <div style={{ textAlign: 'left' }}>{description}</div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </button>;
}


const AppControllers = ({ locations = [], selectedLocationId, onChangeLocation, onNewLocation, className }) => (
  <div className={className} >
    {locations.map(({ id, title, description }) =>
      <div className="box" key={id}>
        {
          id === selectedLocationId ?
          <ActiveLocationLink showControls={id === selectedLocationId} onClick={() => onChangeLocation(id)} name={title} description={description} /> :
          <LocationLink showControls={id === selectedLocationId} onClick={() => onChangeLocation(id)} name={title} description={description} />
        }
      </div>
    )}
    <div className="box">
      <EmptyLocationLink showControls={!selectedLocationId} onClick={onNewLocation} name="New Location" description="Draw then click save button" />
    </div>
  </div>
)

class LocationSearch extends Component {
  state = {
    locations: [],
    selectedLocationId: 0,
  };

  componentDidMount() {
    const OPENSTREETMAP_GEOJSON_API = 'https://nominatim.openstreetmap.org/details.php?polygon_geojson=1&format=json'
    const staticLocations = [
      {
        title: 'Manhattan',
        openstreetmapId: '199324647'
      },
      {
        title: 'Soho',
        openstreetmapId: '199241405'
      },
      {
        title: 'Central Park',
        openstreetmapId: '250753466'
      },
      {
        title: 'Harlem',
        openstreetmapId: '199412251'
      },
      {
        title: 'Queens County',
        openstreetmapId: '198839459'
      }, {
        title: 'City of London',
        openstreetmapId: '198098990'
      }, {
        title: 'London',
        openstreetmapId: '197735118'
      }
    ];
    
    Promise.all(
      staticLocations.map(({ openstreetmapId }) =>
        fetch(`${OPENSTREETMAP_GEOJSON_API}&place_id=${openstreetmapId}`).then(r => r.json())
        .then(({ place_id, centroid: { coordinates: [lng, lat] }, geometry: { coordinates }, names: { name } }) => {
          const geometry = {"type":"MultiPolygon","coordinates": [coordinates] }

          return { id: place_id, center: { lng, lat }, title: name, name, description: '', geojson: {"type":"FeatureCollection","features":[{"type":"Feature", geometry }] } }
        })
      )
    ).then(locations => {
      // => { id: string, title: string, description: string, geojson: any }
      this.setState(() => ({ locations }))
    })
  }

  render() {
    let location = this.state.locations.find(({ id }) => id === this.state.selectedLocationId);
    return <div className="App">
      <div className="row top-xs">
          <AppControllers
            className="col-xs-12 col-sm-12 col-md-4 col-lg-4"
            locations={this.state.locations}
            selectedLocationId={this.state.selectedLocationId}
            onChangeLocation={(selectedLocationId) => { this.setState({ selectedLocationId }) }}
            onNewLocation={() => { this.setState({ selectedLocationId: 0 }) }}
          />    
        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
          <div className="box" style={{ height: 800 }}>
            <div className="App-flex" style={{ border: '1px solid grey', padding: '1em' }}>

              <SearchRegion
                placeholder="Search ..."
                regions={this.state.locations}
                onSuggestionSelected={({ geojson: { features: [ searchedFeature] } }) => {

                    this.setState(state => {
                      // const location = state.locations.find()
                      // let selectedLocation = this.state.locations.find(({ id }) => id === this.state.selectedLocationId);
                      const selectedLocation = state.locations.find(({ id }) => id === state.selectedLocationId);

                      const locations = state.locations.map(l => {                        
                        if(l === selectedLocation) {
                          const features = [
                            ...selectedLocation.geojson.features,
                            searchedFeature
                          ];
                          return { ...selectedLocation, geojson: {  ...selectedLocation.geojson, features } }
                        }

                        return l;
                      });


                      return {
                        locations
                      }
                    });


                }}
              />

            </div>
            <div className="App-flex" style={{ border: '1px solid grey' }}>
 

            <GeoJsonEditorStore 
            initialGeojson={location ? location.geojson : null}
  >
    {({ geojson, center }, { onSaveGeojson }) => {
        console.log(location && location.geojson);
        
        return (<div style={{ width: '100%', height: 700 }}>
            <GeoJsonEditor
              googleMapKey="AIzaSyD_HADQAEoHkZhBhqh-oDaiLHuRyHbyP9c"
              initialMode="VIEW"
              existingPolygons={location ? location.geojson : undefined}
              center={location ? location.center : undefined}
              zoom={11}
              mapHeight={700}
              onSave={(geojson, area) => {
                console.log('geojson area', geojson, area);
                const description = `Region with an area of ${area} square meters`;

                // @TODO send this geojson to backend
                this.setState(state => {
                  // update existing location
                  if (state.selectedLocationId) {
                    const locations = state.locations.map(location => {
                      const { id } = location;
                      return id === state.selectedLocationId ? { ...location, geojson, description } : location;
                    });
                    return { locations }
                  }

                  // create new location
                  const nextId = generator.next().value;
                  return {
                    selectedLocationId: nextId,
                    locations: [
                      ...state.locations,
                      {
                        id: nextId,
                        title: `Location ${nextId}`,
                        description,
                        geojson,
                      }
                  ]
                };
              })
              }}
            />
          </div>);
    }}
  </GeoJsonEditorStore>


            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default LocationSearch;




export class GeoJsonEditorStore extends Component {
    state = {
      geojson: this.props.initialGeojson,
      center: { lat: 51.528308, lng: -0.3817765 },
    };
  
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                center: { lng: -73.9598295, lat: 40.7900869 }, // { lat: 51.528308, lng: -0.7817765 },
            })
        }, 5000);
    }

    onSaveGeojson(geojson) {
      this.setState({ geojson });
    }
  
    render() {
      const actions = {
        onSaveGeojson: this.onSaveGeojson.bind(this),
      };
      console.log(this.state);
      return this.props.children(this.state, actions);
    }
  }

  export const Demo2 = () => <GeoJsonEditorStore>
{({ geojson, center }, { onSaveGeojson }) => {
console.log(center);

return (<div style={{ width: 500, height: 500 }}>
  <GeoJsonEditor
    googleMapKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
    // initialMode="VIEW"
    //   existingPolygons={location ? location.geojson : null}
    //   center={location ? location.center : { lat: 51.528308, lng: -0.7817765 }}
    center={center}
    zoom={10}
    onSave={onSaveGeojson}
  />
</div>);
}}
</GeoJsonEditorStore>
// export default Demo2;

/**
                  // @TODO send this geojson to backend
                  this.setState(state => {
                    // update existing location
                    if (state.selectedLocationId) {
                      const locations = state.locations.map(location => {
                        const { id } = location;
                        return id === state.selectedLocationId ? { ...location, geojson, description } : location;
                      });
                      return { locations }
                    }

                    // create new location
                    const nextId = generator.next().value;
                    return {
                      selectedLocationId: nextId,
                      locations: [
                        ...state.locations,
                        {
                          id: nextId,
                          title: `Location ${nextId}`,
                          description,
                          geojson,
                        }
                    ]
                  };
                })
 */
