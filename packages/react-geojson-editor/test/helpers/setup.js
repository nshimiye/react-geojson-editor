import google from './google';
import scriptjs from './scriptjs';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.google = google;

configure({ adapter: new Adapter() });

