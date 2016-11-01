'use strict';

var TYPE = require("./type.js"),
    OBJECT = require("./object.js"),
    PROCESSOR = require("./processor.js"),
    FUNCTION = Function,
    slice = Array.prototype.slice,
    G = global,
    INDEX_STATUS = 0,
    INDEX_DATA = 1,
    INDEX_PENDING = 2;

function isPromise(object) {
    return TYPE.object(object) &&
            object.then instanceof FUNCTION;
}

function createPromise(instance) {
    var Class = Promise;
    if (!(instance instanceof Class)) {
        instance = OBJECT.buildInstance(Class);
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
            F = FUNCTION,
            state = me.__state,
            success = state[INDEX_STATUS],
            list = state[INDEX_PENDING],
            instance = createPromise();
            
        function run(success, data) {
            var handle = success ? onFulfill : onReject;
            if (handle instanceof F) {
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
if (!(G.Promise instanceof FUNCTION)) {
    G.Promise = Promise;
}

module.exports = Promise;
G = null;
