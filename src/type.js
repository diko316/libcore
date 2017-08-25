'use strict';

import { validSignature } from "./detect.js";


var OBJECT_SIGNATURE = '[object Object]',
    ARRAY_SIGNATURE = '[object Array]',
    NULL_SIGNATURE = '[object Null]',
    UNDEFINED_SIGNATURE = '[object Undefined]',
    NUMBER_SIGNATURE = '[object Number]',
    STRING_SIGNATURE = '[object String]',
    BOOLEAN_SIGNATURE = '[object Boolean]',
    METHOD_SIGNATURE = '[object Function]',
    DATE_SIGNATURE = '[object Date]',
    REGEX_SIGNATURE = '[object RegExp]',
    STRING = 'string',
    NUMBER = 'number',
    BOOLEAN = 'boolean',
    OBJECT = Object,
    O = OBJECT.prototype,
    toString = O.toString,
    isSignature = objectSignature;

/** is object signature **/
function objectSignature(subject) {
    if (subject === undefined) {
        return UNDEFINED_SIGNATURE;
    }
    
    if (subject === null ||
        (typeof subject === NUMBER && !isFinite(subject))) {
        return NULL_SIGNATURE;
    }
    
    return toString.call(subject);
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
    return toString.call(subject) === METHOD_SIGNATURE;
}

/** is array **/
function isArray(subject, notEmpty) {
    return toString.call(subject) === ARRAY_SIGNATURE &&
            (notEmpty !== true || subject.length !== 0);
}

/** is date **/
function isDate(subject) {
    return toString.call(subject) === DATE_SIGNATURE;
}

/** is regexp **/
function isRegExp(subject) {
    return toString.call(subject) === REGEX_SIGNATURE;
}


function isThenable(subject) {
    // filter non-thenable scalar natives
    switch (subject) {
    case undefined:
    case null:
    case true:
    case false:
    case NaN: return false;
    }
    // filter scalar
    switch (objectSignature(subject)) {
    case NUMBER_SIGNATURE:
    case STRING_SIGNATURE:
    case BOOLEAN_SIGNATURE: return false;
    }
    
    return 'then' in subject && isFunction(subject.then);
}

function isIterable(subject) {
    
    // filter non-iterable scalar natives
    switch (subject) {
    case undefined:
    case null:
    case true:
    case false:
    case NaN: return false;
    }
    
    // try signature
    switch (objectSignature(subject)) {
    case NUMBER_SIGNATURE:
    case BOOLEAN_SIGNATURE:
        // bogus js engines provides readonly "length" property to functions
    case METHOD_SIGNATURE: return false;

    case STRING_SIGNATURE:
    case ARRAY_SIGNATURE: return true;
    }
    
    return 'length' in subject && isNumber(subject.length);
}


export let object = validSignature ?
                        isObject : ieIsObject;

export {
        OBJECT_SIGNATURE as OBJECT,
        ARRAY_SIGNATURE as ARRAY,
        NULL_SIGNATURE as NULL,
        UNDEFINED_SIGNATURE as UNDEFINED,
        NUMBER_SIGNATURE as NUMBER,
        STRING_SIGNATURE as STRING,
        BOOLEAN_SIGNATURE as BOOLEAN,
        METHOD_SIGNATURE as METHOD,
        METHOD_SIGNATURE as FUNCTION,
        DATE_SIGNATURE as DATE,
        REGEX_SIGNATURE as REGEX,
        
        isSignature as signature,
        
        isNativeObject as nativeObject,
        
        isString as string,
        
        isNumber as number,
        
        isScalar as scalar,
        
        isArray as array,
        
        isFunction as method,
        
        isDate as date,
        
        isRegExp as regex,
        
        isType as type,
        
        isThenable as thenable,
        
        isIterable as iterable 
    };