'use strict';

var DETECTED = require('./detect.js'),
    validSignature = DETECTED.validSignature,
    OBJECT_SIGNATURE = '[object Object]',
    NULL_SIGNATURE = '[object Null]',
    NUMBER_SIGNATURE = '[object Number]',
    STRING_SIGNATURE = '[object String]',
    BOOLEAN_SIGNATURE = '[object Boolean]',
    STRING = 'string',
    NUMBER = 'number',
    BOOLEAN = 'boolean',
    OBJECT = Object,
    O = OBJECT.prototype,
    toString = O.toString,
    isSignature = validSignature ?
                    objectSignature : ieObjectSignature;

/** is object signature **/
function objectSignature(subject) {
    if (typeof subject === NUMBER && !isFinite(subject)) {
        return NULL_SIGNATURE;
    }
    return toString.call(subject);
}

function ieObjectSignature(subject) {
    switch (true) {
    case subject === null:
    case typeof subject === NUMBER && !isFinite(subject):
        return NULL_SIGNATURE;
    
    case subject === undefined:
        return '[object Undefined]';
    
    default:
        return toString.call(subject);
    }
}

function isType(subject, type) {
    var len;
    switch (type) {
    case "scalar":
        switch (isSignature(subject)) {
        case STRING_SIGNATURE:
        case NUMBER_SIGNATURE:
        case BOOLEAN_SIGNATURE: return true;
        }
        return false;
    
    case "regexp":
    case "regex":
        type = "RegExp";
        break;
    
    case "method":
        type = "Function";
        break;
    
    case "native":
    case "nativeObject":
        return isNativeObject(subject);
    }
    if (typeof type === STRING) {
        len = type.length;
        if (len) {
            return isSignature(subject) === '[object ' +
                                        type.charAt(0).toUpperCase() +
                                        type.substring(1, len) +
                                        ']';
        }
    }
    return false;
}

/** is object **/
function isObject(subject) {
    return toString.call(subject) === OBJECT_SIGNATURE;
}

function ieIsObject(subject) {
    return subject !== null &&
            subject !== void(0) &&
            toString.call(subject) === OBJECT_SIGNATURE;
}

function isNativeObject(subject) {
    var O = OBJECT;
    var constructor, result;
    
    if (isSignature(subject) === OBJECT_SIGNATURE) {
        constructor = subject.constructor;
        
        // check constructor
        if (O.hasOwnProperty.call(subject, 'constructor')) {
            delete subject.constructor;
            result = subject.constructor === O;
            subject.constructor = constructor;
            return result;
        }
        return constructor === O;
    }
    
    return false;
}

/** is string **/
function isString(subject, allowEmpty) {
    return (typeof subject === STRING ||
            O.toString.call(subject) === STRING_SIGNATURE) &&

            (allowEmpty === true || subject.length !== 0);
}

/** is number **/
function isNumber(subject) {
    return typeof subject === NUMBER && isFinite(subject);
}

/** is scalar **/
function isScalar(subject) {
    switch (typeof subject) {
    case NUMBER: return isFinite(subject);
    case BOOLEAN:
    case STRING: return true;
    }
    return false;
}

/** is function **/
function isFunction(subject) {
    return toString.call(subject) === '[object Function]';
}

/** is array **/
function isArray(subject, notEmpty) {
    return toString.call(subject) === '[object Array]' &&
            (notEmpty !== true || subject.length !== 0);
}

/** is date **/
function isDate(subject) {
    return toString.call(subject) === '[object Date]';
}

/** is regexp **/
function isRegExp(subject) {
    return toString.call(subject) === '[object RegExp]';
}


module.exports = {
    signature: isSignature,
    
    object: validSignature ?
                isObject : ieIsObject,
    
    nativeObject: isNativeObject,
    
    string: isString,
    
    number: isNumber,
    
    scalar: isScalar,
    
    array: isArray,
    
    method: isFunction,
    
    date: isDate,
    
    regex: isRegExp,
    
    type: isType
};