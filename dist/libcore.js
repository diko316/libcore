(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === "object" && typeof module === "object") module.exports = factory(); else if (typeof define === "function" && define.amd) define("libcore", [], factory); else if (typeof exports === "object") exports["libcore"] = factory(); else root["libcore"] = factory();
})(this, function() {
    return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                exports: {},
                id: moduleId,
                loaded: false
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.loaded = true;
            return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.p = "/assets/";
        return __webpack_require__(0);
    }([ function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(1);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var DETECT = __webpack_require__(2), TYPE = __webpack_require__(4), OBJECT = __webpack_require__(5), ARRAY = __webpack_require__(6), PROCESSOR = __webpack_require__(7), EXPORTS = {
            env: DETECT
        };
        OBJECT.assign(EXPORTS, TYPE);
        OBJECT.assign(EXPORTS, OBJECT);
        OBJECT.assign(EXPORTS, ARRAY);
        OBJECT.assign(EXPORTS, PROCESSOR);
        OBJECT.assign(EXPORTS, __webpack_require__(8));
        PROCESSOR.chain = EXPORTS;
        EXPORTS.Promise = __webpack_require__(9);
        module.exports = EXPORTS["default"] = EXPORTS;
    }, function(module, exports, __webpack_require__) {
        (function(global) {
            "use strict";
            var ROOT = global, doc = ROOT.document, win = ROOT.window, toString = Object.prototype.toString, objectSignature = "[object Object]", BROWSER = !!doc && !!win && win.self === (doc.defaultView || doc.parentWindow), NODEVERSIONS = BROWSER ? false : function() {
                return __webpack_require__(3).versions || false;
            }(), CONSOLE = {}, CONSOLE_NAMES = [ "log", "info", "warn", "error", "assert" ], EXPORTS = {
                browser: BROWSER,
                nodejs: NODEVERSIONS && !!NODEVERSIONS.node,
                userAgent: BROWSER ? ROOT.navigator.userAgent : NODEVERSIONS ? nodeUserAgent() : "Unknown",
                validSignature: toString.call(null) !== objectSignature || toString.call(void 0) !== objectSignature,
                ajax: ROOT.XMLHttpRequest,
                indexOfSupport: "indexOf" in Array.prototype
            };
            var c, l;
            function nodeUserAgent() {
                var PROCESS = __webpack_require__(3), VERSIONS = NODEVERSIONS, str = [ "Node ", VERSIONS.node, "(", PROCESS.platform, "; V8 ", VERSIONS.v8 || "unknown", "; arch ", PROCESS.arch, ")" ];
                return str.join("");
            }
            function empty() {}
            if (!ROOT.console) {
                for (c = 0, l = CONSOLE_NAMES.length; l--; c++) {
                    CONSOLE[CONSOLE_NAMES[c]] = empty;
                }
            }
            module.exports = EXPORTS;
            ROOT = win = doc = null;
        }).call(exports, function() {
            return this;
        }());
    }, function(module, exports) {
        var process = module.exports = {};
        var cachedSetTimeout;
        var cachedClearTimeout;
        function defaultSetTimout() {
            throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
            throw new Error("clearTimeout has not been defined");
        }
        (function() {
            try {
                if (typeof setTimeout === "function") {
                    cachedSetTimeout = setTimeout;
                } else {
                    cachedSetTimeout = defaultSetTimout;
                }
            } catch (e) {
                cachedSetTimeout = defaultSetTimout;
            }
            try {
                if (typeof clearTimeout === "function") {
                    cachedClearTimeout = clearTimeout;
                } else {
                    cachedClearTimeout = defaultClearTimeout;
                }
            } catch (e) {
                cachedClearTimeout = defaultClearTimeout;
            }
        })();
        function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) {
                return setTimeout(fun, 0);
            }
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                cachedSetTimeout = setTimeout;
                return setTimeout(fun, 0);
            }
            try {
                return cachedSetTimeout(fun, 0);
            } catch (e) {
                try {
                    return cachedSetTimeout.call(null, fun, 0);
                } catch (e) {
                    return cachedSetTimeout.call(this, fun, 0);
                }
            }
        }
        function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) {
                return clearTimeout(marker);
            }
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                cachedClearTimeout = clearTimeout;
                return clearTimeout(marker);
            }
            try {
                return cachedClearTimeout(marker);
            } catch (e) {
                try {
                    return cachedClearTimeout.call(null, marker);
                } catch (e) {
                    return cachedClearTimeout.call(this, marker);
                }
            }
        }
        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;
        function cleanUpNextTick() {
            if (!draining || !currentQueue) {
                return;
            }
            draining = false;
            if (currentQueue.length) {
                queue = currentQueue.concat(queue);
            } else {
                queueIndex = -1;
            }
            if (queue.length) {
                drainQueue();
            }
        }
        function drainQueue() {
            if (draining) {
                return;
            }
            var timeout = runTimeout(cleanUpNextTick);
            draining = true;
            var len = queue.length;
            while (len) {
                currentQueue = queue;
                queue = [];
                while (++queueIndex < len) {
                    if (currentQueue) {
                        currentQueue[queueIndex].run();
                    }
                }
                queueIndex = -1;
                len = queue.length;
            }
            currentQueue = null;
            draining = false;
            runClearTimeout(timeout);
        }
        process.nextTick = function(fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) {
                for (var i = 1; i < arguments.length; i++) {
                    args[i - 1] = arguments[i];
                }
            }
            queue.push(new Item(fun, args));
            if (queue.length === 1 && !draining) {
                runTimeout(drainQueue);
            }
        };
        function Item(fun, array) {
            this.fun = fun;
            this.array = array;
        }
        Item.prototype.run = function() {
            this.fun.apply(null, this.array);
        };
        process.title = "browser";
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = "";
        process.versions = {};
        function noop() {}
        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.binding = function(name) {
            throw new Error("process.binding is not supported");
        };
        process.cwd = function() {
            return "/";
        };
        process.chdir = function(dir) {
            throw new Error("process.chdir is not supported");
        };
        process.umask = function() {
            return 0;
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var DETECTED = __webpack_require__(2), validSignature = DETECTED.validSignature, OBJECT_SIGNATURE = "[object Object]", OBJECT = Object, O = OBJECT.prototype, toString = O.toString, isSignature = validSignature ? objectSignature : ieObjectSignature;
        function objectSignature(subject) {
            return toString.call(subject);
        }
        function ieObjectSignature(subject) {
            if (subject === null) {
                return "[object Null]";
            } else if (subject === void 0) {
                return "[object Undefined]";
            }
            return toString.call(subject);
        }
        function isType(subject, type) {
            return isSignature(subject) === type;
        }
        function isObject(subject) {
            return toString.call(subject) === OBJECT_SIGNATURE;
        }
        function ieIsObject(subject) {
            return subject !== null && subject !== void 0 && toString.call(subject) === OBJECT_SIGNATURE;
        }
        function isNativeObject(subject) {
            var O = OBJECT;
            var constructor, result;
            if (isSignature(subject) === OBJECT_SIGNATURE) {
                constructor = subject.constructor;
                if (O.hasOwnProperty.call(subject, "constructor")) {
                    delete subject.constructor;
                    result = subject.constructor === O;
                    subject.constructor = constructor;
                    return result;
                }
                return constructor === O;
            }
            return false;
        }
        function isString(subject, allowEmpty) {
            return typeof subject === "string" && (allowEmpty === true || subject.length !== 0);
        }
        function isNumber(subject) {
            return typeof subject === "number" && isFinite(subject);
        }
        function isScalar(subject) {
            switch (typeof subject) {
              case "number":
                return isFinite(subject);

              case "boolean":
              case "string":
                return true;
            }
            return false;
        }
        function isFunction(subject) {
            return toString.call(subject) === "[object Function]";
        }
        function isArray(subject) {
            return toString.call(subject) === "[object Array]";
        }
        function isDate(subject) {
            return toString.call(subject) === "[object Date]";
        }
        function isRegExp(subject) {
            return toString.call(subject) === "[object RegExp]";
        }
        module.exports = {
            signature: isSignature,
            object: validSignature ? isObject : ieIsObject,
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
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var O = Object.prototype, TYPE = __webpack_require__(4), OHasOwn = O.hasOwnProperty;
        function empty() {}
        function assign(target, source, defaults) {
            var onAssign = apply, eachProperty = each;
            if (defaults) {
                eachProperty(defaults, onAssign, target);
            }
            eachProperty(source, onAssign, target);
            return target;
        }
        function apply(value, name) {
            this[name] = value;
        }
        function assignProperties(target, source, access) {
            var context = [ target, source ];
            each(access, applyProperties, context);
            context = context[0] = context[1] = null;
            return target;
        }
        function applyProperties(value, name) {
            this[0][name] = this[1][value];
        }
        function assignAll(target, source, defaults) {
            var onAssign = apply, eachProperty = each;
            if (defaults) {
                eachProperty(defaults, onAssign, target, false);
            }
            eachProperty(source, onAssign, target);
            return target;
        }
        function each(subject, handler, scope, hasown) {
            var hasOwn = OHasOwn, noChecking = hasown === false;
            var name;
            if (scope === void 0) {
                scope = null;
            }
            for (name in subject) {
                if (noChecking || hasOwn.call(subject, name)) {
                    if (handler.call(scope, subject[name], name, subject) === false) {
                        break;
                    }
                }
            }
            return subject;
        }
        function contains(subject, property) {
            return OHasOwn.call(subject, property);
        }
        function clear(subject) {
            each(subject, applyClear, null, true);
            return subject;
        }
        function applyClear() {
            delete arguments[2][arguments[1]];
        }
        function buildInstance(Class) {
            empty.prototype = Class.prototype;
            return new empty();
        }
        function compare(object1, object2) {
            return compareLookback(object1, object2, []);
        }
        function compareLookback(object1, object2, references) {
            var T = TYPE, isObject = T.object, isArray = T.array, isRegex = T.regex, isDate = T.date, me = compareLookback, depth = references.length;
            var name, len;
            switch (true) {
              case object1 === object2:
                return true;

              case isObject(object1):
                if (!isObject(object2)) {
                    return false;
                }
                if (references.lastIndexOf(object1) !== -1 && references.lastIndexOf(object2) !== -1) {
                    return true;
                }
                references[depth] = object1;
                references[depth + 1] = object2;
                for (name in object1) {
                    if (!(name in object2) || !me(object1[name], object2[name], references)) {
                        return false;
                    }
                }
                for (name in object2) {
                    if (!(name in object1) || !me(object1[name], object2[name], references)) {
                        return false;
                    }
                }
                references.length = depth;
                return true;

              case isArray(object1):
                if (!isArray(object2)) {
                    return false;
                }
                if (references.lastIndexOf(object1) !== -1 && references.lastIndexOf(object2) !== -1) {
                    return true;
                }
                len = object1.length;
                if (len !== object2.length) {
                    return false;
                }
                references[depth] = object1;
                references[depth + 1] = object2;
                for (;len--; ) {
                    if (!me(object1[len], object2[len], references)) {
                        return false;
                    }
                }
                references.length = depth;
                return true;

              case isRegex(object1):
                return isRegex(object2) && object1.source === object2.source;

              case isDate(object1):
                return isDate(object2) && object1.toString() === object2.toString();
            }
            return false;
        }
        function clone(data, deep) {
            var T = TYPE, isNative = T.nativeObject(data);
            deep = deep === true;
            if (isNative || T.array(data)) {
                return deep ? (isNative ? cloneObject : cloneArray)(data, [], []) : isNative ? assignAll({}, data) : data.slice(0);
            }
            if (T.regex(data)) {
                return new RegExp(data.source, data.flags);
            } else if (T.date(data)) {
                return new Date(data.getFullYear(), data.getMonth(), data.getDate(), data.getHours(), data.getMinutes(), data.getSeconds(), data.getMilliseconds());
            }
            return data;
        }
        function cloneObject(data, parents, cloned) {
            var depth = parents.length, T = TYPE, isNativeObject = T.nativeObject, isArray = T.array, ca = cloneArray, co = cloneObject, recreated = {};
            var name, value, index, isNative;
            parents[depth] = data;
            cloned[depth] = recreated;
            for (name in data) {
                value = data[name];
                isNative = isNativeObject(value);
                if (isNative || isArray(value)) {
                    index = parents.lastIndexOf(value);
                    value = index === -1 ? (isNative ? co : ca)(value, parents, cloned) : cloned[index];
                } else {
                    value = clone(value, false);
                }
                recreated[name] = value;
            }
            parents.length = cloned.length = depth;
            return recreated;
        }
        function cloneArray(data, parents, cloned) {
            var depth = parents.length, T = TYPE, isNativeObject = T.nativeObject, isArray = T.array, ca = cloneArray, co = cloneObject, recreated = [], c = 0, l = data.length;
            var value, index, isNative;
            parents[depth] = data;
            cloned[depth] = recreated;
            for (;l--; c++) {
                value = data[c];
                isNative = isNativeObject(value);
                if (isNative || isArray(value)) {
                    index = parents.lastIndexOf(value);
                    value = index === -1 ? (isNative ? co : ca)(value, parents, cloned) : cloned[index];
                } else {
                    value = clone(value, false);
                }
                recreated[c] = value;
            }
            parents.length = cloned.length = depth;
            return recreated;
        }
        module.exports = {
            each: each,
            assign: assign,
            rehash: assignProperties,
            contains: contains,
            buildInstance: buildInstance,
            clone: clone,
            compare: compare,
            clear: clear
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var DETECT = __webpack_require__(2), OBJECT = __webpack_require__(5), A = Array.prototype;
        function indexOf(subject) {
            var array = this, l = array.length, c = -1;
            for (;l--; ) {
                if (subject === array[++c]) {
                    array = null;
                    return c;
                }
            }
            return -1;
        }
        function lastIndexOf(subject) {
            var array = this, l = array.length;
            for (;l--; ) {
                if (subject === array[l]) {
                    array = null;
                    return l;
                }
            }
            return -1;
        }
        function union(array, array2, clone) {
            var subject, l, len, total;
            array = clone !== false ? array : array.slice(0);
            array.push.apply(array, array2);
            total = array.length;
            found: for (l = total; l--; ) {
                subject = array[l];
                for (len = total; len--; ) {
                    if (l !== len && subject === array[len]) {
                        total--;
                        array.splice(l, 1);
                        continue found;
                    }
                }
            }
            return array;
        }
        function intersect(array1, array2, clone) {
            var total1 = array1.length, total2 = array2.length;
            var subject, l1, l2;
            array1 = clone !== false ? array1 : array1.slice(0);
            found: for (l1 = total1; l1--; ) {
                subject = array1[l1];
                foundSame: for (l2 = total2; l2--; ) {
                    if (subject === array2[l2]) {
                        for (l2 = total1; l2--; ) {
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
        function difference(array1, array2, clone) {
            var total1 = array1.length, total2 = array2.length;
            var subject, l1, l2;
            array1 = clone !== false ? array1 : array1.slice(0);
            found: for (l1 = total1; l1--; ) {
                subject = array1[l1];
                for (l2 = total2; l2--; ) {
                    if (subject === array2[l2]) {
                        array1.splice(l1, 1);
                        total1--;
                        continue found;
                    }
                }
                for (l2 = total1; l2--; ) {
                    if (l2 !== l1 && subject === array1[l2]) {
                        array1.splice(l1, 1);
                        total1--;
                        continue found;
                    }
                }
            }
            return array1;
        }
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
    }, function(module, exports, __webpack_require__) {
        (function(global) {
            "use strict";
            var TYPE = __webpack_require__(4), G = global, NAME_RE = /^(([^\.]+\.)?(before|after)\:)?([a-zA-Z0-9\_\-\.]+)$/, POSITION_BEFORE = 1, POSITION_AFTER = 2, RUNNERS = {}, NAMESPACES = {}, EXPORTS = {
                register: set,
                run: run,
                middleware: middlewareNamespace,
                setAsync: G.setImmediate,
                clearAsync: G.clearImmediate
            };
            function set(name, handler) {
                var parsed = parseName(name), list = RUNNERS;
                var access, items;
                if (parsed && handler instanceof Function) {
                    name = parsed[1];
                    access = ":" + name;
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
                    if (typeof scope === "undefined") {
                        scope = null;
                    }
                    if (!(args instanceof Array)) {
                        args = [];
                    }
                    for (c = -1, l = runners.length; l--; ) {
                        runners[++c].apply(scope, args);
                    }
                }
                return EXPORTS.chain;
            }
            function get(name) {
                var list = RUNNERS, parsed = parseName(name);
                var access;
                if (parsed) {
                    access = ":" + parsed[1];
                    if (access in list) {
                        return list[access][getPositionAccess(parsed[0])];
                    }
                }
                return void 0;
            }
            function getPositionAccess(input) {
                return input === POSITION_BEFORE ? "before" : "after";
            }
            function parseName(name) {
                var match = TYPE.string(name) && name.match(NAME_RE);
                var position, prefix;
                if (match) {
                    prefix = match[1];
                    position = prefix && match[3] === "before" ? POSITION_BEFORE : POSITION_AFTER;
                    return [ position, (prefix ? match[2] : "") + match[3] ];
                }
                return void 0;
            }
            function middlewareNamespace(name) {
                var list = NAMESPACES;
                var access;
                if (TYPE.string(name)) {
                    access = name + ".";
                    if (!(access in list)) {
                        list[access] = {
                            run: createRunInNamespace(access),
                            register: createRegisterInNamespace(access)
                        };
                    }
                    return list[access];
                }
                return void 0;
            }
            function createRunInNamespace(ns) {
                function nsRun(name, args, scope) {
                    return run(ns + name, args, scope);
                }
                return nsRun;
            }
            function createRegisterInNamespace(ns) {
                function nsRun(name, handler) {
                    return set(ns + name, handler);
                }
                return nsRun;
            }
            function timeoutAsync(handler) {
                return setTimeout(handler, 1);
            }
            function clearTimeoutAsync(id) {
                return clearTimeout(id);
            }
            if (!(G.setImmediate instanceof Function)) {
                EXPORTS.setAsync = timeoutAsync;
                EXPORTS.clearAsync = clearTimeoutAsync;
            }
            module.exports = EXPORTS.chain = EXPORTS;
        }).call(exports, function() {
            return this;
        }());
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var TYPE = __webpack_require__(4), OBJECT = __webpack_require__(5);
        function create() {}
        function Registry() {
            this.data = {};
        }
        Registry.prototype = {
            constructor: Registry,
            get: function(name) {
                var list = this.data;
                if (OBJECT.contains(list, name)) {
                    return list[name];
                }
                return void 0;
            },
            set: function(name, value) {
                var list = this.data;
                if (TYPE.string(name) || TYPE.number(name)) {
                    list[name] = value;
                }
                return this;
            },
            unset: function(name) {
                var list = this.data;
                if (OBJECT.contains(list, name)) {
                    delete list[name];
                }
                return this;
            },
            clear: function() {
                OBJECT.clear(this.data);
                return this;
            },
            clone: function() {
                var list = this.data;
                return OBJECT.clone(list, true);
            }
        };
        module.exports = {
            createRegistry: create
        };
    }, function(module, exports, __webpack_require__) {
        (function(global) {
            "use strict";
            var TYPE = __webpack_require__(4), OBJECT = __webpack_require__(5), PROCESSOR = __webpack_require__(7), slice = Array.prototype.slice, G = global, INDEX_STATUS = 0, INDEX_DATA = 1, INDEX_PENDING = 2;
            function isPromise(object) {
                var T = TYPE;
                return T.object(object) && T.method(object.then);
            }
            function createPromise(instance) {
                var Class = Promise;
                if (!(instance instanceof Class)) {
                    instance = OBJECT.buildInstance(Class);
                }
                instance.__state = [ null, void 0, [], null, null ];
                return instance;
            }
            function resolveValue(data, callback) {
                function resolve(data) {
                    try {
                        callback(true, data);
                    } catch (error) {
                        callback(false, error);
                    }
                }
                if (isPromise(data)) {
                    data.then(resolve, function(error) {
                        callback(false, error);
                    });
                } else {
                    resolve(data);
                }
            }
            function finalizeValue(promise, success, data) {
                var state = promise.__state, list = state[INDEX_PENDING];
                state[INDEX_STATUS] = success;
                state[INDEX_DATA] = data;
                for (;list.length; ) {
                    list[0](success, data);
                    list.splice(0, 1);
                }
            }
            function Promise(tryout) {
                var instance = createPromise(this), finalized = false;
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
                } catch (error) {
                    reject(error);
                }
                return instance;
            }
            function resolve(data) {
                return new Promise(function(resolve) {
                    resolve(data);
                });
            }
            function reject(reason) {
                return new Promise(function() {
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
                return new Promise(function(resolve, reject) {
                    var list = promises, remaining = total, stopped = false, l = remaining, c = 0, result = [];
                    function process(index, item) {
                        function finalize(success, data) {
                            var found = result;
                            if (stopped) {
                                return;
                            }
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
                return new Promise(function(resolve, reject) {
                    var stopped = false, tryResolve = resolveValue, list = promises, c = -1, l = list.length;
                    function onFulfill(success, data) {
                        if (!stopped) {
                            stopped = true;
                            (success ? resolve : reject)(data);
                        }
                    }
                    for (;l--; ) {
                        tryResolve(list[++c], onFulfill);
                    }
                });
            }
            Promise.prototype = {
                constructor: Promise,
                then: function(onFulfill, onReject) {
                    var me = this, state = me.__state, success = state[INDEX_STATUS], list = state[INDEX_PENDING], instance = createPromise();
                    function run(success, data) {
                        var handle = success ? onFulfill : onReject;
                        if (TYPE.method(handle)) {
                            try {
                                data = handle(data);
                                resolveValue(data, function(success, data) {
                                    finalizeValue(instance, success, data);
                                });
                                return;
                            } catch (error) {
                                data = error;
                                success = false;
                            }
                        }
                        finalizeValue(instance, success, data);
                    }
                    if (success === null) {
                        list[list.length] = run;
                    } else {
                        PROCESSOR.setAsync(function() {
                            run(success, state[INDEX_DATA]);
                        });
                    }
                    return instance;
                },
                catch: function(onReject) {
                    return this.then(null, onReject);
                }
            };
            OBJECT.assign(Promise, {
                all: all,
                race: race,
                reject: reject,
                resolve: resolve
            });
            if (!TYPE.method(G.Promise)) {
                G.Promise = Promise;
            }
            module.exports = Promise;
            G = null;
        }).call(exports, function() {
            return this;
        }());
    } ]);
});

