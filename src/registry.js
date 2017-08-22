'use strict';

var TYPE = require("./type.js"),
    OBJECT = require("./object.js"),
    JSON_OP = require("./json.js"),
    ERROR_NAME = 'Invalid [name] parameter.',
    ERROR_PATH = 'Invalid [path] parameter.';

function create() {
    return new Registry();
}

function isIndex(name) {
    var T = TYPE;
    
    switch (T.signature(name)) {
    case T.STRING:
    case T.NUMBER: return true;
    }
    return false;
}

function Registry() {
    this.data = {};
}

Registry.prototype = {
    constructor: Registry,
    
    onApply: function (value) {
        OBJECT.assign(this.data, value);
    },
    
    onSet: function (name, value) {
        this.data[name] = value;
    },
    
    get: function (name) {
        var list = this.data;
        
        if (!isIndex(name)) {
            throw new Error(ERROR_NAME);
        }
        
        if (OBJECT.contains(list, name)) {
            return list[name];
        }
        
        return void(0);
    },
    
    set: function (name, value) {
        var T = TYPE;
        
        switch (T.signature(name)) {
        case T.OBJECT:
        case T.ARRAY:
            this.onApply(name);
            break;
        
        case T.STRING:
        case T.NUMBER:
            this.onSet(name, value);
            break;
            
        default:
            throw new Error(ERROR_NAME);
        }
        
        return this;
    },
    
    unset: function (name) {
        var list = this.data;
        
        if (!isIndex(name)) {
            throw new Error(ERROR_NAME);
        }
        
        if (OBJECT.contains(list, name)) {
            delete list[name];
        }
        
        return this;
    },
    
    find: function (path) {
        if (!TYPE.string(path)) {
            throw new Error(ERROR_PATH);
        }
        
        return JSON_OP.jsonFind(path, this.data);
    },
    
    insert: function (path) {
        if (!TYPE.string(path)) {
            throw new Error(ERROR_PATH);
        }
        
        return JSON_OP.jsonFill(path, this.data, true);
    },
    
    remove: function (path) {
        if (!TYPE.string(path)) {
            throw new Error(ERROR_PATH);
        }
        
        return JSON_OP.jsonUnset(path, this.data);
    },
    
    exists: function (name) {
        if (!isIndex(name)) {
            throw new Error(ERROR_NAME);
        }
        
        return OBJECT.contains(this.data, name);
    },
    
    apply: function(value) {
        var T = TYPE;
        
        switch (T.signature(value)) {
        case T.OBJECT:
        case T.ARRAY:
            this.onApply(value);
            return this;
        
        default:
            throw new Error("Invalid [value] parameter");
        }
        
    },
    
    clear: function () {
        OBJECT.clear(this.data);
        return this;
    },
    
    clone: function () {
        var list = this.data;
        return OBJECT.clone(list, true);
    }
};

module.exports = {
    createRegistry: create
};

