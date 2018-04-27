'use strict';

var browsersync = require('rollup-plugin-browsersync');

function augment(config) {
    var output = config.output = {};
    
    config.input = 'src/demo.js';
    output.file = 'dist/demo.js';
    output.format = 'umd';
    output.name = 'demo';
    output.exports = 'named';
    output.sourcemap = 'inline';
    
    delete config.targets;


    config.plugins.
        push(browsersync({
                server: {
                    baseDir: "dist",
                    index: "index.html"
                },
                port: 3000,
                open: false,
                files: ["dist/**/*.html",
                        "dist/**/*.js"]
            }));
}

module.exports = augment;

