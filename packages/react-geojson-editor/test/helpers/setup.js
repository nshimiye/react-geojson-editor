import google from './google';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.google = google;

configure({ adapter: new Adapter() });

