'use strict';

var TYPE = require("./type.js"),
    OBJECT = require("./object.js"),
    PROCESSOR = require("./processor.js"),
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
