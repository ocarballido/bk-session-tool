const path = require('path');

const aliases = {
    '@assets':    'src/assets/',
    '@atoms':     'src/components/atoms/',
    '@molecules': 'src/components/molecules/',
    '@organisms': 'src/components/organisms/',
    '@scss':      'src/scss/',
    '@utiities':  'src/utilities/'
};

module.exports = Object.entries(aliases).reduce((obj, entry) => {
    obj[entry[0]] = path.resolve(__dirname, entry[1]);
    return obj;
}, {});