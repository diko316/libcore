'use strict';

var O = Object.prototype,
    TYPE = require("./type.js"),
    OHasOwn = O.hasOwnProperty;
    
function empty() {
    
}

/**
 * Object property management
 */
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
    return target;
}

function applyProperties(value, name) {
    /*jshint validthis:true */
    this[0][name] = this[1][value];
}

function assignAll(target, source, defaults) {
    var onAssign = apply,
        eachProperty = each;
        
    if (defaults) {
        eachProperty(defaults, onAssign, target, false);
    }
    
    eachProperty(source, onAssign, target);
    
    return target;
}



function each(subject, handler, scope, hasown) {
    var hasOwn = OHasOwn,
        noChecking = hasown === false;
    var name;
    
    if (scope === void(0)) {
        scope = null;
    }
    
    for (name in subject) {
        if (noChecking || hasOwn.call(subject, name)) {
            if (handler.call(scope, subject[name], name, subject) === false) {
                break;
            }
        }
    }
    
    return subject;
}

function contains(subject, property) {
    return OHasOwn.call(subject, property);
}


function clear(subject) {
    each(subject, applyClear, null, true);
    return subject;
}

function applyClear() {
    delete arguments[2][arguments[1]];
}


/**
 * Object Classing
 */
function buildInstance(Class) {
    empty.prototype = Class.prototype;
    return new empty();
}

/**
 * Object comparison
 */
function compare(object1, object2) {
    return compareLookback(object1, object2, []);
}

function compareLookback(object1, object2, references) {
    var T = TYPE,
        isObject = T.object,
        isArray = T.array,
        isRegex = T.regex,
        isDate = T.date,
        me = compareLookback,
        depth = references.length;
    var name, len;
    
    switch (true) {
        
    // prioritize same object, same type comparison
    case object1 === object2: return true;
    
    // native object comparison
    case isObject(object1):
        if (!isObject(object2)) {
            return false;
        }
        
        // check if object is in references
        if (references.lastIndexOf(object1) !== -1 &&
            references.lastIndexOf(object2) !== -1) {
            return true;
        }
        
        // proceed
        references[depth] = object1;
        references[depth + 1] = object2;
        
        // compare properties
        for (name in object1) {
            if (!(name in object2) ||
                !me(object1[name], object2[name], references)) {
                return false;
            }
        }
        for (name in object2) {
            if (!(name in object1) ||
                !me(object1[name], object2[name], references)) {
                return false;
            }
        }
        
        references.length = depth;
        
        return true;
    
    // array comparison
    case isArray(object1):
        if (!isArray(object2)) {
            return false;
        }
        
        // check references
        if (references.lastIndexOf(object1) !== -1 &&
            references.lastIndexOf(object2) !== -1) {
            return true;
        }
        
        len = object1.length;
        
        if (len !== object2.length) {
            return false;
        }
        
        // proceed
        references[depth] = object1;
        references[depth + 1] = object2;
        
        for (; len--;) {
            if (!me(object1[len], object2[len], references)) {
                return false;
            }
        }
        
        references.length = depth;
        
        return true;
        
    
    // RegExp compare
    case isRegex(object1):
        return isRegex(object2) && object1.source === object2.source;
    
    // Date compare
    case isDate(object1):
        return isDate(object2) && object1.toString() === object2.toString();
    }
    
    return false;
}

/**
 * Object clone
 */
function clone(data, deep) {
    var T = TYPE,
        isNative = T.nativeObject(data);
    
    deep = deep === true;
    
    if (isNative || T.array(data)) {
        return deep ?
                    
                    (isNative ? cloneObject : cloneArray)(data, [], []) :
                    
                    (isNative ? assignAll({}, data) : data.slice(0));
    }
    
    if (T.regex(data)) {
        return new RegExp(data.source, data.flags);
    }
    else if (T.date(data)) {
        return new Date(data.getFullYear(),
                    data.getMonth(),
                    data.getDate(),
                    data.getHours(),
                    data.getMinutes(),
                    data.getSeconds(),
                    data.getMilliseconds());
    }
    
    return data;
}



function cloneObject(data, parents, cloned) {
    var depth = parents.length,
        T = TYPE,
        isNativeObject = T.nativeObject,
        isArray = T.array,
        ca = cloneArray,
        co = cloneObject,
        recreated = {};
    var name, value, index, isNative;
    
    parents[depth] = data;
    cloned[depth] = recreated;
    
    /*jshint forin:false */
    for (name in data) {
    
        value = data[name];
        isNative = isNativeObject(value);
        
        if (isNative || isArray(value)) {
            index = parents.lastIndexOf(value);
            value = index === -1 ?
                        (isNative ? co : ca)(value, parents, cloned) :
                        cloned[index];
        }
        else {
            value = clone(value, false);
        }
        recreated[name] = value;
    }
    
    parents.length = cloned.length = depth;
    
    return recreated;
}

function cloneArray(data, parents, cloned) {
    var depth = parents.length,
        T = TYPE,
        isNativeObject = T.nativeObject,
        isArray = T.array,
        ca = cloneArray,
        co = cloneObject,
        recreated = [],
        c = 0,
        l = data.length;
        
    var value, index, isNative;
    
    parents[depth] = data;
    cloned[depth] = recreated;
    
    for (; l--; c++) {
        value = data[c];
        isNative = isNativeObject(value);
        if (isNative || isArray(value)) {
            index = parents.lastIndexOf(value);
            value = index === -1 ?
                        (isNative ? co : ca)(value, parents, cloned) :
                        cloned[index];
        }
        else {
            value = clone(value, false);
        }
        recreated[c] = value;
    }
    
    parents.length = cloned.length = depth;
    
    return recreated;
    
}


module.exports = {
    each: each,
    assign: assign,
    rehash: assignProperties,
    contains: contains,
    buildInstance: buildInstance,
    clone: clone,
    compare: compare,
    clear: clear
};
