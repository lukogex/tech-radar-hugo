require('./common');
// require('./assets/images/radar/radar_legend.png');

const CSVBuilder = require('./util/factory');

var builder = CSVBuilder('tech-radar/data.csv');
builder.init().build();
