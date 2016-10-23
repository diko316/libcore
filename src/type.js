'use strict';

var DETECTED = require('./detect.js'),
    validSignature = DETECTED.validSignature,
    O = Object.prototype,
    toString = O.toString;

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

/** is object **/
function isObject(subject) {
    return toString.call(subject) === '[object Object]';
}

function ieIsObject(subject) {
    return subject !== null &&
            subject !== void(0) &&
            typeof subject === 'object' &&
            subject instanceof O.constructor;
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

/** is date **/
function isDate(subject) {
    return subject instanceof Date;
}


module.exports = {
    signature: validSignature ?
                    objectSignature : ieObjectSignature,
    
    object: validSignature ?
                isObject : ieIsObject,
    
    string: isString,
    
    number: isNumber,
    
    scalar: isScalar,
    
    date: isDate
};