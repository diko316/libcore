(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("libcore", [], factory);
	else if(typeof exports === 'object')
		exports["libcore"] = factory();
	else
		root["libcore"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DETECTED = __webpack_require__(3),
    validSignature = DETECTED.validSignature,
    OBJECT_SIGNATURE = '[object Object]',
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


module.exports = {
    OBJECT: OBJECT_SIGNATURE,
    ARRAY: ARRAY_SIGNATURE,
    NULL: NULL_SIGNATURE,
    UNDEFINED: UNDEFINED_SIGNATURE,
    NUMBER: NUMBER_SIGNATURE,
    STRING: STRING_SIGNATURE,
    BOOLEAN: BOOLEAN_SIGNATURE,
    METHOD: METHOD_SIGNATURE,
    FUNCTION: METHOD_SIGNATURE,
    DATE: DATE_SIGNATURE,
    REGEX: REGEX_SIGNATURE,
    
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
    
    type: isType,
    
    thenable: isThenable,
    
    iterable: isIterable
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @external libcore
 */

var Obj = Object,
    O = Obj.prototype,
    EACH = typeof Obj.getOwnPropertyNames === 'function' ?
                es5each : es3each,
    TYPE = __webpack_require__(0),
    STRING = __webpack_require__(6),
    OHasOwn = O.hasOwnProperty,
    NUMERIC_RE = /^[0-9]*$/,
    ARRAY_INDEX_RE = /^[1-9][0-9]*|0$/;
    

function empty() {
    
}

function isValidObject(target) {
    var T = TYPE,
        signature = T.signature(target);
    
    switch (signature) {
    case T.REGEX:
    case T.DATE:
    case T.ARRAY:
    case T.OBJECT:
    case T.METHOD: return signature;
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
    var T = TYPE,
        /* jshint validthis:true */
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

function onMaxNumericIndex(value, name, context) {
    if (ARRAY_INDEX_RE.test(name)) {
        context[0] = Math.max(1 * name, context[0]);
    }
}

function maxNumericIndex(subject) {
    var context;
    
    if (TYPE.array(subject)) {
        return subject.length - 1;
    }
    
    if (isValidObject(subject)) {
        
        context = [-1];
        EACH(subject, onMaxNumericIndex, context);
        return context[0];
    }
    return false;
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
    //urlFill: jsonFill,
    clear: clear,
    maxObjectIndex: maxNumericIndex
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var ROOT = global,
    doc = ROOT.document,
    win = ROOT.window,
    toString = Object.prototype.toString,
    objectSignature = '[object Object]',
    BROWSER = !!doc && !!win &&
                win.self === (doc.defaultView || doc.parentWindow),
    NODEVERSIONS = BROWSER ? false :
                    (function () {
                        return ('process' in global &&
                                global.process.versions) || false;
                    })(),
    CONSOLE = {},
    CONSOLE_NAMES = [
        'log',
        'info',
        'warn',
        'error',
        'assert'
    ],
    EXPORTS = {
        browser: BROWSER,
        nodejs: NODEVERSIONS && !!NODEVERSIONS.node,
        userAgent: BROWSER ?
                        ROOT.navigator.userAgent :
                        NODEVERSIONS ?
                            nodeUserAgent() : 'Unknown',
                        
        validSignature: toString.call(null) !== objectSignature ||
                        toString.call(void(0)) !== objectSignature,
                        
        ajax: ROOT.XMLHttpRequest,
        indexOfSupport: 'indexOf' in Array.prototype
    };
    
var c, l;

function nodeUserAgent() {
    var PROCESS = 'process' in global ? global.process : null,
        VERSIONS = NODEVERSIONS,
        str = ['Node ',
                VERSIONS.node,
                '(',
                    PROCESS.platform,
                    '; V8 ',
                    VERSIONS.v8 || 'unknown',
                    '; arch ',
                    PROCESS.arch,
                ')'];

    return str.join('');
}

function empty() {
    
}

// console polyfill so that IE 8 will not have fatal errors
//      for not openning dev tool window
if (!ROOT.console) {
    for (c = 0, l = CONSOLE_NAMES.length; l--; c++) {
        CONSOLE[CONSOLE_NAMES[c]] = empty;
    }
}

module.exports = EXPORTS;

ROOT = win = doc = null;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TYPE = __webpack_require__(0),
    OBJECT = __webpack_require__(1),
    NUMERIC_RE = /^([1-9][0-9]*|0)$/,
    ARRAY_INDEX_RE = /^([1-9][0-9]*|0|)$/,
    ERROR_NATIVE_OBJECT = "Root [subject] requires native Object to accept " +
                            "non-numeric property name.",
    ERROR_PATH_INVALID = 'Invalid [path] parameter.',
    START = "start",
    START_ESCAPED = "start_escaped",
    QUEUE = "queue",
    END = "end",
    END_EMPTY = "end_empty",
    STATE = {
        "start": {
            "[": "bracket_start",
            "'": "any_sq_start",
            '"': "any_dq_start",
            "default": "any",
            "\\": "any_escape"
        },
        
        "bracket_start": {
            "]": "property_end",
            "'": "sq_start",
            '"': "dq_start",
            "default": "bracket_any"
        },
        
        "any_sq_start": {
            "'": "property_end",
            "\\": "any_sq_escape",
            "default": "any_sq"
        },
        
        "any_sq": {
            "'": "property_end",
            "\\": "any_sq_escape",
            "default": "any_sq"
        },
        
        "any_sq_escape": {
            "default": "any_sq"
        },
        
        "any_dq_start": {
            '"': "property_end",
            "\\": "any_dq_escape",
            "default": "any_dq"
        },
        
        "any_dq": {
            '"': "property_end",
            "\\": "any_dq_escape",
            "default": "any_dq"
        },
        
        "any_dq_escape": {
            "default": "any_dq"
        },
        
        "sq_start": {
            "'": "bracket_end",
            "\\": "sq_escape",
            "default": "sq"
        },
        "sq": {
            "'": "bracket_end",
            "\\": "sq_escape",
            "default": "sq"
        },
        "sq_escape": {
            "default": "sq"
        },
        "dq_start": {
            '"': "bracket_end",
            "\\": "dq_escape",
            "default": "dq"
        },
        "dq": {
            '"': "bracket_end",
            "\\": "dq_escape",
            "default": "dq"
        },
        "dq_escape": {
            "default": "dq"
        },
        
        "bracket_any": {
            "]": "property_end",
            "\\": "bracket_any_escape",
            "default": "bracket_any"
        },
        
        "bracket_any_escape": {
            "default": "bracket_any"
        },
        
        "bracket_end": {
            "]": "property_end"
        },
        
        "any": {
            ".": "start",
            "\\": "any_escape",
            "[": "bracket_start",
            "default": "any"
        },
        "any_escape": {
            "default": "any"
        },
        
        "property_end": {
            "[": "bracket_start",
            ".": "start"
        }
    },
    STATE_ACTION = {
        "start": {
            "any": START,
            "any_escape": START_ESCAPED
        },
        
        "any_sq_start": {
            "any_sq": START,
            "property_end": END_EMPTY
            
        },
        
        "any_sq": {
            "any_sq": QUEUE,
            "property_end": END
        },
        
        "any_sq_escape": {
            "any_sq": QUEUE
        },
        
        "any_dq_start": {
            "any_dq": START,
            "property_end": END_EMPTY
            
        },
        
        "any_dq": {
            "any_dq": QUEUE,
            "property_end": END
        },
        
        "any_dq_escape": {
            "any_dq": QUEUE
        },
        
        "any": {
            "any": QUEUE,
            "start": END,
            "bracket_start": END
        },
        "any_escape": {
            "any": QUEUE,
            "bracket_start": END,
            "start": START
        },
        
        "bracket_start": {
            "bracket_any": START,
            "property_end": END_EMPTY
        },
        
        "bracket_any": {
            "bracket_any": QUEUE,
            "property_end": END
        },
        
        "bracket_any_escape": {
            "bracket_any": QUEUE
        },
        
        "sq_start": {
            "sq": START,
            "bracket_end": END_EMPTY
        },
        "sq": {
            "sq": QUEUE,
            "bracket_end": END
        },
        "sq_escape": {
            "sq": QUEUE
        },
        
        "dq_start": {
            "dq": START,
            "bracket_end": END_EMPTY
        },
        "dq": {
            "dq": QUEUE,
            "bracket_end": END
        },
        "dq_escape": {
            "dq": QUEUE
        }
    };


function eachPath(path, callback, arg1, arg2, arg3, arg4, arg5) {
    var T = TYPE,
        map = STATE,
        action = STATE_ACTION,
        start = START,
        start_escaped = START_ESCAPED,
        queue = QUEUE,
        end = END,
        end_empty = END_EMPTY,
        DEFAULT = "default";
    var c, l, chr, state, stateObject, items, len, last,
        next, actionObject, buffer, bl, buffered, pending,
        start_queue, restart;
    
    if (!T.string(path)) {
        throw new Error(ERROR_PATH_INVALID);
    }
    
    if (!T.method(callback)) {
        throw new Error("Invalid [callback] parameter");
    }
    
    buffer = bl = false;
    state = "start";
    stateObject = map.start;
    
    items = [];
    len = pending = 0;
    
    for (c = -1, l = path.length; l--;) {
        buffered = false;
        chr = path.charAt(++c);
        last = !l;
        
        // find next state
        if (chr in stateObject) {
            next = stateObject[chr];
        }
        else if (DEFAULT in stateObject) {
            next = stateObject[DEFAULT];
        }
        else {
            return null;
        }
        
        // check for actions
        if (state in action) {
            actionObject = action[state];
            if (next in actionObject) {
                start_queue = restart = false;
                
                switch (actionObject[next]) {
                
                case start:
                    start_queue = true;
                /* falls through */
                case start_escaped:
                        if (buffer !== false) {
                            return false;
                        }
                        
                        if (start_queue && !last) {
                            buffer = [chr];
                            bl = 1;
                        }
                        else {
                            buffer = [];
                            bl = 0;
                        }
                        
                        // exit if not last
                        if (!last) {
                            break;
                        }
                /* falls through */
                case queue:
                        if (buffer === false) {
                            return false;
                        }
                        buffer[bl++] = chr;
                        // exit if not last
                        if (!last) {
                            break;
                        }
                /* falls through */
                case end:
                        if (buffer === false) {
                            return false;
                        }
                        items[len++] = buffer.join('');
                        buffer = bl = false;
                    break;
                case end_empty:
                        if (buffer !== false) {
                            return false;
                        }
                        items[len++] = '';
                        
                        if (path === 'offset.') {
                            console.log("created empty!", path, " = ", items);
                        }
                    break;
                }
            }
        }
        
        
        state = next;
        stateObject = map[state];
        
        if (pending < len - 1) {
            if (path === 'offset.') {
                console.log(path, ' = ', items, " pending ", pending, " len: ", len);
                console.log("    calling: ", items[pending]);
            }
            if (callback(items[pending++],
                        false,
                        arg1,
                        arg2,
                        arg3,
                        arg4,
                        arg5) === false) {
                return true;
            }
        }
        // last
        if (last) {
            if (path === 'offset.') {
                console.log(path, ' = ', items, " pending ", pending, " len: ", len);
            }
            l = len - pending;
            for (; l--;) {
                if (path === 'offset.') {
                    console.log("    last calling: ", items[pending]);
                }
                if (callback(items[pending++],
                            !l,
                            arg1,
                            arg2,
                            arg3,
                            arg4,
                            arg5) === false) {
                    return true;
                }
            }
            break;
        }

    }
    
    return true;

}

function onParsePath(property, last, context) {
    context[context.length] = property;
}

function parsePath(path) {
    var items = [];
    
    return eachPath(path, onParsePath, items) && items.length ?
                items : null;
    
}

function isAccessible(subject, item) {
    var T = TYPE,
        signature = T.signature(subject);
    
    switch (signature) {
    case T.NUMBER:
        return isFinite(subject) && item in Number.prototype && signature;
        
    case T.STRING:
        return item in String.prototype && signature;
    
    case T.BOOLEAN:
        return item in Boolean.prototype && signature;
    
    case T.REGEX:
    case T.DATE:
    case T.ARRAY:
    case T.OBJECT:
    case T.METHOD:
        if (item in subject) {
            return signature;
        }
    }
    return false;
}

function isWritable(subject) {
    var T = TYPE,
        signature = T.signature(subject);
    
    switch (signature) {
    case T.REGEX:
    case T.DATE:
    case T.ARRAY:
    case T.OBJECT:
    case T.METHOD:
        return signature;
    }
    return false;
}

function isJSONWritable(subject) {
    var T = TYPE,
        signature = T.signature(subject);
    
    switch (signature) {
    case T.ARRAY:
    case T.OBJECT:
        return signature;
    }
    return false;
}

function findCallback(item, last, operation) {
    var subject = operation[1];
    
    if (!isAccessible(subject, item)) {
        operation[0] = void(0);
        return false;
    }
    
    operation[last ? 0 : 1] = subject[item];
    return true;
}


function find(path, object) {
    var operation = [void(0), object];
    eachPath(path, findCallback, operation);
    operation[1] = null;
    return operation[0];
}

function clone(path, object, deep) {
    return OBJECT.clone(find(path, object), deep === true);
}


function onPopulatePath(item, last, context) {
    var subject = context[1],
        iswritable = isWritable,
        writable = iswritable(subject),
        U = void(0),
        success = false;
        
    // populate
    if (!last) {
        // populate
        if (writable) {
            // set object
            if (!(item in subject)) {
                subject[item] = {};
                success = true;
                
            }
            // allow only when writable
            else if (iswritable(subject[item])) {
                success = true;
            }
        }
    
        context[1] = success ? subject[item] : U;
        
    }
    // end it with writable state?
    else {
        success = writable;
        context[2] = success && item;
        
    }
   
    return success;

}

function assign(path, subject, value, overwrite) {
    var T = TYPE,
        typeArray = T.ARRAY,
        apply = OBJECT.assign,
        writable = isWritable;
    var context, name, current, valueSignature, currentSignature,
        arrayOperation, arrayPush, canApply;
    
    if (!T.string(path)) {
        throw new Error(ERROR_PATH_INVALID);
    }
    
    // main subject should be accessible and native object
    context = [void(0), subject, false];
    eachPath(path, onPopulatePath, context);
    name = context[2];
    
    if (name !== false) {
        subject = context[1];
        valueSignature = writable(value);
        arrayOperation = T.array(subject) && NUMERIC_RE.test(name);
        
        if (name in subject) {
            current = subject[name];
            currentSignature = writable(current);
        }
        else {
            current = undefined;
            currentSignature = null;
        }
        
        canApply = valueSignature && !!currentSignature;
        arrayPush = canApply &&
                        valueSignature === typeArray &&
                        currentSignature === typeArray;
                        
        
        // finalize overwrite type
        switch (overwrite) {
        // only available if subject is array and name is numeric index
        case 'insert':
            overwrite = !arrayOperation;
            if (arrayOperation) {
                subject.splice(name * 1, 0, value);
            }
            break;
        
        // only available if subject canApply
        case 'apply':
            overwrite = !canApply;
            if (canApply) {
                apply(current, value);
            }
            break;
        
        // only available if current is array and value is array
        case 'push':
            overwrite = !arrayPush;
            if (arrayPush) {
                current.push.apply(current, value);
            }
            break;
        
        // only available if current is array and value is array
        case 'unshift':
            overwrite = !arrayPush;
            if (arrayPush) {
                current.splice.apply(current, [0, 0].concat(value));
            }
            break;
        
        // default is no overwrite if possible
        case false:
        /* falls through */
        default:
            // can apply or push only if non-scalar current and value
            overwrite = !canApply;
            if (canApply) {
                if (arrayPush) {
                    current.push.apply(current, value);
                }
                else {
                    apply(current, value);
                }
            }
        }
        
        // plain overwrite!
        if (overwrite === true) {
            subject[name] = value;
        }
        
        return true;
    
    }
    return false;
}


function onRemovePath(item, last, context) {
    var subject = context[1],
        iswritable = isWritable,
        writable = iswritable(subject),
        U = void(0),
        success = false;
        
    // populate
    if (!last) {
        if (writable && item in subject) {
            
            // go to next
            if (iswritable(subject[item])) {
                success = true;
            }
            // still a success, nothing to remove
            else {
                context[3] = true;
            }

        }
    
        context[1] = success ? subject[item] : U;
        
    }
    // end it with writable state?
    else {
        success = writable;
        context[2] = success && item;
        context[3] = true;
    }
    
    return success;
}

function remove(path, subject) {
    var T = TYPE;
    var context, name, returnValue;
    
    if (!T.string(path)) {
        throw new Error(ERROR_PATH_INVALID);
    }
    
    // main subject should be accessible and native object
    context = [void(0), subject, false, false];
    eachPath(path, onRemovePath, context);
    
    name = context[2];
    returnValue = context[3];
    
    // found! and must be removed
    if (returnValue && name !== false) {
        
        subject = context[1];
        
        if (!(name in subject)) {
            
            returnValue = false;
        }
        else {
        
            // remove item
            if (T.array(subject) && NUMERIC_RE.test(name)) {
                subject.splice(name * 1, 1);
                
            }
            else {
                
                delete subject[name];
                // check if removable
                returnValue = !(name in subject);
                
            }
            
        }
    }
    
    return returnValue;
}

function compare(path, object1, object2) {
    return OBJECT.compare(find(path, object1), object2);
}


function fill(path, subject, value, overwrite) {
    var T = TYPE,
        O = OBJECT,
        typeArray = T.ARRAY,
        array = T.array,
        object = T.object,
        getMax = O.maxObjectIndex,
        apply = O.assign,
        has = O.contains,
        arrayIndexRe = ARRAY_INDEX_RE,
        iswritable = isJSONWritable,
        isSubjectArray = array(subject);
        
    var parent, c, l, item, parentIndex,
        property, arrayIndex, writable;
        
    
    
    if (!T.string(path)) {
        throw new Error(ERROR_PATH_INVALID);
    }
    
    // root subject should be an object
    if (!object(subject) && !isSubjectArray) {
        return false;
    }
    
    // unable to create items from path
    path = parsePath(path);
    if (!path || !path.length) {
        return false;
    }
    
    parent = subject;
    parentIndex = path[0];
    
    // finalize parent index
    if (!parentIndex) {
        parentIndex = getMax(parent) + 1;
    }
    
    l = path.length -1;
    
    for (c = 0; l--;) {
        item = path[++c];
        
        // only determine if arrayIndex or not,
        //      resolve this later if it will turn into parentIndex
        arrayIndex = arrayIndexRe.test(item);
        
        // finalize property
        if (has(parent, parentIndex)) {
            property = parent[parentIndex];
            writable = iswritable(property);
            
            // recreate array into object to support "named" property
            if (writable === typeArray && !arrayIndex) {
                property = apply({}, property);
                delete property.length;
                
            }
            // contain current property
            else if (!writable) {
                property = arrayIndex ?
                    [property] : {"": property};
            }

        }
        // error! unable to replace root object
        else if (isSubjectArray && parent === subject && !arrayIndex) {
            throw new Error(ERROR_NATIVE_OBJECT);
        }
        // populate
        else {
            property = arrayIndex ? [] : {};
        }
        
        parent = parent[parentIndex] = property;
        parentIndex = item;
        
        // resolve empty parentIndex
        if (!item) {
            parentIndex = getMax(parent) + 1;
        }
        
    }
    
    // if not overwrite, then fill-in value in array or object
    //if (overwrite !== true && has(parent, parentIndex)) {
    //    property = parent[parentIndex];
    //    
    //    // append
    //    if (T.array(property)) {
    //        parent = property;
    //        parentIndex = parent.length;
    //    }
    //    else {
    //        parent = parent[parentIndex] = [property];
    //        parentIndex = 1;
    //    }
    //}
    
    parent[parentIndex] = value;
    
    return true;
    
}

function existsCallback(item, last, context) {
    var subject = context[0],
        exists = isAccessible(subject, item);
    
    if (exists) {
        context[0] = subject[item];
    }
    
    if (last) {
        context[1] = !!exists;
    }
    
    return exists;
}

function exists(path, subject) {
    var operation = [subject, false];
    
    eachPath(path, existsCallback, operation);
    operation[0] = null;
    
    return operation[1];
}




module.exports = {
    jsonParsePath: parsePath,
    jsonFind: find,
    jsonCompare: compare,
    jsonClone: clone,
    jsonEach: eachPath,
    jsonSet: assign,
    jsonUnset: remove,
    jsonFill: fill,
    jsonExists: exists
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var TYPE = __webpack_require__(0),
    //DETECT = require('./detect.js'),
    G = global,
    // 1 = namespace, 4 = position, 5 = item
    NAME_RE = /^(([^\.]+\.)*)((before|after)\:)?([a-zA-Z0-9\_\-\.]+)$/,
    POSITION_BEFORE = 1,
    POSITION_AFTER = 2,
    RUNNERS = {},
    NAMESPACES = {},
    NATIVE_SET_IMMEDIATE = !!G.setImmediate,
    EXPORTS = {
        register: set,
        run: run,
        middleware: middlewareNamespace,
        setAsync: NATIVE_SET_IMMEDIATE ?
                        nativeSetImmediate : timeoutAsync,
        clearAsync: NATIVE_SET_IMMEDIATE ?
                        nativeClearImmediate : clearTimeoutAsync
    };
    

    
function set(name, handler) {
    var parsed = parseName(name),
        list = RUNNERS;
    var access, items;
    
    if (parsed && handler instanceof Function) {
        name = parsed[1];
        access = ':' + name;
        if (!(access in list)) {
            list[access] = {
                name: name,
                before: [],
                after: []
            };
        }
        
        items = list[access][getPositionAccess(parsed[0])];
        
        items[items.length] = handler;
    }
    
    return EXPORTS.chain;
}


function run(name, args, scope) {
    var runners = get(name);
    var c, l;

    if (runners) {
        if (typeof scope === 'undefined') {
            scope = null;
        }
        if (!(args instanceof Array)) {
            args = [];
        }
        
        for (c = -1, l = runners.length; l--;) {
            runners[++c].apply(scope, args);
        }
        
    }
    
    return EXPORTS.chain;
}

function get(name) {
    var list = RUNNERS,
        parsed = parseName(name);
    var access;
    
    if (parsed) {
        access = ':' + parsed[1];
        
        if (access in list) {
            return list[access][getPositionAccess(parsed[0])];
            
        }
    }
    
    return void(0);
}

function getPositionAccess(input) {
    return  input === POSITION_BEFORE ? 'before' : 'after';
}

function parseName(name) {
    var match = TYPE.string(name) && name.match(NAME_RE);
    var position, namespace;
    
    
    
    
    if (match) {
        namespace = match[1];
        position = match[4] === 'before' ? POSITION_BEFORE : POSITION_AFTER;
        //console.log('parsed ', name, ' = ', [position, (namespace || '') + match[5]]);
        return [position, (namespace || '') + match[5]];
        
    }
    
    return void(0);
    
}

function middlewareNamespace(name) {
    var list = NAMESPACES;
    var access, register, run;
 
    if (TYPE.string(name)) {
        access = name + '.';
        if (!(access in list)) {
            run = createRunInNamespace(access);
            register = createRegisterInNamespace(access);
            list[access] = register.chain = run.chain = {
                                                        run: run,
                                                        register: register
                                                    };
        }
        return list[access];
    }
    return void(0);
}

function createRunInNamespace(ns) {
    function nsRun(name, args, scope) {
        run(ns + name, args, scope);
        return nsRun.chain;
    }
    return nsRun;
}

function createRegisterInNamespace(ns) {
    function nsRegister(name, handler) {
        set(ns + name, handler);
        return nsRegister.chain;
    }
    return nsRegister;
}


function timeoutAsync(handler) {
    return G.setTimeout(handler, 1);
}

function clearTimeoutAsync(id) {
    return G.clearTimeout(id);
}

function nativeSetImmediate (fn) {
    return G.setImmediate(fn);
}

function nativeClearImmediate(id) {
    return G.clearImmediate(id);
}


module.exports = EXPORTS.chain = EXPORTS;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var HALF_BYTE = 0x80,
    SIX_BITS = 0x3f,
    ONE_BYTE = 0xff,
    fromCharCode = String.fromCharCode,
    TYPE = __webpack_require__(0),
    BASE64_MAP =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    NOT_BASE64_RE = /[^a-zA-Z0-9\+\/\=]/g,
    BASE64_EXCESS_REMOVE_RE = /[^a-zA-Z0-9\+\/]/,
    CAMEL_RE = /[^a-z]+[a-z]/ig,
    UNCAMEL_RE = /\-*[A-Z]/g,
    INVALID_SUBJECT = 'Invalid [subject] parameter.';

function base64Encode(subject) {
    var map = BASE64_MAP,
        buffer = [],
        bl = 0,
        c = -1,
        excess = false,
        pad = map.charAt(64);
    var l, total, code, flag, end, chr;
    
    if (!TYPE.string(subject, true)) {
        throw new Error(INVALID_SUBJECT);
    }
    
    // decode to ascii
    subject = utf16ToUtf8(subject);
    l = total = subject.length;
    
    for (; l--;) {
        code = subject.charCodeAt(++c);
        flag = c % 3;
        
        switch (flag) {
        case 0:
            chr = map.charAt((code & 0xfc) >> 2);
            excess = (code & 0x03) << 4;
            break;
        case 1:
            chr = map.charAt(excess | (code & 0xf0) >> 4);
            excess = (code & 0x0f) << 2;
            break;
        case 2:
            chr = map.charAt(excess | (code & 0xc0) >> 6);
            excess = code & 0x3f;
        }
        buffer[bl++] = chr;
        
        end = !l;
        if ((end || flag === 2)) {
            buffer[bl++] = map.charAt(excess);
        }
        
        
        if (!l) {
            l = bl % 4;
            for (l = l && 4 - l; l--;) {
                buffer[bl++] = pad;
            }
            break;
        }
    }
    
    return buffer.join('');
    
}

function base64Decode(subject) {
    var map = BASE64_MAP,
        oneByte = ONE_BYTE,
        buffer = [],
        bl = 0,
        c = -1,
        code2str = fromCharCode;
    var l, code, excess, chr, flag;
    
    if (!TYPE.string(subject, true) || NOT_BASE64_RE.test(subject)) {
        throw new Error(INVALID_SUBJECT);
    }
    
    subject = subject.replace(BASE64_EXCESS_REMOVE_RE, '');
    l = subject.length;
    
    for (; l--;) {
        code = map.indexOf(subject.charAt(++c));
        flag = c % 4;
        
        switch (flag) {
        case 0:
            chr = 0;
            break;
        case 1:
            chr = ((excess << 2) | (code >> 4)) & oneByte;
            break;
        case 2:
            chr = ((excess << 4) | (code >> 2)) & oneByte;
            break;
        case 3:
            chr = ((excess << 6) | code) & oneByte;
        }
        
        excess = code;
        
        if (!l && flag < 3 && chr < 64) {
            break;
        }

        if (flag) {
            buffer[bl++] = code2str(chr);
        }
    }
    
    //return decodeURIComponent(escape(buffer.join("")));
    
    return utf8ToUtf16(buffer.join(""));
    //return binbuffer.join("");
    
}


function utf16ToUtf8(subject) {
    var half = HALF_BYTE,
        sixBits = SIX_BITS,
        code2char = fromCharCode,
        utf8 = [],
        ul = 0;
    var code, c, l;
    
    if (!TYPE.string(subject, true)) {
        throw new Error(INVALID_SUBJECT);
    }
    
    for (c = -1, l = subject.length; l--;) {
        code = subject.charCodeAt(++c);
        
        if (code < half) {
            utf8[ul++] = code2char(code);
        }
        else if (code < 0x800) {
            utf8[ul++] = code2char(0xc0 | (code >> 6));
            utf8[ul++] = code2char(half | (code & sixBits));
        }
        else if (code < 0xd800 || code > 0xdfff) {
            utf8[ul++] = code2char(0xe0 | (code >> 12));
            utf8[ul++] = code2char(half | ((code >> 6) & sixBits));
            utf8[ul++] = code2char(half | (code  & sixBits));
        }
        else {
            l--;
            code = 0x10000 + (((code & 0x3ff)<<10)
                      | (subject.charCodeAt(++c) & 0x3ff));
            
            utf8[ul++] = code2char(0xf0 | (code >> 18));
            utf8[ul++] = code2char(half | ((code >> 12) & sixBits));
            utf8[ul++] = code2char(half | ((code >> 6) & sixBits));
            utf8[ul++] = code2char(half | (code >> sixBits));
            
        }
    }
    
    return utf8.join('');
}


// based from https://gist.github.com/weishuaiwang/4221687
function utf8ToUtf16(subject) {
    var code2char = fromCharCode;
    var utf16, ul, c, l, code;
    
    if (!TYPE.string(subject, true)) {
        throw new Error(INVALID_SUBJECT);
    }
    
    utf16 = [];
    ul = 0;
    for (c = -1, l = subject.length; l--;) {
        code = subject.charCodeAt(++c);
        switch (code >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
            // 0xxxxxxx
            utf16[ul++] = subject.charAt(c);
            break;
        case 12:
        case 13:
            // 110x xxxx 10xx xxxx
            l--;
            utf16[ul++] = code2char(((code & 0x1F) << 6) |
                                    (subject.charCodeAt(++c) & 0x3F));
            break;
        case 14:
            // 1110 xxxx10xx xxxx10xx xxxx
            utf16[ul++] = code2char(((code & 0x0F) << 12) |
                                    ((subject.charCodeAt(++c) & 0x3F) << 6) |
                                    ((subject.charCodeAt(++c) & 0x3F) << 0));
            l -= 2;
            break;
        }
    }
    
    return utf16.join("");
}

function camelize(subject) {
    return subject.replace(CAMEL_RE, applyCamelize);
}

function applyCamelize(all) {
    return all.charAt(all.length - 1).toUpperCase();
}

function uncamelize(subject) {
    return subject.replace(UNCAMEL_RE, applyUncamelize);
}

function applyUncamelize(all) {
    return '-' + all.charAt(all.length -1).toLowerCase();
}

module.exports = {
    "encode64": base64Encode,
    "decode64": base64Decode,
    "utf2bin": utf16ToUtf8,
    "bin2utf": utf8ToUtf16,
    "camelize": camelize,
    "uncamelize": uncamelize
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DETECT = __webpack_require__(3),
    OBJECT = __webpack_require__(1),
    PROCESSOR = __webpack_require__(5),
    EXPORTS = {
        env: DETECT
    };

OBJECT.assign(EXPORTS, __webpack_require__(0));
OBJECT.assign(EXPORTS, OBJECT);
OBJECT.assign(EXPORTS, __webpack_require__(8));
OBJECT.assign(EXPORTS, __webpack_require__(6));
OBJECT.assign(EXPORTS, PROCESSOR);
OBJECT.assign(EXPORTS, __webpack_require__(10));
OBJECT.assign(EXPORTS, __webpack_require__(4));

PROCESSOR.chain = EXPORTS;

// promise polyfill
EXPORTS.Promise = __webpack_require__(9);
EXPORTS['default'] = EXPORTS;

module.exports = EXPORTS;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



// motivation of set operations:
// https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php
var DETECT = __webpack_require__(3),
    OBJECT = __webpack_require__(1),
    TYPE = __webpack_require__(0),
    INVALID_ARRAY1 = 'Invalid [array1] parameter.',
    INVALID_ARRAY2 = 'Invalid [array2] parameter.',
    A = Array.prototype;

function indexOf(subject) {
    /*jshint validthis:true */
    var array = this,
        l = array.length,
        c = -1;
    
    for (; l--;) {
        if (subject === array[++c]) {
            array = null;
            return c;
        }
    }
    
    return -1;
}

function lastIndexOf(subject) {
    /*jshint validthis:true */
    var array = this,
        l = array.length;
        
    for (; l--;) {
        if (subject === array[l]) {
            array = null;
            return l;
        }
    }
    
    return -1;
}

/**
 * Creates a union of two arrays
 * @name libcore.unionList
 * @function
 * @param {Array} array1 - source array
 * @param {Array} array2 - array to merge
 * @param {boolean} [clone] - Filters array1 parameter with union of array2
 *                          if this parameter is false. It returns a new set
 *                          of array containing union of array1 and array2
 *                          otherwise.
 * @returns {Array} union of first two array parameters
 */
function union(array1, array2, clone) {
    var isarray = TYPE.array;
    var subject, l, len, total;
    
    if (!isarray(array1)) {
        throw new Error(INVALID_ARRAY1);
    }
    
    if (!isarray(array2)) {
        throw new Error(INVALID_ARRAY2);
    }
    
    array1 = clone === true ? array1.slice(0) : array1;
    
    // apply
    array1.push.apply(array1, array2);
    total = array1.length;
    
    // apply unique
    found: for (l = total; l--;) {
        subject = array1[l];
        
        // remove if not unique
        for (len = total; len--;) {
            if (l !== len && subject === array1[len]) {
                total--;
                array1.splice(l, 1);
                continue found;
            }
        }
    }
    
    return array1;
}

/**
 * Creates an intersection of two arrays
 * @name libcore.intersect
 * @function
 * @param {Array} array1 - source array 
 * @param {Array} array2 - array to intersect
 * @param {boolean} [clone] - Filters array1 parameter with intersection of
 *                          array2 if this parameter is false. It returns a
 *                          new set of array containing intersection of
 *                          array1 and array2 otherwise.
 * @returns {Array} intersection of first two array parameters
 */
function intersect(array1, array2, clone) {
    var isarray = TYPE.array;
    var subject, l1, l2, total1, total2;
    
    if (!isarray(array1)) {
        throw new Error(INVALID_ARRAY1);
    }
    
    if (!isarray(array2)) {
        throw new Error(INVALID_ARRAY2);
    }
    
    total1 = array1.length;
    total2 = array2.length;
        
    // create a copy
    array1 = clone === true ? array1.slice(0) : array1;
    
    found: for (l1 = total1; l1--;) {
        subject = array1[l1];
        foundSame: for (l2 = total2; l2--;) {
            if (subject === array2[l2]) {
                // intersect must be unique
                for (l2 = total1; l2--;) {
                    if (l2 !== l1 && subject === array1[l2]) {
                        break foundSame;
                    }
                }
                continue found;
            }
        }
        array1.splice(l1, 1);
        total1--;
    }
    
    return array1;
}


/**
 * Creates a difference of two arrays
 * @name libcore.differenceList
 * @function
 * @param {Array} array1 - source array 
 * @param {Array} array2 - array to be applied as difference of array1
 * @param {boolean} [clone] - Filters array1 parameter with difference of array2
 *                          if this parameter is false. It returns a new set
 *                          of array containing difference of
 *                          array1 and array2 otherwise.
 * @returns {Array} difference of first two array parameters
 */
function difference(array1, array2, clone) {
    var isarray = TYPE.array;
    var subject, l1, l2, total1, total2;
    
    if (!isarray(array1)) {
        throw new Error(INVALID_ARRAY1);
    }
    
    if (!isarray(array2)) {
        throw new Error(INVALID_ARRAY2);
    }
    
    total1 = array1.length;
    total2 = array2.length;
        
    // create a copy
    array1 = clone === true ? array1.slice(0) : array1;
    
    found: for (l1 = total1; l1--;) {
        subject = array1[l1];
        
        // remove if found
        for (l2 = total2; l2--;) {
            if (subject === array2[l2]) {
                array1.splice(l1, 1);
                total1--;
                continue found;
            }
        }
        
        // diff must be unique
        for (l2 = total1; l2--;) {
            if (l2 !== l1 && subject === array1[l2]) {
                array1.splice(l1, 1);
                total1--;
                continue found;
            }
        }
    }
    
    return array1;
}





// apply polyfill
if (!DETECT.indexOfSupport) {
    OBJECT.assign(A, {
        indexOf: indexOf,
        lastIndexOf: lastIndexOf
    });
}

module.exports = {
    unionList: union,
    intersectList: intersect,
    differenceList: difference
};



/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var TYPE = __webpack_require__(0),
    OBJECT = __webpack_require__(1),
    PROCESSOR = __webpack_require__(5),
    slice = Array.prototype.slice,
    G = global,
    ERROR_ITERABLE = 'Invalid [iterable] parameter.',
    INDEX_STATUS = 0,
    INDEX_DATA = 1,
    INDEX_PENDING = 2;

function createPromise(instance) {
    var Class = Promise;
    
    if (!(instance instanceof Class)) {
        instance = OBJECT.instantiate(Class);
    }
    
    instance.__state = [null,
                        void(0),
                        [],
                        null,
                        null];
    return instance;
}

function resolveValue(data, callback) {
    function resolve(data) {
        try {
            callback(true, data);
        }
        catch (error) {
            callback(false, error);
        }
    }
    
    if (TYPE.thenable(data)) {
        data.then(resolve,
                  function (error) {
                        callback(false, error);
                    });
    }
    else {
        resolve(data);
    }
}

function finalizeValue(promise, success, data) {
    var state = promise.__state,
        list = state[INDEX_PENDING];
        
    state[INDEX_STATUS] = success;
    state[INDEX_DATA] = data;
    
    // notify callbacks
    for (; list.length; ) {
        list[0](success, data);
        list.splice(0, 1);
    }
}

function Promise(resolver) {
    var finalized = false;
    var instance;
    
    function onFinalize(success, data) {
        finalizeValue(instance, success, data);
    }
    
    function resolve(data) {
        if (!finalized) {
            finalized = true;
            resolveValue(data, onFinalize);
        }
    }
    
    function reject(error) {
        if (!finalized) {
            finalized = true;
            onFinalize(false, error);
        }
    }
    
    if (!TYPE.method(resolver)) {
        throw new Error('Promise resolver is not a function.');
    }
    
    instance = createPromise(this);
    
    try {
        resolver(resolve, reject);
    }
    catch (error) {
        reject(error);
    }
    
    return instance;
}

function resolve(data) {
    return new Promise(function (resolve) {
        resolve(data);
    });
}

function reject(reason) {
    return new Promise(function () {
        arguments[1](reason);
    });
}

function all(iterable) {
    var total;
    
    function resolver(resolve, reject) {
        var list = iterable,
            remaining = total,
            stopped = false,
            l = remaining,
            c = 0,
            result = [];

        function process(index, item) {
            function finalize(success, data) {
                var found = result;
                
                if (stopped) { return; }
                
                if (!success) {
                    reject(data);
                    stopped = true;
                    return;
                }
                
                found[index] = data;
                
                if (!--remaining) {
                    resolve(found);
                }
            }
            resolveValue(item, finalize);
        }
        
        for (result.length = l; l--; c++) {
            process(c, list[c]);
        }
    }
    
    if (!TYPE.iterable(iterable)) {
        throw new TypeError(ERROR_ITERABLE);
    }
    
    iterable = slice.call(iterable, 0);
    total = iterable.length;
    
    if (!total) {
        return resolve([]);
    }
    
    return new Promise(resolver);
}

function race(iterable) {
    function resolver(resolve, reject) {
        var stopped = false,
            tryResolve = resolveValue,
            list = iterable,
            c = -1,
            l = list.length;
        
        function onFulfill(success, data) {
            if (!stopped) {
                stopped = true;
                (success ? resolve : reject)(data);
            }
        }
        
        for (; l--;) {
            tryResolve(list[++c], onFulfill);
        }
    }
    
    if (!TYPE.iterable(iterable)) {
        throw new TypeError(ERROR_ITERABLE);
    }
    
    iterable = slice.call(iterable, 0);
    
    return new Promise(resolver);
}

Promise.prototype = {
    constructor: Promise,
    then: function (onFulfill, onReject) {
        var me = this,
            state = me.__state,
            success = state[INDEX_STATUS],
            list = state[INDEX_PENDING],
            instance = createPromise();
            
        function run(success, data) {
            var finalize = finalizeValue,
                handle = success ? onFulfill : onReject;
            
            if (TYPE.method(handle)) {
                try {
                    data = handle(data);
                    resolveValue(data,
                                function (success, data) {
                                    finalize(instance,
                                             success,
                                             data);
                                });
                    return;
                }
                catch (error) {
                    data = error;
                    success = false;
                }
            }
            finalize(instance, success, data);
        }
        
        if (success === null) {
            list[list.length] = run;
        }
        else {
            PROCESSOR.setAsync(function () {
                run(success, state[INDEX_DATA]);
            });
        }
        
        return instance;
    },
    
    "catch": function (onReject) {
        return this.then(null, onReject);
    }
};

// static methods
OBJECT.assign(Promise, {
    all: all,
    race: race,
    reject: reject,
    resolve: resolve
});

// Polyfill if promise is not supported
if (!TYPE.method(G.Promise)) {
    G.Promise = Promise;
}

module.exports = Promise;
G = null;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TYPE = __webpack_require__(0),
    OBJECT = __webpack_require__(1),
    JSON_OP = __webpack_require__(4),
    isString = TYPE.string,
    ERROR_NAME = 'Invalid [name] parameter.',
    ERROR_PATH = 'Invalid [path] parameter.';

function create() {
    return new Registry();
}

function isIndex(name) {
    var T = TYPE;
    
    switch (T.signature(name)) {
    case T.STRING:
    case T.NUMBER: return true;
    }
    return false;
}

function Registry() {
    this.data = {};
}

Registry.prototype = {
    constructor: Registry,
    
    onApply: function (value) {
        OBJECT.assign(this.data, value, true);
    },
    
    onSet: function (name, value) {
        this.data[name] = value;
    },
    
    get: function (name) {
        var list = this.data;
        
        if (!isIndex(name)) {
            throw new Error(ERROR_NAME);
        }
        
        if (OBJECT.contains(list, name)) {
            return list[name];
        }
        
        return void(0);
    },
    
    set: function (name, value) {
        var T = TYPE;
        
        switch (T.signature(name)) {
        case T.OBJECT:
        case T.ARRAY:
            this.onApply(name);
            break;
        
        case T.STRING:
        case T.NUMBER:
            this.onSet(name, value);
            break;
            
        default:
            throw new Error(ERROR_NAME);
        }
        
        return this;
    },
    
    unset: function (name) {
        var list = this.data;
        
        if (!isIndex(name)) {
            throw new Error(ERROR_NAME);
        }
        
        if (OBJECT.contains(list, name)) {
            delete list[name];
        }
        
        return this;
    },
    
    find: function (path) {
        if (!isString(path)) {
            throw new Error(ERROR_PATH);
        }
        
        return JSON_OP.jsonFind(path, this.data);
    },
    
    insert: function (path, value) {
        if (!isString(path)) {
            throw new Error(ERROR_PATH);
        }
        
        JSON_OP.jsonFill(path, this.data, value, true);
        
        return this;
    
    },
    
    remove: function (path) {
        if (!isString(path)) {
            throw new Error(ERROR_PATH);
        }
        
        JSON_OP.jsonUnset(path, this.data);
        
        return this;
    },
    
    exists: function (name) {
        if (!isIndex(name)) {
            throw new Error(ERROR_NAME);
        }
        
        return OBJECT.contains(this.data, name);
    },
    
    pathExists: function (path) {
        if (!isString(path)) {
            throw new Error(ERROR_PATH);
        }
        
        return JSON_OP.jsonExists(path, this.data);
    },
    
    assign: function(value) {
        var T = TYPE;
        
        switch (T.signature(value)) {
        case T.OBJECT:
        case T.ARRAY:
            this.onApply(value);
            return this;
        
        default:
            throw new Error("Invalid [value] parameter");
        }
        
    },
    
    clear: function () {
        OBJECT.clear(this.data);
        return this;
    },
    
    clone: function () {
        var list = this.data;
        return OBJECT.clone(list, true);
    }
};

module.exports = {
    createRegistry: create
};



/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ })
/******/ ]);
});