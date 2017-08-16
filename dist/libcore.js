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
    STRING = __webpack_require__(5),
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var HALF_BYTE = 0x80,
    SIX_BITS = 0x3f,
    ONE_BYTE = 0xff,
    fromCharCode = String.fromCharCode,
    BASE64_MAP =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    BASE64_EXCESS_REMOVE_RE = /[^a-zA-Z0-9\+\/]/,
    CAMEL_RE = /[^a-z]+[a-z]/ig,
    UNCAMEL_RE = /\-*[A-Z]/g;

function base64Encode(str) {
    var map = BASE64_MAP,
        buffer = [],
        bl = 0,
        c = -1,
        excess = false,
        pad = map.charAt(64);
    var l, total, code, flag, end, chr;
    
    // decode to ascii
    str = utf16ToUtf8(str);
    l = total = str.length;
    
    for (; l--;) {
        code = str.charCodeAt(++c);
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

function base64Decode(str) {
    var map = BASE64_MAP,
        oneByte = ONE_BYTE,
        buffer = [],
        bl = 0,
        c = -1,
        code2str = fromCharCode;
    var l, code, excess, chr, flag;
    
    str = str.replace(BASE64_EXCESS_REMOVE_RE, '');
    l = str.length;
    
    for (; l--;) {
        code = map.indexOf(str.charAt(++c));
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
    
    return utf8ToUtf16(buffer.join(""));
    
}


function utf16ToUtf8(str) {
    var half = HALF_BYTE,
        sixBits = SIX_BITS,
        code2char = fromCharCode,
        utf8 = [],
        ul = 0,
        c = -1,
        l = str.length;
    var code;
    
    for (; l--;) {
        code = str.charCodeAt(++c);
        
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
                      | (str.charCodeAt(++c) & 0x3ff));
            
            utf8[ul++] = code2char(0xf0 | (code >> 18));
            utf8[ul++] = code2char(half | ((code >> 12) & sixBits));
            utf8[ul++] = code2char(half | ((code >> 6) & sixBits));
            utf8[ul++] = code2char(half | (code >> sixBits));
            
        }
    }
    
    return utf8.join('');
}

function utf8ToUtf16(str) {
    var half = HALF_BYTE,
        sixBits = SIX_BITS,
        code2char = fromCharCode,
        utf16 = [],
        M = Math,
        min = M.min,
        max = M.max,
        ul = 0,
        l = str.length,
        c = -1;
        
    var code, whatsLeft;
    
    for (; l--;) {
        code = str.charCodeAt(++c);
        
        if (code < half) {
            utf16[ul++] = code2char(code);
        }
        else if (code > 0xbf && code < 0xe0) {
            utf16[ul++] = code2char((code & 0x1f) << 6 |
                                    str.charCodeAt(c + 1) & sixBits);
            whatsLeft = max(min(l - 1, 1), 0);
            c += whatsLeft;
            l -= whatsLeft;
            
        }
        else if (code > 0xdf && code < 0xf0) {
            utf16[ul++] = code2char((code & 0x0f) << 12 |
                                    (str.charCodeAt(c + 1) & sixBits) << 6 |
                                    str.charCodeAt(c + 2) & sixBits);
            
            whatsLeft = max(min(l - 2, 2), 0);
            c += whatsLeft;
            l -= whatsLeft;
            
        }
        else {
            
            code = ((code & 0x07) << 18 |
                    (str.charCodeAt(c + 1) & sixBits) << 12 |
                    (str.charCodeAt(c + 2) & sixBits) << 6 |
                    str.charCodeAt(c + 3) & sixBits) - 0x010000;
            
            utf16[ul++] = code2char(code >> 10 | 0xd800,
                                    code & 0x03ff | 0xdc00);
            
            whatsLeft = max(min(l - 3, 3), 0);
            c += whatsLeft;
            l -= whatsLeft;
            
        }
    }
    
    return utf16.join('');
}

function parseJsonPath(path) {
    var dimensions = [],
        dl = 0,
        buffer = [],
        bl = dl,
        TRUE = true,
        FALSE = false,
        started = FALSE,
        merge = FALSE;
        
    var c, l, item, last;

    for (c = -1, l = path.length; l--;) {
        item = path.charAt(++c);
        last = !l;
        
        if (item === '[') {
            if (started) {
                break;
            }
            started = TRUE;
            // has first buffer
            if (bl) {
                merge = TRUE;
            }
        }
        else if (item === ']') {
            // failed! return failed
            if (!started) {
                break;
            }
            started = FALSE;
            merge = TRUE;
        }
        else {
            buffer[bl++] = item;
            if (last) {
                merge = TRUE;
            }
        }
        
        if (merge) {
            dimensions[dl++] = buffer.join("");
            buffer.length = bl = 0;
            merge = FALSE;
        }
        
        // ended but parse failed
        if (last) {
            if (started || dl < 1) {
                break;
            }
            return dimensions;
        }
    }
    
    return null;
}

function camelize(str) {
    return str.replace(CAMEL_RE, applyCamelize);
}

function applyCamelize(all) {
    return all.charAt(all.length - 1).toUpperCase();
}

function uncamelize(str) {
    return str.replace(UNCAMEL_RE, applyUncamelize);
}

function applyUncamelize(all) {
    return '-' + all.charAt(all.length -1).toLowerCase();
}

module.exports = {
    "encode64": base64Encode,
    "decode64": base64Decode,
    "utf2bin": utf16ToUtf8,
    "bin2utf": utf8ToUtf16,
    "jsonPath": parseJsonPath,
    "camelize": camelize,
    "uncamelize": uncamelize
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DETECT = __webpack_require__(3),
    OBJECT = __webpack_require__(1),
    PROCESSOR = __webpack_require__(4),
    EXPORTS = {
        env: DETECT
    };

OBJECT.assign(EXPORTS, __webpack_require__(0));
OBJECT.assign(EXPORTS, OBJECT);
OBJECT.assign(EXPORTS, __webpack_require__(7));
OBJECT.assign(EXPORTS, __webpack_require__(5));
OBJECT.assign(EXPORTS, PROCESSOR);
OBJECT.assign(EXPORTS, __webpack_require__(10));
OBJECT.assign(EXPORTS, __webpack_require__(8));

PROCESSOR.chain = EXPORTS;

// promise polyfill
EXPORTS.Promise = __webpack_require__(9);
EXPORTS['default'] = EXPORTS;

module.exports = EXPORTS;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DETECT = __webpack_require__(3),
    OBJECT = __webpack_require__(1),
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
    var subject, l, len, total;
    
    array1 = clone !== false ? array1 : array1.slice(0);
    
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
    var total1 = array1.length,
        total2 = array2.length;
    var subject, l1, l2;
        
    // create a copy
    array1 = clone !== false ? array1 : array1.slice(0);
    
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
     var total1 = array1.length,
        total2 = array2.length;
    var subject, l1, l2;
        
    // create a copy
    array1 = clone !== false ? array1 : array1.slice(0);
    
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TYPE = __webpack_require__(0),
    OBJECT = __webpack_require__(1),
    NUMERIC_RE = /^([1-9][0-9]*|0)$/,
    START = "start",
    START_ESCAPED = "start_escaped",
    QUEUE = "queue",
    END = "end",
    STATE = {
        "start": {
            "[": "bracket_start",
            "default": "any",
            "\\": "any_escape"
        },
        
        "bracket_start": {
            "'": "sq_start",
            '"': "dq_start",
            "default": "bracket_any"
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
            "bracket_any": START
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
            "bracket_end": END
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
            "bracket_end": END
        },
        "dq": {
            "dq": QUEUE,
            "bracket_end": END
        },
        "dq_escape": {
            "dq": QUEUE
        }
    };
    


function eachPath(subject, callback, arg1, arg2, arg3, arg4, arg5) {
    var T = TYPE,
        map = STATE,
        action = STATE_ACTION,
        start = START,
        start_escaped = START_ESCAPED,
        queue = QUEUE,
        end = END,
        DEFAULT = "default";
    var c, l, chr, state, stateObject, items, len, last,
        next, actionObject, buffer, bl, buffered, pending, start_queue;
    
    if (!T.string(subject)) {
        throw new Error("Invalid [subject] parameter");
    }
    
    if (!T.method(callback)) {
        throw new Error("Invalid [callback] parameter");
    }
    
    buffer = bl = false;
    state = "start";
    stateObject = map.start;
    
    items = [];
    len = pending = 0;
    
    for (c = -1, l = subject.length; l--;) {
        buffered = false;
        chr = subject.charAt(++c);
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
                start_queue = false;
                
                switch (actionObject[next]) {
                case start:
                        if (buffer !== false) {
                            return false;
                        }
                        
                        buffer = [chr];
                        bl = 1;
                        break;
                        
                case start_escaped:
                        if (buffer !== false) {
                            return false;
                        }
                        
                        buffer = [];
                        bl = 0;
                        break;
                        
                case queue:
                        if (buffer === false) {
                            return false;
                        }
                        buffer[bl++] = chr;
                        // dont end if did not reach the end
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
                }
            }
        }
        
        
        state = next;
        stateObject = map[state];
        
        if (pending < len - 1) {
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
        
        if (last && pending < len) {
            if (callback(items[pending++],
                        true,
                        arg1,
                        arg2,
                        arg3,
                        arg4,
                        arg5) === false) {
                return true;
            }
        }

    }
    
    return true;

}

function onParsePath(property, last, context) {
    context[context.length] = property;
}

function parsePath(path) {
    var items = [];
    
    return eachPath(path, onParsePath, items) ?
                items : null;
    
}

function isAccessible(subject, item) {
    switch (TYPE.signature(subject)) {
    case '[object Number]':
        return isFinite(subject) && item in Number.prototype;
        
    case '[object String]':
        return item in String.prototype;
    
    case '[object RegExp]':
    case '[object Date]':
    case '[object Array]':
    case '[object Object]':
    case '[object Function]':
        if (item in subject) {
            return true;
        }
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


function getItemsCallback(item, last, operation) {
    operation[operation.length] = item;
}

function assign(path, subject, value, overwrite) {
    var type = TYPE,
        has = OBJECT.contains,
        array = type.array,
        object = type.object,
        apply = type.assign,
        parent = subject,
        numericRe = NUMERIC_RE;
    var items, c, l, item, name, numeric, property, isArray, temp;
    
    if (object(parent) || array(parent)) {
        eachPath(path, getItemsCallback, items = []);
        
        if (items.length) {
            name = items[0];
            items.splice(0, 1);
            
            for (c = -1, l = items.length; l--;) {
                item = items[++c];
                numeric = numericRe.test(item);
                
                // finalize
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
                name = item;
                
            }
            
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
            
            return true;
        
        }
        
        
    }
    return false;
}


function removeCallback(item, last, operation) {
    var subject = operation[0];
    var isLength;
    
    if (!isAccessible(subject, item)) {
        return false;
    }
    
    // set
    if (last) {
        if (TYPE.array(subject)) {
            isLength = item === 'length';
            subject.splice(isLength ?
                                0 : item.toString(10),
                            isLength ?
                                subject.length : 1);
        }
        else {
            delete subject[item];
        }
        
        operation[1] = true;
    }
    else {
        operation[0] = subject[item];
    }
    
}

function remove(path, object) {
    var operation = [object, false];
    eachPath(path, removeCallback, operation);
    operation[0] = null;
    return operation[1];
}

function compare(path, object1, object2) {
    return OBJECT.compare(find(path, object1), object2);
}

module.exports = {
    jsonParsePath: parsePath,
    jsonFind: find,
    jsonCompare: compare,
    jsonClone: clone,
    jsonEach: eachPath,
    jsonSet: assign,
    jsonUnset: remove
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var TYPE = __webpack_require__(0),
    OBJECT = __webpack_require__(1),
    PROCESSOR = __webpack_require__(4),
    slice = Array.prototype.slice,
    G = global,
    INDEX_STATUS = 0,
    INDEX_DATA = 1,
    INDEX_PENDING = 2;

function isPromise(object) {
    var T = TYPE;
    return T.object(object) &&
            'then' in object &&
            T.method(object.then);
}

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
    if (isPromise(data)) {
        data.then(resolve, function (error) {
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

function Promise(tryout) {
    var instance = createPromise(this),
        finalized = false;
    
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
    
    try {
        tryout(resolve, reject);
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

function all(promises) {
    var total;
    promises = slice.call(promises, 0);
    total = promises.length;
    if (!total) {
        return resolve([]);
    }
    return new Promise(function (resolve, reject) {
                var list = promises,
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
            });
}

function race(promises) {
    promises = slice.call(promises, 0);
    return new Promise(function (resolve, reject) {
        var stopped = false,
            tryResolve = resolveValue,
            list = promises,
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
    });
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
            var handle = success ? onFulfill : onReject;
            if (TYPE.method(handle)) {
                try {
                    data = handle(data);
                    resolveValue(
                        data,
                        function (success, data) {
                            finalizeValue(instance, success, data);
                        });
                    return;
                }
                catch (error) {
                    data = error;
                    success = false;
                }
            }
            finalizeValue(instance, success, data);
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

// Polyfill if no promise
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
    OBJECT = __webpack_require__(1);

function create() {
    return new Registry();
}

function Registry() {
    this.data = {};
}

Registry.prototype = {
    constructor: Registry,
    get: function (name) {
        var list = this.data;
        
        if (OBJECT.contains(list, name)) {
            return list[name];
        }
        
        return void(0);
    },
    
    set: function (name, value) {
        var list = this.data;
        
        if (TYPE.string(name) || TYPE.number(name)) {
            list[name] = value;
        }
        
        return this;
    },
    
    unset: function (name) {
        var list = this.data;
        
        if (OBJECT.contains(list, name)) {
            delete list[name];
        }
        
        return this;
    },
    
    exists: function (name) {
        return OBJECT.contains(this.data, name);
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

module.exports = __webpack_require__(6);


/***/ })
/******/ ]);
});