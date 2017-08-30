'use strict';


var CHAIN = null;

export
    function use(chain) {
        CHAIN = chain;
    }
    
export
    function getModule() {
        return CHAIN;
    }