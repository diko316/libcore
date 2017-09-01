'use strict';

import {
            string,
            method,
            iterable
        } from "./type.js";

import { getModule } from "./chain.js";


var G = global,
    // 1 = namespace, 4 = position, 5 = item
    NAME_RE = /^(([^\.]+\.)*)((before|after)\:)?([a-zA-Z0-9\_\-\.]+)$/,
    POSITION_BEFORE = 1,
    POSITION_AFTER = 2,
    RUNNERS = {},
    NAMESPACES = {},
    INVALID_NAME = 'Invalid [name] parameter.',
    INVALID_HANDLER = 'Invalid [handler] parameter.',
    NATIVE_SET_IMMEDIATE = !!G.setImmediate,
    setAsync = NATIVE_SET_IMMEDIATE ?
                    nativeSetImmediate : timeoutAsync,
    clearAsync = NATIVE_SET_IMMEDIATE ?
                    nativeClearImmediate : clearTimeoutAsync;
function empty() {
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
    var match = string(name) && name.match(NAME_RE);
    var position, namespace;
    
    
    
    
    if (match) {
        namespace = match[1];
        position = match[4] === 'before' ? POSITION_BEFORE : POSITION_AFTER;
        return [position, (namespace || '') + match[5]];
        
    }
    
    return void(0);
    
}

function applyNamespaceCallback(access, registered) {
    function nsRun(name, args, scope) {
        return run(access + name, args, scope);
    }
    
    registered.constructor.prototype.run = nsRun;
    
    return nsRun;
}

function applyNamespaceRegister(access, registered) {
    function nsRegister(name, handler) {
        register(access + name, handler);
        return registered;
    }
    
    registered.constructor.prototype.register = nsRegister;
    
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

function BaseMiddleware() {
}

BaseMiddleware.prototype = {
    constructor: BaseMiddleware
};

export
    {
        setAsync,
        clearAsync
    };

export
    function run(name, args, scope) {
        var c, l, runners, result;
        
        if (!string(name)) {
            throw new Error(INVALID_NAME);
        }
        
        runners = get(name);
        
        if (runners) {
            
            if (typeof scope === 'undefined') {
                scope = null;
            }
            
            args = iterable(args) ?
                    Array.prototype.slice.call(args, 0) : [];
            
            for (c = -1, l = runners.length; l--;) {
                result = runners[++c].apply(scope, args);
                if (result !== undefined) {
                    args = [result];
                }
            }
            
            args.splice(0, args.length);
            
            return result;
        }
        
        return undefined;
    }

export
    function register(name, handler) {
        var list = RUNNERS;
        var access, items, parsed;
        
        if (!string(name)) {
            throw new Error(INVALID_NAME);
        }
        
        parsed = parseName(name);
        
        if (!method(handler)) {
            throw new Error(INVALID_HANDLER);
        }
        
        if (parsed) {
            
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
        var access, registered, proto;
        
        function Middleware() {
            BaseMiddleware.apply(this, arguments);
        }
        
        if (!string(name)) {
            throw new Error(INVALID_NAME);
        }

        access = name + '.';
        if (!(access in list)) {
            empty.prototype = BaseMiddleware.prototype;
            proto = new empty(access);
            proto.constructor = Middleware;
            proto.access = access;
            Middleware.prototype = Middleware;
            
            list[access] = registered = new Middleware();
            
            applyNamespaceCallback(access, registered);
            applyNamespaceRegister(access, registered);
            
            return registered;
        }
        
        return list[access];
    }



        

