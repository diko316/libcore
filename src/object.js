'use strict';

/**
 * @external libcore
 */

import {
            object,
            string,
            number,
            array,
            regex,
            date,
            nativeObject,
            signature as objectSignature,
            REGEX,
            DATE,
            ARRAY,
            OBJECT,
            METHOD
            
        } from "./type.js";

//import * as STRING from "./string.js";

var Obj = Object,
    O = Obj.prototype,
    EACH = typeof Obj.getOwnPropertyNames === 'function' ?
                es5each : es3each,
    //STRING = require("./string.js"),
    OHasOwn = O.hasOwnProperty,
    //NUMERIC_RE = /^[0-9]*$/,
    ARRAY_INDEX_RE = /^[1-9][0-9]*|0$/,
    EXPORTS;
    

function empty() {
    
}

function isValidObject(target) {
    var signature = objectSignature(target);
    
    switch (signature) {
    case REGEX:
    case DATE:
    case ARRAY:
    case OBJECT:
    case METHOD: return signature;
    }
    return false;
}

/**
 * Assign properties of source Object to target Object
 * @alias module:libcore.assign
 * @param {Object} target - the target object
 * @param {Object} source - the source object containing properties
 *                          to be assigned to target object
 * @param {Object} [defaults] - object containing default properties
 *                          which will be assigned first to
 *                          target before source.
 * @param {Boolean} [ownedOnly] - only assign properties owned by "source"
 * @returns {Object} target object from first parameter
 */


function apply(value, name) {
    /*jshint validthis:true */
    this[name] = value;
}

/**
 * Relocate and rename properties of source Object into target Object.
 * 
 * @name libcore.rehash
 * @function
 * @param {Object|Function} target - the target object
 * @param {Object|Function} source - the source object containing properties
 *                                  to be relocated.
 * @param {Object} access - the rename map object containing "renamed property"
 *                          as map object's property name, and
 *                          "source property name" as map object's
 *                          property value. (e.g. { "newname": "from source" })
 * @returns {Object} target object from first parameter
 */


function applyProperties(value, name) {
    /*jshint validthis:true */
    var target = this;
    target[0][name] = target[1][value];
    target = null;
}

function assignAll(target, source, defaults) {
    var onAssign = apply,
        eachProperty = EACH;
        
    if (defaults) {
        eachProperty(defaults, onAssign, target, false);
    }
    
    eachProperty(source, onAssign, target);
    
    return target;
}


/**
 * Iterates all iteratable property of an object calling "handler" parameter on
 *      each iteration.
 * @name libcore.each
 * @function
 * @param {Object} subject
 * @param {Function} handler - the callback of each iteration of
 *                          "subject" object's property.
 * @param {*} [scope] - "this" object to use inside the "handler" parameter
 * @param {boolean} [hasown] - performs checking to only include
 *                          source object property that is overridden
 *                          (Object.protototype.hasOwnProperty() returns true)
 *                          when this parameter is set to true.
 * @returns {Object} The subject parameter
 */
function es3each(subject, handler, scope, hasown) {
    var hasOwn = OHasOwn,
        noChecking = hasown === false;
    var name;
    
    if (!isValidObject(subject)) {
        throw new Error("Invalid [subject] parameter.");
    }
    
    if (arguments.length > 3 && typeof hasown !== 'boolean') {
        throw new Error("Invalid [hasown] hasOwnProperty parameter.");
    }
    
    if (scope === void(0)) {
        scope = null;
    }
    
    for (name in subject) {
        if ((noChecking || hasOwn.call(subject, name)) &&
            handler.call(scope, subject[name], name, subject) === false) {
            break;
        }
    }
    
    return subject;
}

function es5each(subject, handler, scope, hasown) {
    var hasOwn = OHasOwn,
        noChecking = hasown === false;
    var names, name, c, l;
    
    if (!isValidObject(subject)) {
        throw new Error("Invalid [subject] parameter.");
    }
    
    if (arguments.length > 3 && typeof hasown !== 'boolean') {
        throw new Error("Invalid [hasown] hasOwnProperty parameter.");
    }
    
    if (scope === void(0)) {
        scope = null;
    }
    
    names = Obj.getOwnPropertyNames(subject);
    for (c = -1, l = names.length; l--;) {
        name = names[++c];
        if ((noChecking || hasOwn.call(subject, name)) &&
            handler.call(scope, subject[name], name, subject) === false) {
            break;
        }
    }
    
    return subject;
}

/**
 * Checks if "subject" Object contains overridden property.
 *      The same symantics of Object.prototype.hasOwnProperty.
 *      
 * @name libcore.contains
 * @function
 * @param {Object} subject
 * @param {String} property - Property Name to inspect
 * @returns {boolean} True if subject Object contains property and dirty.
 *                      False if subject Object's property do not exist or not
 *                      dirty.
 */




/**
 * Clears Object properties. This method only deletes overridden properties and
 *      will not fill "undefined" to non-owned properties from its prototype.
 * @name libcore.clear
 * @function
 * @param {Object} subject
 * @returns {Object} subject parameter.
 */

function applyClear() {
    delete arguments[2][arguments[1]];
}

/**
 * Assign properties of source Object to target Object only if property do not
 *      exist or not overridden from the target Object.
 * @name libcore.fillin
 * @function
 * @param {Object} target - the target object
 * @param {Object} source - the source object containing properties
 *                          to be assigned to target object
 * @param {boolean} [hasown] - performs checking to only include
 *                          source object property that is overridden
 *                          (Object.protototype.hasOwnProperty() returns true)
 *                          when this parameter is set to true.
 * @returns {Object} subject parameter.
 */
function fillin(target, source, hasown) {
    if (!isValidObject(target)) {
        throw new Error("Invalid [target] parameter");
    }
    EACH(source, applyFillin, target, hasown !== false);
    return target;
}

function applyFillin(value, name) {
    /* jshint validthis:true */
    var target = this;
    if (!contains(target, name)) {
        target[name] = value;
    }
    target = null;
}

/**
 * Builds instance of "Class" parameter without executing its constructor.
 * @name libcore.instantiate
 * @function
 * @param {Function} Class
 * @param {Object} overrides
 * @returns {Object} Instance created from Class without executing
 *                      its constructor.
 */


/**
 * Deep compares two scalar, array, object, regex and date objects
 * @name libcore.compare
 * @function
 * @param {*} object1
 * @param {*} object2
 * @returns {boolean} True if scalar, regex, date, object properties, or array
 *                      items of object1 is identical to object2.
 */


function compareLookback(object1, object2, references) {
    var isObject = object,
        isArray = array,
        isRegex = regex,
        isDate = date,
        onCompare = onEachCompareObject,
        each = EACH,
        me = compareLookback,
        depth = references.length;
    var len, context;
    
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
        
        context = [object2, references, true];
        each(object1, onCompare, context);
        if (!context[2]) {
            return false;
        }
        
        context[0] = object1;
        each(object2, onCompare, context);
        if (!context[2]) {
            return false;
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

function onEachCompareObject(value, name) {
    /* jshint validthis:true */
    var context = this,
        target = context[0],
        result = name in target ?
                    compareLookback(value, target[name], context[1]) :
                    false;
    context[2] = result;
    
    return result;
}

/**
 * Clones scalar, array, object, regex or date objects
 * @name libcore.clone
 * @function
 * @param {*} data - scalar, array, object, regex or date object to clone.
 * @param {boolean} [deep] - apply deep clone to object properties or
 *                          array items.
 * @returns {*} Cloned object based from data
 */



function cloneObject(data, parents, cloned) {
    var depth = parents.length,
        recreated = {},
        context = [recreated,
                   parents,
                   cloned];
    
    parents[depth] = data;
    cloned[depth] = recreated;
    
    EACH(data, onEachClonedProperty, context);
    
    parents.length = cloned.length = depth;
    
    return recreated;
}

function cloneArray(data, parents, cloned) {
    var depth = parents.length,
        onProperty = onEachClonedProperty,
        recreated = [],
        context = [recreated,
                   parents,
                   cloned],
        c = 0,
        l = data.length;
    
    parents[depth] = data;
    cloned[depth] = recreated;
    
    for (; l--; c++) {
        onProperty.call(context,
                        data[c],
                        c,
                        data);
    }
    
    parents.length = cloned.length = depth;
    
    return recreated;
}

function onEachClonedProperty(value, name) {
    var /* jshint validthis:true */
        context = this,
        isNative = nativeObject(value),
        parents = context[1],
        cloned = context[2];
    var index;
    
    if (isNative || array(value)) {
        index = parents.lastIndexOf(value);
        value = index === -1 ?
                    (isNative ?
                        cloneObject :
                        cloneArray)(value, parents, cloned) :
                    
                    cloned[index];
    }
    else {
        value = clone(value, false);
    }
    
    context[0][name] = value;
}

function onMaxNumericIndex(value, name, context) {
    if (ARRAY_INDEX_RE.test(name)) {
        context[0] = Math.max(1 * name, context[0]);
    }
}



export { EACH as each };

export
    function assign(target, source, defaults, ownedOnly) {
        var onAssign = apply,
            is = isValidObject,
            eachProperty = EACH,
            len = arguments.length;
        
        if (!is(target)) {
            throw new Error("Invalid [target] parameter.");
        }
        
        if (!is(source)) {
            throw new Error("Invalid [source] parameter.");
        }
        
        if (typeof defaults === 'boolean') {
            ownedOnly = defaults;
            len = 2;
        }
        else {
            ownedOnly = ownedOnly !== false;
        }
        
        if (is(defaults)) {
            eachProperty(defaults, onAssign, target, ownedOnly);
        }
        else if (len > 2) {
            throw new Error("Invalid [defaults] parameter.");
        }
        
        eachProperty(source, onAssign, target, ownedOnly);
        
        return target;
    }

export 
    function rehash(target, source, access) {
        var is = isValidObject,
            context = [target, source];
            
        if (!is(target)) {
            throw new Error("Invalid [target] parameter.");
        }
        
        if (!is(source)) {
            throw new Error("Invalid [source] parameter.");
        }
        
        if (!object(access)) {
            throw new Error("Invalid [access] parameter.");
        }
        
        EACH(access, applyProperties, context);
        context = context[0] = context[1] =  null;
        return target;
    }

export
    function contains(subject, property) {
    
        if (!string(property) && !number(property)) {
            throw new Error("Invalid [property] parameter.");
        }
        
        return OHasOwn.call(subject, property);
    }

export
    function instantiate(Class, overrides) {
        empty.prototype = Class.prototype;
        
        if (object(overrides)) {
            return assign(new empty(), overrides);
        }
        return new empty();
    }
    
export
    function clone(data, deep) {
        var isNative = nativeObject(data);
        
        deep = deep === true;
        
        if (isNative || array(data)) {
            return deep ?
                        
                        (isNative ? cloneObject : cloneArray)(data, [], []) :
                        
                        (isNative ? assignAll({}, data) : data.slice(0));
        }
        
        if (regex(data)) {
            return new RegExp(data.source, data.flags);
        }
        else if (date(data)) {
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
    
export
    function compare(object1, object2) {
        return compareLookback(object1, object2, []);
    }
    
export
    function fillin(target, source, hasown) {
        if (!isValidObject(target)) {
            throw new Error("Invalid [target] parameter");
        }
        EACH(source, applyFillin, target, hasown !== false);
        return target;
    }

export
    function clear(subject) {
        EACH(subject, applyClear, null, true);
        return subject;
    }
    
export
    function maxObjectIndex(subject) {
        var context;
        
        if (array(subject)) {
            return subject.length - 1;
        }
        
        if (isValidObject(subject)) {
            
            context = [-1];
            EACH(subject, onMaxNumericIndex, context);
            return context[0];
        }
        return false;
    }

//export default {
//        each: EACH,
//        assign: assign,
//        rehash: rehash,
//        contains: contains,
//        instantiate: instantiate,
//        clone: clone,
//        compare: compare,
//        fillin: fillin,
//        clear: clear,
//        maxObjectIndex: maxObjectIndex
//    };
