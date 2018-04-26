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
    var info = getRunners(name);
    
    if (info) {
        return info[0][info[1]];
    }
    
    return void(0);
}

function getRunners(name) {
    var list = RUNNERS,
        parsed = parseName(name);
    var access, position;
    
    if (parsed) {
        access = ':' + parsed[1];
        
        if (access in list) {
            position = parsed[0];
            return [list[access],
                    getPositionAccess(position),
                    position];
            
        }
    }
    
    return void(0);
}

function purgeRunners(name, after) {
    var info = getRunners(name);
    var runners, access;
    
    if (info) {
        access = info[1];
        
        switch (after) {
        case true:
            access = 'after';
            break;
        
        case false:
            access = 'before';
            break;
        
        case null:
        case undefined:
            access = false;
        }

        if (!access || access === 'before') {
            runners = info[0].before;
            runners.splice(0, runners.length);
        }
        
        if (!access || access === 'after') {
            runners = info[0].after;
            runners.splice(0, runners.length);
        }
        
        
    }
    
    return getModule();
}

function getPositionAccess(input) {
    return input === POSITION_BEFORE ? 'before' : 'after';
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
    constructor: BaseMiddleware,
    
    run: function (name, args, scope) {
        return run(this.access + name, args, scope);
    },
    
    register: function (name, handler) {
        register(this.access + name, handler);
        
        return this;
    },
    
    clear: function (name, after) {
        var access = this.access;
        
        if (!string(name)) {
            throw new Error(INVALID_NAME);
        }
        
        if (arguments.length > 1) {
            purgeRunners(access + name, after);
        }
        else {
            purgeRunners(access + name);
        }
        return this;
        
    }
};

export {
    setAsync,
    clearAsync
};

export function run(name, args, scope) {
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

export function register(name, handler) {
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
    
export function clearRunner(name, after) {
        
    if (!string(name)) {
        throw new Error(INVALID_NAME);
    }
    
    if (arguments.length > 1) {
        purgeRunners(name, after);
    }
    else {
        purgeRunners(name);
    }
    
    return getModule();
}

export function middleware(name) {
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
        Middleware.prototype = proto;
        
        list[access] = registered = new Middleware();
        
        return registered;
    }
    
    return list[access];
}



        

