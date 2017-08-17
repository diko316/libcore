'use strict';

var TYPE = require("./type.js"),
    OBJECT = require("./object.js"),
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
        throw new Error("Invalid [path] parameter.");
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
    var context, name;
    
    if (!T.string(path)) {
        throw new Error("Invalid [path] parameter.");
    }
    
    // main subject should be accessible and native object
    context = [void(0), subject, false, false];
    eachPath(path, onRemovePath, context);
    
    name = context[2];
    // found! and must be removed
    if (name !== false) {
        subject = context[1];
        
        // remove item
        if (T.array(subject) && NUMERIC_RE.test(name)) {
            subject.splice(name * 1, 1);
        }
        else {
            delete context[1][name];
        }
    }
    
    return context[3];
}


//function assignOld(path, subject, value, overwrite) {
//    var type = TYPE,
//        has = OBJECT.contains,
//        array = type.array,
//        object = type.object,
//        apply = type.assign,
//        parent = subject,
//        numericRe = NUMERIC_RE;
//    var items, c, l, item, name, numeric, property, isArray, temp;
//    
//    if (object(parent) || array(parent)) {
//        eachPath(path, getItemsCallback, items = []);
//        
//        if (items.length) {
//            name = items[0];
//            items.splice(0, 1);
//            
//            for (c = -1, l = items.length; l--;) {
//                item = items[++c];
//                numeric = numericRe.test(item);
//                
//                // finalize
//                if (has(parent, name)) {
//                    property = parent[name];
//                    isArray = array(property);
//                    
//                    // replace property into object or array
//                    if (!isArray && !object(property)) {
//                        if (numeric) {
//                            property = [property];
//                        }
//                        else {
//                            temp = property;
//                            property = {};
//                            property[""] = temp;
//                        }
//                    }
//                    // change property to object to support "named" property
//                    else if (isArray && !numeric) {
//                        property = apply({}, property);
//                        delete property.length;
//                    }
//                    
//                }
//                else {
//                    property = numeric ? [] : {};
//                }
//                
//                parent = parent[name] = property;
//                name = item;
//                
//            }
//            
//            if (overwrite !== true && has(parent, name)) {
//                property = parent[name];
//                
//                // append
//                if (array(property)) {
//                    parent = property;
//                    name = parent.length;
//                }
//                else {
//                    parent = parent[name] = [property];
//                    name = 1;
//                }
//            }
//            
//            parent[name] = value;
//    
//            parent = value = property = temp = null;
//            
//            return true;
//        
//        }
//        
//        
//    }
//    return false;
//}


//function removeCallback(item, last, operation) {
//    var subject = operation[0];
//    var isLength;
//    
//    if (!isAccessible(subject, item)) {
//        return false;
//    }
//    
//    // set
//    if (last) {
//        if (TYPE.array(subject)) {
//            isLength = item === 'length';
//            subject.splice(isLength ?
//                                0 : item.toString(10),
//                            isLength ?
//                                subject.length : 1);
//        }
//        else {
//            delete subject[item];
//        }
//        
//        operation[1] = true;
//    }
//    else {
//        operation[0] = subject[item];
//    }
//    
//}
//
//function removeOld(path, object) {
//    var operation = [object, false];
//    eachPath(path, removeCallback, operation);
//    operation[0] = null;
//    return operation[1];
//}

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