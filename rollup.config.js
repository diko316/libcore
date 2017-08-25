'use strict';

import {
            name as packageName,
            main as dest,
            module as moduleName
            
        } from "./package.json";
        
import configure from "./config/base.js";

let meta = {
        name: packageName,
        target: dest,
        moduleTarget: moduleName
    },
    config = {};

// base setup
configure(config, meta);

// setup by env
switch (process.env.BUILD_MODE) {
case 'unit-test':
    require("./config/unit-test.js")(config, meta);
    break;
default:
    require("./config/devel.js")(config, meta);
}


export default config;