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
    NODEVERSIONS = BROWSER ? false :
                    (function () {
                        return require("process").versions || false;
                    })(),
                    
    EXPORTS = {
        browser: BROWSER,
        nodejs: NODEVERSIONS && !!NODEVERSIONS.node,
        userAgent: BROWSER ?
                        ROOT.navigator.userAgent :
                        NODEVERSIONS ?
                            nodeUserAgent() : 'Unknown',
                        
        validSignature: toString.call(null) !== objectSignature ||
                        toString.call(void(0)) !== objectSignature,
                        
        ajax: ROOT.XMLHttpRequest,
        indexOfSupport: 'indexOf' in A
    };
    
    

function nodeUserAgent() {
    var PROCESS = require("process"),
        VERSIONS = NODEVERSIONS,
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

function setImmediate(handler) {
    return setTimeout(handler, 1);
}

// console polyfill so that IE 8 will not have fatal errors
if (!ROOT.console) {
    ROOT.console = {
        log: empty,
        warn: empty
    };
}

// set immediate polyfill
if (!(ROOT.setImmediate instanceof Function)) {
    ROOT.setImmediate = setImmediate;
}


module.exports = EXPORTS;

ROOT = win = doc = null;
