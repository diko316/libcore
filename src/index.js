'use strict';

var DETECT = require('./detect.js'),
    TYPE = require('./type.js'),
    OBJECT = require('./object.js'),
    ARRAY = require('./array.js'),
    EXPORTS = {
        env: DETECT
    };

OBJECT.assign(EXPORTS, TYPE);
OBJECT.assign(EXPORTS, OBJECT);
OBJECT.assign(EXPORTS, ARRAY);

module.exports = EXPORTS;
