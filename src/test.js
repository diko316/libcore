'use strict';

var libcore = require("./index.js");

global.libcore = libcore;

module.exports = libcore;

require("./test/promise.js");
require("./test/object.js");