/* eslint-disable import/no-extraneous-dependencies */
import { render } from 'react-dom';
// import HelloWorld from './components/HelloWorld';
// import { Button } from './components/Button';
// import { Dropdown } from './components/Dropdown';

import { GeoJsonEditorDemo } from './components/GeoJsonEditor/demo';

const root = document.getElementById('root');

render(
  (
    <GeoJsonEditorDemo />
  ), root,
);
