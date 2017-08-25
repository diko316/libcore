'use strict';

import * as DETECT from "./detect.js";

export let env = DETECT;

export * from "./object.js";

export * from "./processor.js";

export * from "./type.js";
export * from "./array.js";
export * from "./string.js";
export *  from "./json.js";

export { default as createRegistry } from "./registry.js";

export { default as Promise } from "./promise.js";

