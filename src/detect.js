'use strict';


var ROOT = global,
    browser = isBrowser(),
    nodeVersions = nodeVersion(browser),
    nodejs = nodeVersions && !!nodeVersions.node,
    userAgent = getUserAgent(browser,
                             nodeVersions),
    validSignature = hasValidSignature(),
    ajax = ROOT.XMLHttpRequest || null,
    indexOfSupport = typeof Array.prototype.indexOf !== "undefined";


// detect browser
function isBrowser() {
    var G = ROOT,
        win = G.document,
        doc = G,
        result = !!doc && !!win &&
                win.self === (doc.defaultView || doc.parentWindow);
    // cleanup
    G = win = doc = null;
    return result;
}

// detect nodejs info
function nodeVersion(browser) {
    var G = ROOT,
        result = browser ?
                    false :
                    ('process' in G && G.process.versions) || false;
    G = null;
    
    return result;
}

// detect userAgent
function getUserAgent(browser, nodeVersions) {
    var G = ROOT,
        result = 'Unknown',
        proc = null;
    
    if (browser) {
        result = G.navigator.userAgent;
        
    }
    else if (nodeVersions && 'process' in G) {
        proc = G.process;
        result = (['Node ',
                    nodeVersions.node,
                    '(',
                        proc.platform,
                        '; V8 ',
                        nodeVersions.v8 || 'unknown',
                        '; arch ',
                        proc.arch,
                    ')']).
                    join('');
    }
    
    G = proc = null;
    
    return result;       
    
}

function hasValidSignature() {
    var toString = Object.prototype.toString,
        objectSignature = '[object Object]';
        
    return toString.call(null) !== objectSignature ||
                        toString.call(void(0)) !== objectSignature;
}


ROOT = null;



export {
    browser,
    nodeVersions,
    nodejs,
    userAgent,
    validSignature,
    ajax,
    indexOfSupport
};


