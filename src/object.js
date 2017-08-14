'use strict';

/**
 * @external libcore
 */

var Obj = Object,
    O = Obj.prototype,
    EACH = typeof Obj.getOwnPropertyNames === 'function' ?
                es5each : es3each,
    TYPE = require("./type.js"),
    STRING = require("./string.js"),
    OHasOwn = O.hasOwnProperty,
    NUMERIC_RE = /^[0-9]*$/;
    

function empty() {
    
}

function isValidObject(target) {
    var type = TYPE;
    return type.object(target) || type.method(target);
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
 * @returns {Object} target object from first parameter
 */
function assign(target, source, defaults) {
    var onAssign = apply,
        is = isValidObject,
        eachProperty = EACH;
    
    if (!is(target)) {
        throw new Error("Invalid [target] parameter.");
    }
    
    if (!is(source)) {
        throw new Error("Invalid [source] parameter.");
    }
    
    if (is(defaults)) {
        eachProperty(defaults, onAssign, target);
    }
    else if (arguments.length > 2) {
        throw new Error("Invalid [defaults] parameter.");
    }
    
    eachProperty(source, onAssign, target);
    
    return target;
}

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
function assignProperties(target, source, access) {
    var is = isValidObject,
        context = [target, source];
        
    if (!is(target)) {
        throw new Error("Invalid [target] parameter.");
    }
    
    if (!is(source)) {
        throw new Error("Invalid [source] parameter.");
    }
    
    if (!TYPE.object(access)) {
        throw new Error("Invalid [access] parameter.");
    }
    
    EACH(access, applyProperties, context);
    context = context[0] = context[1] =  null;
    return target;
}

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
function contains(subject, property) {
    var type = TYPE;
    
    if (!type.string(property) && !type.number(property)) {
        throw new Error("Invalid [property] parameter.");
    }
    
    return OHasOwn.call(subject, property);
}



/**
 * Clears Object properties. This method only deletes overridden properties and
 *      will not fill "undefined" to non-owned properties from its prototype.
 * @name libcore.clear
 * @function
 * @param {Object} subject
 * @returns {Object} subject parameter.
 */
function clear(subject) {
    EACH(subject, applyClear, null, true);
    return subject;
}



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
    EACH(source, applyFillin, target, hasown);
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

function jsonFill(root, path, value, overwrite) {
    var dimensions = STRING.jsonPath(path),
        type = TYPE,
        object = type.object,
        array = type.array,
        has = contains,
        apply = assign,
        numericRe = NUMERIC_RE,
        parent = root,
        name = path;
    var numeric, item, c, l, property, temp, isArray;
    
    if (dimensions) {
        name = dimensions[0];
        dimensions.splice(0, 1);
            
        for (c = -1, l = dimensions.length; l--;) {
            item = dimensions[++c];
            numeric = numericRe.test(item);
            
            // replace name
            //if (!name && array(parent)) {
            //    name = parent.length.toString(10);
            //}
            
            // finalize property
            if (has(parent, name)) {
                property = parent[name];
                isArray = array(property);
                
                // replace property into object or array
                if (!isArray && !object(property)) {
                    if (numeric) {
                        property = [property];
                    }
                    else {
                        temp = property;
                        property = {};
                        property[""] = temp;
                    }
                }
                // change property to object to support "named" property
                else if (isArray && !numeric) {
                    property = apply({}, property);
                    delete property.length;
                }
            }
            else {
                property = numeric ? [] : {};
            }
            
            parent = parent[name] = property;
            
            // finalize name
            if (!item) {
                if (array(parent)) {
                    item = parent.length;
                }
                else if (0 in parent) {
                    item = '0';
                }
            }
            name = item;
        }

    }

    // if not overwrite, then fill-in value in array or object
    if (overwrite !== true && has(parent, name)) {
        property = parent[name];
        
        // append
        if (array(property)) {
            parent = property;
            name = parent.length;
        }
        else {
            parent = parent[name] = [property];
            name = 1;
        }
    }
    
    parent[name] = value;
    
    parent = value = property = temp = null;
    
    return root;
    
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
function buildInstance(Class, overrides) {
    empty.prototype = Class.prototype;
    
    if (TYPE.object(overrides)) {
        return assign(new empty(), overrides);
    }
    return new empty();
}

/**
 * Deep compares two scalar, array, object, regex and date objects
 * @name libcore.compare
 * @function
 * @param {*} object1
 * @param {*} object2
 * @returns {boolean} True if scalar, regex, date, object properties, or array
 *                      items of object1 is identical to object2.
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
 * Clones scalar, array, object, regex or date objects
 * @name libcore.clone
 * @function
 * @param {*} data - scalar, array, object, regex or date object to clone.
 * @param {boolean} [deep] - apply deep clone to object properties or
 *                          array items.
 * @returns {*} Cloned object based from data
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



//function cloneObjectOld(data, parents, cloned) {
//    var depth = parents.length,
//        T = TYPE,
//        isNativeObject = T.nativeObject,
//        isArray = T.array,
//        ca = cloneArray,
//        co = cloneObject,
//        recreated = {};
//    var name, value, index, isNative;
//    
//    parents[depth] = data;
//    cloned[depth] = recreated;
//    
//    /*jshint forin:false */
//    for (name in data) {
//    
//        value = data[name];
//        isNative = isNativeObject(value);
//        
//        if (isNative || isArray(value)) {
//            index = parents.lastIndexOf(value);
//            value = index === -1 ?
//                        (isNative ? co : ca)(value, parents, cloned) :
//                        cloned[index];
//        }
//        else {
//            value = clone(value, false);
//        }
//        recreated[name] = value;
//    }
//    
//    parents.length = cloned.length = depth;
//    
//    return recreated;
//}

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

function onEachClonedProperty(value, name) {
    var T = TYPE,
        /*jshint validthis:true */
        context = this,
        isNative = T.nativeObject(value),
        parents = context[1],
        cloned = context[2];
    var index;
    
    if (isNative || T.array(value)) {
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
    each: EACH,
    assign: assign,
    rehash: assignProperties,
    contains: contains,
    instantiate: buildInstance,
    clone: clone,
    compare: compare,
    fillin: fillin,
    urlFill: jsonFill,
    clear: clear
};
