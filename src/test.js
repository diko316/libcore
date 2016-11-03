'use strict';

var libcore = require("./index.js");

global.libcore = libcore;

module.exports = libcore;

require("./test/registry.js");
require("./test/promise.js");
require("./test/object.js");
require("./test/middleware.js");