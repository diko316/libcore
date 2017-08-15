'use strict';

var DETECTED = require('./detect.js'),
    validSignature = DETECTED.validSignature,
    OBJECT_SIGNATURE = '[object Object]',
    OBJECT = Object,
    O = OBJECT.prototype,
    toString = O.toString,
    isSignature = validSignature ?
                    objectSignature : ieObjectSignature;

/** is object signature **/
function objectSignature(subject) {
    return toString.call(subject);
}

function ieObjectSignature(subject) {
    if (subject === null) {
        return '[object Null]';
    }
    else if (subject === void(0)) {
        return '[object Undefined]';
    }
    return toString.call(subject);
}

function isType(subject, type) {
    return isSignature(subject) === type;
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
    return (typeof subject === 'string' ||
            O.toString.call(subject) === '[object String]') &&

            (allowEmpty === true || subject.length !== 0);
}

/** is number **/
function isNumber(subject) {
    return typeof subject === 'number' && isFinite(subject);
}

/** is scalar **/
function isScalar(subject) {
    switch (typeof subject) {
    case 'number': return isFinite(subject);
    
    case 'boolean':
    case 'string': return true;
    }
    return false;
}

/** is function **/
function isFunction(subject) {
    return toString.call(subject) === '[object Function]';
}

/** is array **/
function isArray(subject) {
    return toString.call(subject) === '[object Array]';
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