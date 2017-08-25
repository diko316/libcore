'use strict';

let plugins = [
        require('rollup-plugin-node-globals')(),
        require('rollup-plugin-node-builtins')(),
        require('rollup-plugin-node-resolve')({
            // use "jsnext:main" if possible
            // see https://github.com/rollup/rollup/wiki/jsnext:main
            jsnext: true,  // Default: false
      
            // use "main" field or index.js, even if it's not an ES6 module
            // (needs to be converted from CommonJS to ES6
            // see https://github.com/rollup/rollup-plugin-commonjs
            main: true  // Default: true

        }),
        
        require('rollup-plugin-commonjs')({
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
        }),
        require('rollup-plugin-buble')()
    ];
    
function configure(config, meta) {
        
        var umd = meta.umd = {
                    file: meta.target,
                    format: 'umd',
                    name: meta.name,
                    exports: 'named',
                    sourcemap: true
                },
            es = meta.es = {
                file: meta.esTarget,
                format: 'es',
                name: meta.name,
                exports: 'named',
                sourcemap: true
            };
        
        config.input = 'src/index.js';
        
        config.plugins = plugins;
        
        config.output = [umd, es];

        return config;
    }

module.exports = configure;
    
