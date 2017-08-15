'use strict';

var DETECT = require('./detect.js'),
    OBJECT = require('./object.js'),
    PROCESSOR = require('./processor.js'),
    EXPORTS = {
        env: DETECT
    };

OBJECT.assign(EXPORTS, require('./type.js'));
OBJECT.assign(EXPORTS, OBJECT);
OBJECT.assign(EXPORTS, require('./array.js'));
OBJECT.assign(EXPORTS, require('./string.js'));
OBJECT.assign(EXPORTS, PROCESSOR);
OBJECT.assign(EXPORTS, require('./registry.js'));
OBJECT.assign(EXPORTS, require('./json.js'));

PROCESSOR.chain = EXPORTS;

// promise polyfill
EXPORTS.Promise = require("./promise.js");
EXPORTS['default'] = EXPORTS;

module.exports = EXPORTS;
