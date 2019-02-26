import React from 'react';
// import PropTypes from 'prop-types';

// import { GeoJsonEditorMode } from '../../../../utils';
// import { Dropdown } from '../Dropdown';
// import { Button } from '../Button';
// import { PolygonDataContext } from '../GoogleMap'; // @TODO

import Creator from './geojson-manager/Creator';
import Updator from './geojson-manager/Updator';

import { PolygonDataContext } from './GoogleMap'; // @TODO
// import { PolygonController } from './PolygonController';

export const GeoJsonWriter = () => (
  <PolygonDataContext.Consumer>
    {({
            newPolygonList,
            polygonList,
            selectPolygon,
            unSelectPolygon,
            addNewPolygon,
        }) => (
          <React.Fragment>
            {/* <PolygonController /> */}
            <Creator onCreate={addNewPolygon} />
            <Updator
              newPolygonList={newPolygonList}
              polygons={polygonList}
              onSelect={selectPolygon}
              onUnSelect={unSelectPolygon}
            />
          </React.Fragment>
        )}
  </PolygonDataContext.Consumer>
);

export default GeoJsonWriter;
