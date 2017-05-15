'use strict';

var TYPE = require('./type.js'),
    //DETECT = require('./detect.js'),
    G = global,
    // 1 = namespace, 4 = position, 5 = item
    NAME_RE = /^(([^\.]+\.)*)((before|after)\:)?([a-zA-Z0-9\_\-\.]+)$/,
    POSITION_BEFORE = 1,
    POSITION_AFTER = 2,
    RUNNERS = {},
    NAMESPACES = {},
    NATIVE_SET_IMMEDIATE = !!G.setImmediate,
    EXPORTS = {
        register: set,
        run: run,
        middleware: middlewareNamespace,
        setAsync: NATIVE_SET_IMMEDIATE ?
                        nativeSetImmediate : timeoutAsync,
        clearAsync: NATIVE_SET_IMMEDIATE ?
                        nativeClearImmediate : clearTimeoutAsync
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
    var position, namespace;
    
    
    
    
    if (match) {
        namespace = match[1];
        position = match[4] === 'before' ? POSITION_BEFORE : POSITION_AFTER;
        //console.log('parsed ', name, ' = ', [position, (namespace || '') + match[5]]);
        return [position, (namespace || '') + match[5]];
        
    }
    
    return void(0);
    
}

function middlewareNamespace(name) {
    var list = NAMESPACES;
    var access, register, run;
 
    if (TYPE.string(name)) {
        access = name + '.';
        if (!(access in list)) {
            run = createRunInNamespace(access);
            register = createRegisterInNamespace(access);
            list[access] = register.chain = run.chain = {
                                                        run: run,
                                                        register: register
                                                    };
        }
        return list[access];
    }
    return void(0);
}

function createRunInNamespace(ns) {
    function nsRun(name, args, scope) {
        run(ns + name, args, scope);
        return nsRun.chain;
    }
    return nsRun;
}

function createRegisterInNamespace(ns) {
    function nsRegister(name, handler) {
        set(ns + name, handler);
        return nsRegister.chain;
    }
    return nsRegister;
}


function timeoutAsync(handler) {
    return G.setTimeout(handler, 1);
}

function clearTimeoutAsync(id) {
    return G.clearTimeout(id);
}

function nativeSetImmediate (fn) {
    return G.setImmediate(fn);
}

function nativeClearImmediate(id) {
    return G.clearImmediate(id);
}


module.exports = EXPORTS.chain = EXPORTS;
