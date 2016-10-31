'use strict';

var TYPE = require('./type.js'),
    NAME_RE = /^((before|after)\:)?([a-zA-Z0-9\_\-\.]+)$/,
    POSITION_BEFORE = 1,
    POSITION_AFTER = 2,
    RUNNERS = {},
    EXPORTS = {
        register: set,
        run: run
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
    var position;
    
    if (match) {
        
        position = match[1] && match[2] === 'before' ?
                    POSITION_BEFORE :
                    POSITION_AFTER;
                    
        return [position, match[3]];
        
    }
    
    return void(0);
    
}


module.exports = EXPORTS.chain = EXPORTS;
