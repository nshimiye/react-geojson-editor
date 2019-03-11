# react-geojson-editor

| WARNING: This package is still under development, and therefore unstable |
| --- |

Allowing you to draw and edit shapes on maps!

## Features
* [x] onCreate action
* [x] onUpdate action
* [x] drawing mode
* [x] edit mode
* [x] view mode
* [x] Drawing hollow polygons
* [x] Center map

## Usage

```jsx
import React from 'react';
import GeoJsonEditor from 'react-geojson-editor';

<GeoJsonEditor
    googleMapKey="google api key"
    existingPolygons={GeoJson}
    center={{ lng: number, lat: number }}
    zoom={5}
    mapHeight={700}
    onSave={(geojson, area) => {/* Ex: save updated geojson to the backend */}}
/>
```

## Other components
### `GoogleMapWithLoader`

Used if you want to access the map instance within your own components

Example:
```jsx
import { GoogleMapContext } from 'react-geojson-editor/google-map';

class YourComponent extends Component {
    static contextType = GoogleMapContext;
    componentDidMount() {
        if (this.context.map) {
            this.context.map.addListener('click', (e) => {
                this.context.map.setCenter(e.latLng);
            })
        }
    }
    render() {
        return <div>Access to map instance using GoogleMapContext</div>;
    }
}
```

```jsx
import React from 'react';
import { GoogleMapWithLoader } from 'react-geojson-editor/google-map';

<GoogleMapWithLoader {{
    googleMapURL: '',
    center: { lat: 0, lng: 0 },
    zoom: 1,
    height: 100,
    width: 100,
}}>
    <YourComponent />
</GoogleMapWithLoader>
```
