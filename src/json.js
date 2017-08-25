'use strict';

import {
            string,
            method,
            array,
            object,
            signature as typeSignature,
            NUMBER,
            STRING,
            BOOLEAN,
            REGEX,
            DATE,
            ARRAY,
            OBJECT,
            METHOD
        } from "./type.js";

import {
            assign as objectAssign,
            clone as objectClone,
            compare as objectCompare,
            maxObjectIndex,
            contains
        } from "./object.js";

//TYPE = require("./type.js"),
//    OBJECT = require("./object.js"),


var NUMERIC_RE = /^([1-9][0-9]*|0)$/,
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




function onParsePath(property, last, context) {
    context[context.length] = property;
}



function isAccessible(subject, item) {
    var signature = typeSignature(subject);
    
    switch (signature) {
    case NUMBER:
        return isFinite(subject) && item in Number.prototype && signature;
        
    case STRING:
        return item in String.prototype && signature;
    
    case BOOLEAN:
        return item in Boolean.prototype && signature;
    
    case REGEX:
    case DATE:
    case ARRAY:
    case OBJECT:
    case METHOD:
        if (item in subject) {
            return signature;
        }
    }
    return false;
}

function isWritable(subject) {
    var signature = typeSignature(subject);
    
    switch (signature) {
    case REGEX:
    case DATE:
    case ARRAY:
    case OBJECT:
    case METHOD:
        return signature;
    }
    return false;
}

function isJSONWritable(subject) {
    var signature = typeSignature(subject);
    
    switch (signature) {
    case ARRAY:
    case OBJECT:
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




export
    function jsonParsePath(path) {
        var items = [];
        
        return jsonEach(path, onParsePath, items) && items.length ?
                    items : null;
        
    }
    
export
    function jsonFind(path, object) {
        var operation = [void(0), object];
        jsonEach(path, findCallback, operation);
        operation[1] = null;
        return operation[0];
    }
    
export
    function jsonCompare(path, object1, object2) {
        return objectCompare(jsonFind(path, object1), object2);
    }

export
    function jsonClone(path, object, deep) {
        return objectClone(jsonFind(path, object), deep === true);
    }
    
export
    function jsonEach(path, callback, arg1, arg2, arg3, arg4, arg5) {
        var map = STATE,
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
        
        if (!string(path)) {
            throw new Error(ERROR_PATH_INVALID);
        }
        
        if (!method(callback)) {
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
            // last
            if (last) {
                l = len - pending;
                for (; l--;) {
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
    
export
    function jsonSet(path, subject, value, overwrite) {
        var typeArray = ARRAY,
            apply = objectAssign,
            writable = isWritable;
        var context, name, current, valueSignature, currentSignature,
            arrayOperation, arrayPush, canApply;
        
        if (!string(path)) {
            throw new Error(ERROR_PATH_INVALID);
        }
        
        // main subject should be accessible and native object
        context = [void(0), subject, false];
        jsonEach(path, onPopulatePath, context);
        name = context[2];
        
        if (name !== false) {
            subject = context[1];
            valueSignature = writable(value);
            arrayOperation = array(subject) && NUMERIC_RE.test(name);
            
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
    
export
    function jsonUnset(path, subject) {
        var context, name, returnValue;
        
        if (!string(path)) {
            throw new Error(ERROR_PATH_INVALID);
        }
        
        // main subject should be accessible and native object
        context = [void(0), subject, false, false];
        jsonEach(path, onRemovePath, context);
        
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
                if (array(subject) && NUMERIC_RE.test(name)) {
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

export
    function jsonFill(path, subject, value) { //, overwrite) {
        var typeArray = ARRAY,
            getMax = maxObjectIndex,
            apply = objectAssign,
            has = contains,
            arrayIndexRe = ARRAY_INDEX_RE,
            iswritable = isJSONWritable,
            isSubjectArray = array(subject);
            
        var parent, c, l, item, parentIndex,
            property, arrayIndex, writable;
            
        
        
        if (!string(path)) {
            throw new Error(ERROR_PATH_INVALID);
        }
        
        // root subject should be an object
        if (!object(subject) && !isSubjectArray) {
            return false;
        }
        
        // unable to create items from path
        path = jsonParsePath(path);
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
    
export
    function jsonExists(path, subject) {
        var operation = [subject, false];
        
        jsonEach(path, existsCallback, operation);
        operation[0] = null;
        
        return operation[1];
    }
    
//export {
//    parsePath as jsonParsePath,
//    find as jsonFind,
//    compare as jsonCompare,
//    clone as jsonClone,
//    eachPath as jsonEach,
//    assign as jsonSet,
//    remove as jsonUnset,
//    fill as jsonFill,
//    exists as jsonExists
//}
