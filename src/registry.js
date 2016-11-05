'use strict';

var TYPE = require("./type.js"),
    OBJECT = require("./object.js");

function create() {
    return new Registry();
}

function Registry() {
    this.data = {};
}

Registry.prototype = {
    constructor: Registry,
    get: function (name) {
        var list = this.data;
        
        if (OBJECT.contains(list, name)) {
            return list[name];
        }
        
        return void(0);
    },
    
    set: function (name, value) {
        var list = this.data;
        
        if (TYPE.string(name) || TYPE.number(name)) {
            list[name] = value;
        }
        
        return this;
    },
    
    unset: function (name) {
        var list = this.data;
        
        if (OBJECT.contains(list, name)) {
            delete list[name];
        }
        
        return this;
    },
    
    exists: function (name) {
        return OBJECT.contains(this.data, name);
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

