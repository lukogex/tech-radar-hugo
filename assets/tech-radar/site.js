import * as params from '@params';
import { Buffer } from 'buffer';

const CSVBuilder = require('./util/factory');

window.process = require('process');
window.global = window;
window.Buffer = Buffer;

var builder = CSVBuilder(params.baseUrl + '/tech-radar/data/index.csv');
builder.init().build();
