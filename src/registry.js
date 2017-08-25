'use strict';


import {
            string,
            signature,
            
            STRING,
            NUMBER,
            OBJECT,
            ARRAY

        } from "./type.js";
        
import {
            assign,
            contains,
            clear,
            clone
        } from "./object.js";
        
import {
            jsonFind,
            jsonFill,
            jsonUnset,
            jsonExists
        } from "./json.js";


var ERROR_NAME = 'Invalid [name] parameter.',
    ERROR_PATH = 'Invalid [path] parameter.';

function create() {
    return new Registry();
}

function isIndex(name) {
    switch (signature(name)) {
    case STRING:
    case NUMBER: return true;
    }
    return false;
}

function Registry() {
    this.data = {};
}

Registry.prototype = {
    constructor: Registry,
    
    onApply: function (value) {
        assign(this.data, value, true);
    },
    
    onSet: function (name, value) {
        this.data[name] = value;
    },
    
    get: function (name) {
        var list = this.data;
        
        if (!isIndex(name)) {
            throw new Error(ERROR_NAME);
        }
        
        if (contains(list, name)) {
            return list[name];
        }
        
        return void(0);
    },
    
    set: function (name, value) {
        switch (signature(name)) {
        case OBJECT:
        case ARRAY:
            this.onApply(name);
            break;
        
        case STRING:
        case NUMBER:
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
        
        if (contains(list, name)) {
            delete list[name];
        }
        
        return this;
    },
    
    find: function (path) {
        if (!string(path)) {
            throw new Error(ERROR_PATH);
        }
        
        return jsonFind(path, this.data);
    },
    
    insert: function (path, value) {
        if (!string(path)) {
            throw new Error(ERROR_PATH);
        }
        
        jsonFill(path, this.data, value, true);
        
        return this;
    
    },
    
    remove: function (path) {
        if (!string(path)) {
            throw new Error(ERROR_PATH);
        }
        
        jsonUnset(path, this.data);
        
        return this;
    },
    
    exists: function (name) {
        if (!isIndex(name)) {
            throw new Error(ERROR_NAME);
        }
        
        return contains(this.data, name);
    },
    
    pathExists: function (path) {
        if (!string(path)) {
            throw new Error(ERROR_PATH);
        }
        
        return jsonExists(path, this.data);
    },
    
    assign: function(value) {
        switch (signature(value)) {
        case OBJECT:
        case ARRAY:
            this.onApply(value);
            return this;
        
        default:
            throw new Error("Invalid [value] parameter");
        }
        
    },
    
    clear: function () {
        clear(this.data);
        return this;
    },
    
    clone: function () {
        var list = this.data;
        return clone(list, true);
    }
    
};


export default create;


