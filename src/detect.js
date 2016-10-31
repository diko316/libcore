'use strict';

var ROOT = global,
    doc = ROOT.document,
    win = ROOT.window,
    O = Object.prototype,
    toString = O.toString,
    A = Array.prototype,
    objectSignature = '[object Object]',
    BROWSER = !!doc && !!win &&
                win.self === (doc.defaultView || doc.parentWindow),
    EXPORTS = {
        browser: BROWSER,
        userAgent: BROWSER ?
                        ROOT.navigator.userAgent : nodeUserAgent(),
                        
        validSignature: toString.call(null) !== objectSignature ||
                        toString.call(void(0)) !== objectSignature,
                        
        
        indexOfSupport: 'indexOf' in A
    };
    
    

function nodeUserAgent() {
    var PROCESS = require("process"),
        VERSIONS = PROCESS.versions,
        str = ['Node ',
                VERSIONS.node,
                '(',
                    PROCESS.platform,
                    '; V8 ',
                    VERSIONS.v8 || 'unknown',
                    '; arch ',
                    PROCESS.arch,
                ')'];

    return str.join('');
}

function empty() {
    
}

// console polyfill so that IE 8 will not have fatal errors
if (!ROOT.console) {
    ROOT.console = {
        log: empty,
        warn: empty
    };
}


module.exports = EXPORTS;

ROOT = win = doc = null;
