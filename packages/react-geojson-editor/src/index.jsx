/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import { render } from 'react-dom';
// import HelloWorld from './components/HelloWorld';
// import { Button } from './components/Button';
// import { Dropdown } from './components/Dropdown';

import { GeoJsonEditorDemo } from './demos/GeoJsonEditor/index';

const root = document.getElementById('root');

render(
  (
    <GeoJsonEditorDemo />
  ), root,
);
