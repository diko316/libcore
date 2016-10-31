'use strict';

var DETECT = require('./detect.js'),
    TYPE = require('./type.js'),
    OBJECT = require('./object.js'),
    ARRAY = require('./array.js'),
    PROCESSOR = require('./processor.js'),
    EXPORTS = {
        env: DETECT
    };

OBJECT.assign(EXPORTS, TYPE);
OBJECT.assign(EXPORTS, OBJECT);
OBJECT.assign(EXPORTS, ARRAY);
OBJECT.assign(EXPORTS, PROCESSOR);

TYPE.chain =
    OBJECT.chain =
    ARRAY.chain =
    PROCESSOR.chain = EXPORTS;

// promise polyfill
EXPORTS.Promise = require("./promise.js");

module.exports = EXPORTS;
