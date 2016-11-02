'use strict';

var TYPE = require('./type.js'),
    G = global,
    NAME_RE = /^(([^\.]+\.)?(before|after)\:)?([a-zA-Z0-9\_\-\.]+)$/,
    POSITION_BEFORE = 1,
    POSITION_AFTER = 2,
    RUNNERS = {},
    NAMESPACES = {},
    EXPORTS = {
        register: set,
        run: run,
        middlewares: middlewareNamespace,
        setAsync: G.setImmediate,
        clearAsync: G.clearImmediate
    };
    

    
function set(name, handler) {
    var parsed = parseName(name),
        list = RUNNERS;
    var access, items;
    
    if (parsed && handler instanceof Function) {
        name = parsed[1];
        access = ':' + name;
        if (!(access in list)) {
            list[access] = {
                name: name,
                before: [],
                after: []
            };
        }
        
        items = list[access][getPositionAccess(parsed[0])];
        
        items[items.length] = handler;
    }
    
    return EXPORTS.chain;
}


function run(name, args, scope) {
    var runners = get(name);
    var c, l;

    if (runners) {
        if (typeof scope === 'undefined') {
            scope = null;
        }
        if (!(args instanceof Array)) {
            args = [];
        }
        
        for (c = -1, l = runners.length; l--;) {
            runners[++c].apply(scope, args);
        }
        
    }
    
    return EXPORTS.chain;
}

function get(name) {
    var list = RUNNERS,
        parsed = parseName(name);
    var access;
    
    if (parsed) {
        access = ':' + parsed[1];
        
        if (access in list) {
            return list[access][getPositionAccess(parsed[0])];
            
        }
    }
    
    return void(0);
}

function getPositionAccess(input) {
    return  input === POSITION_BEFORE ? 'before' : 'after';
}

function parseName(name) {
    var match = TYPE.string(name) && name.match(NAME_RE);
    var position, prefix;
    
    if (match) {
        prefix = match[1];
        position = prefix && match[3] === 'before' ?
                    POSITION_BEFORE :
                    POSITION_AFTER;
                    
        return [position, (prefix ? match[2] : '') + match[3]];
        
    }
    
    return void(0);
    
}

function middlewareNamespace(name) {
    var list = NAMESPACES;
    var access;
 
    if (TYPE.string(name)) {
        access = name + '.';
        if (!(list in access)) {
            list[access] = {
                                run: createRunInNamespace(access),
                                register: createRegisterInNamespace(access)
                        };
        }
        return list[access];
    }
    return void(0);
}

function createRunInNamespace(ns) {
    function nsRun(name, args, scope) {
        return run(ns + name, args, scope);
    }
    return nsRun;
}

function createRegisterInNamespace(ns) {
    function nsRun(name, handler) {
        return set(ns + name, handler);
    }
    return nsRun;
}


function timeoutAsync(handler) {
    return setTimeout(handler, 1);
}

function clearTimeoutAsync(id) {
    return clearTimeout(id);
}

// set immediate polyfill
if (!(G.setImmediate instanceof Function)) {
    EXPORTS.setAsync = timeoutAsync;
    EXPORTS.clearAsync = clearTimeoutAsync;
}
module.exports = EXPORTS.chain = EXPORTS;
