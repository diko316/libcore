'use strict';

var ROOT = global,
    doc = ROOT.document,
    win = ROOT.window,
    toString = Object.prototype.toString,
    objectSignature = '[object Object]',
    BROWSER = !!doc && !!win &&
                win.self === (doc.defaultView || doc.parentWindow),
    NODEVERSIONS = BROWSER ? false :
                    (function () {
                        return ('process' in global &&
                                global.process.versions) || false;
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
        indexOfSupport: 'indexOf' in Array.prototype
    };
    
var c, l;

function nodeUserAgent() {
    var PROCESS = 'process' in global ? global.process : null,
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

// console polyfill so that IE 8 will not have fatal errors
//      for not openning dev tool window
if (!ROOT.console) {
    for (c = 0, l = CONSOLE_NAMES.length; l--; c++) {
        CONSOLE[CONSOLE_NAMES[c]] = empty;
    }
}

module.exports = EXPORTS;

ROOT = win = doc = null;
