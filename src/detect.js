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
    CONSOLE = {},
    CONSOLE_NAMES = [
        'log',
        'info',
        'warn',
        'error',
        'assert'
    ],
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
    
var c, l;
    

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

function clearImmediate(id) {
    return clearTimeout(id);
}

// console polyfill so that IE 8 will not have fatal errors
if (!ROOT.console) {
    for (c = 0, l = CONSOLE_NAMES.length; l--; c++) {
        CONSOLE[CONSOLE_NAMES[c]] = empty;
    }
}

// set immediate polyfill
if (!(ROOT.setImmediate instanceof Function)) {
    ROOT.setImmediate = setImmediate;
    ROOT.clearImmediate = clearImmediate;
}


module.exports = EXPORTS;

ROOT = win = doc = null;
