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
    return toString.call(subject) === OBJECT_SIGNATURE &&
            subject instanceof OBJECT;
}

function ieIsNativeObject(subject) {
    return subject !== null &&
            subject !== void(0) &&
            toString.call(subject) === OBJECT_SIGNATURE &&
            subject instanceof OBJECT;
}

/** is string **/
function isString(subject, allowEmpty) {
    return typeof subject === 'string' &&
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
    
    nativeObject: validSignature ?
                    isNativeObject : ieIsNativeObject,
    
    string: isString,
    
    number: isNumber,
    
    scalar: isScalar,
    
    array: isArray,
    
    method: isFunction,
    
    date: isDate,
    
    regex: isRegExp,
    
    type: isType
};