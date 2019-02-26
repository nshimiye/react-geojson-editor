import React from 'react';
// import PropTypes from 'prop-types';
import Reader from './Reader';

// import { GeoJsonEditorMode } from '../../../../utils';
// import { Dropdown } from '../Dropdown';
// import { Button } from '../Button';
// import { PolygonDataContext } from '../GoogleMap'; // @TODO
import { PolygonDataContext } from '../google-map'; // @TODO

export const GeoJsonReader = () => (
  <PolygonDataContext.Consumer>
    {({ gmapData, newPolygonList }) =>
      <Reader newPolygonList={newPolygonList} gmapData={gmapData} />}
  </PolygonDataContext.Consumer>
);

export default GeoJsonReader;
