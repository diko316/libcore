'use strict';

var O = Object.prototype,
    EXPORTS = {
        each: each,
        assign: assign,
        rehash: assignProperties,
        contains: contains,
        buildInstance: buildInstance
    };
function empty() {
    
}

function assign(target, source, defaults) {
    var onAssign = apply,
        eachProperty = each;
        
    if (defaults) {
        eachProperty(defaults, onAssign, target);
    }
    
    eachProperty(source, onAssign, target);
    
    return target;
}

function apply(value, name) {
    /*jshint validthis:true */
    this[name] = value;
}

function assignProperties(target, source, access) {
    var context = [target, source];
    each(access, applyProperties, context);
    context = context[0] = context[1] =  null;
    return EXPORTS;
}

function applyProperties(value, name) {
    /*jshint validthis:true */
    this[0][name] = this[1][value];
}


function each(subject, handler, scope) {
    var hasOwn = O.hasOwnProperty;
    var name;
    
    if (scope === void(0)) {
        scope = null;
    }
    
    for (name in subject) {
        if (hasOwn.call(subject, name)) {
            if (handler.call(scope, subject[name], name, subject) === false) {
                break;
            }
        }
    }
    
    return subject;
}

function contains(subject, property) {
    return O.hasOwnProperty.call(subject, property);
}

function buildInstance(Class) {
    empty.prototype = Class.prototype;
    return new empty();
}

module.exports = EXPORTS;
