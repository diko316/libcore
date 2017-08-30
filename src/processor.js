'use strict';

import {
            string,
            method
        } from "./type.js";

import { getModule } from "./chain.js";


var G = global,
    // 1 = namespace, 4 = position, 5 = item
    NAME_RE = /^(([^\.]+\.)*)((before|after)\:)?([a-zA-Z0-9\_\-\.]+)$/,
    POSITION_BEFORE = 1,
    POSITION_AFTER = 2,
    RUNNERS = {},
    NAMESPACES = {},
    INVALID_HANDLER = 'Invalid [handler] parameter.',
    NATIVE_SET_IMMEDIATE = !!G.setImmediate,
    setAsync = NATIVE_SET_IMMEDIATE ?
                    nativeSetImmediate : timeoutAsync,
    clearAsync = NATIVE_SET_IMMEDIATE ?
                    nativeClearImmediate : clearTimeoutAsync;

    





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
    var match = string(name) && name.match(NAME_RE);
    var position, namespace;
    
    
    
    
    if (match) {
        namespace = match[1];
        position = match[4] === 'before' ? POSITION_BEFORE : POSITION_AFTER;
        //console.log('parsed ', name, ' = ', [position, (namespace || '') + match[5]]);
        return [position, (namespace || '') + match[5]];
        
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
    function nsRegister(name, handler) {
        register(ns + name, handler);
        return nsRegister.chain;
    }
    return nsRegister;
}


function timeoutAsync(handler) {
    if (!method(handler)) {
        throw new Error(INVALID_HANDLER);
    }
    return G.setTimeout(handler, 1);
}

function clearTimeoutAsync(id) {
    try {
        G.clearTimeout(id);
    }
    catch (e) {}
    return getModule();
}

function nativeSetImmediate (handler) {
    if (!method(handler)) {
        throw new Error(INVALID_HANDLER);
    }
    return G.setImmediate(handler);
}

function nativeClearImmediate(id) {
    try {
        G.clearImmediate(id);
    }
    catch (e) {}
    return getModule();
}

export
    {
        setAsync,
        clearAsync
    };

export
    function run(name, args, scope) {
        var runners = get(name),
            returned = true;
        var c, l;
    
        if (runners) {
            
            if (typeof scope === 'undefined') {
                scope = null;
            }
            if (!(args instanceof Array)) {
                args = [];
            }
            
            for (c = -1, l = runners.length; l--;) {
                if (runners[++c].apply(scope, args) === false) {
                    returned = false;
                }
            }
            
        }
        
        return returned;
    }

export
    function register(name, handler) {
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
        
        return getModule();
    }

export
    function middleware(name) {
        var list = NAMESPACES;
        var access, register, run;
     
        if (string(name)) {
            access = name + '.';
            if (!(access in list)) {
                run = createRunInNamespace(access);
                register = createRegisterInNamespace(access);
                list[access] = register.chain = {
                                                run: run,
                                                register: register
                                            };
            }
            return list[access];
        }
        return void(0);
    }



        

