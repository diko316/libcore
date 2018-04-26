'use strict';

import * as DETECT from "./detect.js";

export {
    DETECT as env
};

export {
    each,
    assign,
    rehash,
    contains,
    instantiate,
    clone,
    compare,
    fillin,
    clear,
    maxObjectIndex
} from "./object.js";

export {
    setAsync,
    clearAsync,
    run,
    register,
    clearRunner,
    middleware
} from "./processor.js";

export {
    object,
    OBJECT,
    ARRAY,
    NULL,
    UNDEFINED,
    NUMBER,
    STRING,
    BOOLEAN,
    METHOD,
    FUNCTION,
    DATE,
    REGEX,
    signature,
    nativeObject,
    string,
    number,
    scalar,
    array,
    method,
    date,
    regex,
    thenable,
    iterable,
    type
} from "./type.js";

export {
    unionList,
    intersectList,
    differenceList
} from "./array.js";

export {
    camelize,
    uncamelize,
    utf2bin,
    bin2utf,
    encode64,
    decode64,
    trim
} from "./string.js";

export {
    jsonParsePath,
    jsonFind,
    jsonCompare,
    jsonClone,
    jsonEach,
    jsonSet,
    jsonUnset,
    jsonFill,
    jsonExists
}  from "./json.js";

export { default as createRegistry } from "./registry.js";

export { default as Promise } from "./promise.js";

