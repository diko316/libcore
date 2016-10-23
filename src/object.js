'use strict';

var O = Object.prototype,
    EXPORTS = {
        each: each,
        assign: assign
    };
    
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

function each(subject, handler, scope) {
    var hasOwn = O.hasOwnProperty;
    var name;
    
    if (scope === void(0)) {
        scope = null;
    }
    
    for (name in subject) {
        if (hasOwn.call(subject, name)) {
            if (handler.call(scope, subject[name], name) === false) {
                break;
            }
        }
    }
    
    return subject;
}

module.exports = EXPORTS;
