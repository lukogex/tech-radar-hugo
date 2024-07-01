import { Buffer } from 'buffer';

// require('./common');
// require('./assets/images/radar/radar_legend.png');
window.process = require('process');

const CSVBuilder = require('./util/factory');

window.global = window;
window.Buffer = Buffer;
// Required by some npm packages
// window.process = { browser: true, env: { ENVIRONMENT: 'BROWSER' } };

var builder = CSVBuilder('http://localhost:1313/tech-radar/data/index.csv');
builder.init().build();
