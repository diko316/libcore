'use strict';

var APPEND_MIN_RE = /(\.js)$/i;

function augment(config) {
    var output = config.output,
        dest = output.file;
    
    // rename ".js" suffix to "min.js"
    output.file = dest.replace(APPEND_MIN_RE, ".min.js");
    
    config.plugins.
        push(require('rollup-plugin-uglify')({
        }));
    
}

module.exports = augment;

