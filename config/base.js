'use strict';

import resolve from 'rollup-plugin-node-resolve';

import commonjs from 'rollup-plugin-commonjs';

let plugins = [
        resolve({
            // use "jsnext:main" if possible
            // see https://github.com/rollup/rollup/wiki/jsnext:main
            jsnext: true,  // Default: false
      
            // use "main" field or index.js, even if it's not an ES6 module
            // (needs to be converted from CommonJS to ES6
            // see https://github.com/rollup/rollup-plugin-commonjs
            main: true  // Default: true

        }),
        
        commonjs({
            // non-CommonJS modules will be ignored, but you can also
            // specifically include/exclude files
            include: 'node_modules/**',  // Default: undefined
            //exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],  // Default: undefined
            // these values can also be regular expressions
            // include: /node_modules/
      
            // search for files other than .js files (must already
            // be transpiled by a previous plugin!)
            //extensions: [ '.js', '.coffee' ],  // Default: [ '.js' ]
      
            // if true then uses of `global` won't be dealt with by this plugin
            //ignoreGlobal: false,  // Default: false
      
            // if false then skip sourceMap generation for CommonJS modules
            sourceMap: false,  // Default: true
      
            // explicitly specify unresolvable named exports
            // (see below for more details)
            //namedExports: { './module.js': ['foo', 'bar' ] },  // Default: undefined
      
            // sometimes you have to leave require statements
            // unconverted. Pass an array containing the IDs
            // or a `id => boolean` function. Only use this
            // option if you know what you're doing!
            //ignore: [ 'conditional-runtime-dependency' ]
        })
    ];

export default
    function configure(config, meta) {
        
        config.entry = 'src/index.js';
        
        config.plugins = plugins;
        
        config.targets = [{
            dest: meta.target,
            format: 'umd',
            moduleName: meta.name,
            sourceMap: true
        }];
        
        return config;
    }
