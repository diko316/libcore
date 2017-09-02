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
    toString = O.toString;

/** is object **/
function w3cIsObject(subject) {
    return toString.call(subject) === OBJECT_SIGNATURE;
}

function ieIsObject(subject) {
    return subject !== null &&
            subject !== void(0) &&
            toString.call(subject) === OBJECT_SIGNATURE;
}

export let object = validSignature ?
                        w3cIsObject : ieIsObject;

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
        REGEX_SIGNATURE as REGEX

    };

/** is object signature **/
export
    function signature(subject) {
        if (subject === undefined) {
            return UNDEFINED_SIGNATURE;
        }
        
        if (subject === null ||
            (typeof subject === NUMBER && !isFinite(subject))) {
            return NULL_SIGNATURE;
        }
        
        return toString.call(subject);
    }

/** is native object **/
export
    function nativeObject(subject) {
        var O = OBJECT;
        var constructor, result;
        
        if (signature(subject) === OBJECT_SIGNATURE) {
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
export
    function string(subject, allowEmpty) {
        return (typeof subject === STRING ||
                O.toString.call(subject) === STRING_SIGNATURE) &&
    
                (allowEmpty === true || subject.length !== 0);
    }
    
/** is number **/
export
    function number(subject) {
        return typeof subject === NUMBER && isFinite(subject);
    }
    
/** is scalar **/
export
    function scalar(subject) {
        switch (typeof subject) {
        case NUMBER: return isFinite(subject);
        case BOOLEAN:
        case STRING: return true;
        }
        return false;
    }
    
/** is array **/
export
    function array(subject, notEmpty) {
        return toString.call(subject) === ARRAY_SIGNATURE &&
                (notEmpty !== true || subject.length !== 0);
    }
    
/** is function **/
export
    function method(subject) {
        return toString.call(subject) === METHOD_SIGNATURE;
    }



/** is date **/
export
    function date(subject) {
        return toString.call(subject) === DATE_SIGNATURE;
    }

/** is regexp **/
export
    function regex(subject) {
        return toString.call(subject) === REGEX_SIGNATURE;
    }

/** is promise or thenable **/
export
    function thenable(subject) {
        // filter non-thenable scalar natives
        switch (subject) {
        case undefined:
        case null:
        case true:
        case false:
        case NaN: return false;
        }
        // filter scalar
        switch (signature(subject)) {
        case NUMBER_SIGNATURE:
        case STRING_SIGNATURE:
        case BOOLEAN_SIGNATURE: return false;
        }
        
        return 'then' in subject && method(subject.then);
    }
    
/** is array-like iterable **/
export
    function iterable(subject) {
        var len;
        
        // filter non-iterable scalar natives
        switch (subject) {
        case undefined:
        case null:
        case true:
        case false:
        case NaN: return false;
        }
        
        // try signature
        switch (signature(subject)) {
        case NUMBER_SIGNATURE:
        case BOOLEAN_SIGNATURE:
            // bogus js engines provides readonly "length" property to functions
        case METHOD_SIGNATURE: return false;
    
        case STRING_SIGNATURE:
        case ARRAY_SIGNATURE: return true;
        }
    
        return 'length' in subject &&
                number(len = subject.length) &&
                len > -1;
    }
    
export
    function type(subject, isType) {
        var len;
        switch (isType) {
        case "scalar":
            switch (signature(subject)) {
            case STRING_SIGNATURE:
            case NUMBER_SIGNATURE:
            case BOOLEAN_SIGNATURE: return true;
            }
            return false;
        
        case "regexp":
        case "regex":
            isType = "RegExp";
            break;
        
        case "method":
            isType = "Function";
            break;
        
        case "native":
        case "nativeObject":
            return nativeObject(subject);
        }
        
        if (typeof isType === STRING) {
            len = isType.length;
            if (len) {
                return signature(subject) === '[object ' +
                                            isType.charAt(0).toUpperCase() +
                                            isType.substring(1, len) +
                                            ']';
            }
        }
        return false;
    }