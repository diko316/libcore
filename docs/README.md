# Libcore API Guide


### Table of Contents
- [String](#string)
- [Array](#array)
- [Object](#object)
- [Type](#type)
- [Registry](#registry)
- [JSON](#json)
- [Promise](#promise)

## Installation

Libcore can be installed from NPM by running the lines
below in your working directory containing package.json file
for use in NodeJS, browserify or webpack.

```js
npm install libcore
```

## Usage

```js
var libcore = require("libcore");

libcore.encode64('Good Game!'); // R29vZCBHYW1lIQ==

// using es6 import
import { encode64 } from "libcore";

encode64('Good Game!'); // R29vZCBHYW1lIQ==
```
___


## String

#### `encode64(subject);`
> Encodes String [subject] into base 64 encoded string.

Param | Type | Details
--- | --- | ---
Subject | `String` | The string to be encoded.

**Returns**

`String` Base64 encoded string.

```js
encode64('MZ  ÿÿ @ €'); // TVogAyAEw7/DvyBAIOKCrA==
```
___

#### `decode64(subject);`
> Decodes a base 64 encoded String [subject] into ASCII 256 bit string.

Param | Type | Details
--- | --- | ---
Subject | `String` | The string to be decoded.

**Returns**

`String` ASCII 256 bit string.

```js
decode64('TVogAyAEw7/DvyBAIOKCrA=='); // MZ  ÿÿ @ €
```
___

#### `utf2bin(subject);`
> Encodes UTF-16 characters [subject] to ASCII safe string.

Param | Type | Details
--- | --- | ---
Subject | `String` | The string to be encoded.

**Returns**

`String` ASCII safe characters.

```js
utf2bin('MZ  ÿÿ @ €'); // MZ  Ã¿Ã¿ @ â¬
```
___

#### `bin2utf(subject);`
> Encodes ASCII in UTF-8 String [subject] to UTF-16 characters.

Param | Type | Details
--- | --- | ---
Subject | `String` | The string to be encoded.

**Returns**

`String` ASCII safe characters.

```js
bin2utf('MZ  Ã¿Ã¿ @ â¬'); // MZ  ÿÿ @ €
```
___

#### `camelize(subject);`
> Converts String [subject] to Camel cased String.

Param | Type | Details
--- | --- | ---
Subject | `String` | The string to be converted.

**Returns**

`String` Camel cased String where non-alphabet characters are
        removed and change next alphabet character to upper-case.

```js
camelize('ads-b-ds'); // adsBDs
camelize('ads-)(*b_%+-ds')) // 'adsBDs'
```
___

#### `uncamelize(subject);`
> Converts String [subject] to Snaked cased "-" delimited String.

Param | Type | Details
--- | --- | ---
Subject | `String` | The string to be encoded.

**Returns**

`String` Snake cased "-" delimited String and next upper-cased alphabet
        character is onverted to lower-case.

```js
uncamelize('adsBDs'); // ads-b-ds
uncamelize('testMethod'); // test-method
```
___


## Array

#### `unionList(array1, array2, clone);`
> Populates [array1] or Creates a union of Array [array1] and [array2].

Param | Type | Details
--- | --- | ---
source | `Array` | The source array to merge from.
from   | `Array` | The array to merge to the source.
clone _(optional)_ | `Boolean` | Filters array1 parameter with union of array2 if this parameter is false. It returns a new set of array containing union of array1 and array2 otherwise.

**Returns**

`Array` Union of first two array parameters.

```js
var array1 = ['abc', 'def', 'g', 89, 'g', 'abc'],
    array2 = [9, 2, 89, 0, 'abc', 'g']
    result = unionList(array1, array2);

console.log(result); // ['abc', 'def', 'g', 89, 9, 2, 0]

// array1 is the result as the reference pointer
console.log(result === array1); // true

// 3rd parameter is passed
result = unionList(array1, array2, true);

// result is a new created array
console.log(result === array1); // false
```
___

#### `intersectList(array1, array2, clone);`
> Populates [array1] or Creates an intersection of Array [array1] and [array2].

Param | Type | Details
--- | --- | ---
source | `Array` | The source array to intersect from.
from   | `Array` | The array to intersect to the source.
clone _(optional)_ | `Boolean` | Filters array1 parameter with intersection of array2 if this parameter is false. It returns a new set of array containing intersection of array1 and array2 otherwise.

**Returns**

`Array` Intersection of first two array parameters.

```js
var array1 = ['abc', 'def', 'g', 89, 'g', 'abc'],
    array2 = [9, 2, 89, 0, 'abc', 'g'],
    result = intersectList(array1, array2);

console.log(result); // ['abc', 'g', 89]

// array1 is the result as the reference pointer
console.log(result === array1); // true

// 3rd parameter is passed
result = intersectList(array1, array2, true);

// result is a new created array
console.log(result === array1); // false
```
___

#### `differenceList(array1, array2, clone);`
> Populates [array1] or Creates a difference of Array [array1] and [array2].

Param | Type | Details
--- | --- | ---
source | `Array` | The source array to differ from.
from   | `Array` | The array to be applied as difference of the source.
clone _(optional)_ | `Boolean` | Filters array1 parameter with difference of array2 if this parameter is false. It returns a new set of array containing difference of array1 and array2 otherwise.

**Returns**

`Array` Difference of first two array parameters.

```js
var array1 = ['abc', 'def', 'g', 89, 'g', 'abc'],
    array2 = [9, 2, 89, 0, 'abc', 'g'],
    result = differenceList(array1, array2);

console.log(result); // ['def']

// array1 is the result as the reference pointer
console.log(result === array1); // true

// 3rd parameter is passed
result = differenceList(array1, array2, true);

// result is a new created array
console.log(result === array1); // false
```
___


## Object

#### `each(subject, handler, scope, hasown);`
> Iterates all iteratable property of an object calling "handler" parameter on each iteration.

Param | Type | Details
--- | --- | ---
subject | `Object` | The object source.
handler | `Function` | The callback of each iteration of "subject" object's property.
scope   | `{*}` | "this" object to use inside the "handler" parameter
hasown _optional_ | `Boolean` | performs checking to only include source object property that is overridden (Object.protototype.hasOwnProperty() returns true) when this parameter is set to true.

**Returns**

`Object` The subject parameter.

```js
function empty() {

}

var fn = function () {},
    result = each(fn, empty, null);

console.log(result === fn); // true
```
___

#### `assign(target, source, defaults, ownedOnly);`
> Apply properties of source object to target object.

Param | Type | Details
--- | --- | ---
target | `Object` | The target object.
source   | `Object` | The source object containing properties to be assigned to target object.
defaults _(optional)_  | `Object` | Object containing default properties which will be assigned first to target before source.
ownedOnly _(optional)_ | `Boolean` | Only assign properties owned by "source".

**Returns**

`Object` Object from first parameter.

```js
// # Sample 1
var target = {},
    source = {
        prop: "A",
        value: 100
    };

assign(target, source);

console.log(source === target); // true


// # Sample 2
var target = {},
    source = {
        prop: "A",
        value: 100
    },
    defaults = {
        extra: "default"
    };

assign(target, source, defaults); // 3rd parameter

console.log(target === { prop: "A", value: 100, extra: "default" }); // true
```
___

#### `rehash(target, source, access);`
> Remaps properties of an object into new property of another object.

Param | Type | Details
--- | --- | ---
target | `Object` | The target object.
source   | `Object` | The source object containing properties to be relocated.
access  | `Object` | The rename map object containing "renamed property" as map object's property name, and "source property name" as map object's property value. (e.g. { "newname": "from source" }).

**Returns**

`Object` Object from first parameter.

```js
var target = {},
    source = {
        pseudoName: 'file',
        pseudoId: 'a1'
    };

rehash(target, source, {
            "name": "pseudoName",
            "id": "pseudoId"
        })); // { name: 'file', id: 'a1' }    
```
___

#### `contains(subject, property);`
> Inspects property exists in an object.

Param | Type | Details
--- | --- | ---
subject | `Object` | The source object.
property | `String` | Property Name to inspect.

**Returns**

`Boolean` True if subject Object contains property and dirty.
        False if subject Object's property do not exist or not
        dirty.

```js
var person = { name: "Jane", age: 25 };

contains(person, "name"); // true
contains(person, "age"); // true
```
___

#### `clone(data, deep);`
> Clones Native Javascript objects.

Param | Type | Details
--- | --- | ---
data | `{*}` | Data - scalar, array, object, regex or date object to clone.
deep _(optional)_ | `Boolean` | Apply deep clone to object properties or array items.

**Returns**

`{*}` Cloned object based from data.

```js
var person = { name: "Jane", age: 25 },
    dupe = clone(person);

console.log(dupe) // { name: "Jane", age: 25 }
```
___

#### `compare(object1, object2);`
> Deep compares two Native or non-Native Javascript objects.

Param | Type | Details
--- | --- | ---
object1 | `{*}` | The object to compare.
object2 | `{*}` | The object to compare.

**Returns**

`Boolean` True if scalar, regex, date, object properties, or array items of object1 is identical to object2.

```js
var object1 = { name: "Jane", age: 25 },
    object2 = { name: "Jane", age: 25 },
    object3 = { name: "John", age: 25 };

compare(object1, object2); // true
compare(object1, object3); // false
compare(object2, object3); // false
```
___

#### `fillin(object1, object1);`
> Deep compares two Native or non-Native Javascript objects.

Param | Type | Details
--- | --- | ---
target | `Object` | The target object.
source | `Object` | The source object containing properties to be assigned to target object.
hasOwn | `Boolean` | Performs checking to only include source object property that is overridden (Object.protototype.hasOwnProperty() returns true) when this parameter is set to true.

**Returns**

`Boolean` Subject parameter.

```js
function Empty() {

}

var subject = { name: "A100", class: "upper" },
    compare = clone(subject),
    newFiller = new Empty(),
    result = fillin(subject, newFiller, false);

compare(result, compare); // true
```
___


## Type

#### `string(subject);`
> Inspects if Mixed [subject] is String.

Param | Type | Details
--- | --- | ---
subject | `{*}` | The subject to check.

**Returns**

`Boolean` True, if subject is a string type, false otherwise.

```js
string("test"); // true
string(new String("test")); // true
string(""); // false
string(null); // false
```
___

#### `number(subject);`
> Inspects if Mixed [subject] is Number.

Param | Type | Details
--- | --- | ---
subject | `{*}` | The subject to check.

**Returns**

`Boolean` True, if subject is a number type, false otherwise.

```js
number(101); // true
number(0xff); // true
number(null); // false
```
___

#### `array(subject);`
> Inspects if Mixed [subject] is Array.

Param | Type | Details
--- | --- | ---
subject | `{*}` | The subject to check.

**Returns**

`Boolean` True, if subject is an array type, false otherwise.

```js
array([]); // true
array(['withitem']); // true
```
___

#### `object(subject);`
> Inspects if Mixed [subject] is Native Javascript Object.

Param | Type | Details
--- | --- | ---
subject | `{*}` | The subject to check.

**Returns**

`Boolean` True, if subject is an object type, false otherwise.

```js
object({}); // true
object(null); // false
```
___

#### `regex(subject);`
> Inspects if Mixed [subject] is RegExp.

Param | Type | Details
--- | --- | ---
subject | `{*}` | The subject to check.

**Returns**

`Boolean` True, if subject is an regex type, false otherwise.

```js
regex(/test/); // true
regex(new RegExp('abc')); // true
regex(1); // false
regex({}); // false
```
___

#### `method(subject);`
> Inspects if Mixed [subject] is Function.

Param | Type | Details
--- | --- | ---
subject | `{*}` | The subject to check.

**Returns**

`Boolean` True, if subject is a function type, false otherwise.

```js
method(function() {}); // true
method(1);  // false
```
___

#### `signature(subject);`
> Retrieves normalized object information.

Param | Type | Details
--- | --- | ---
subject | `{*}` | The subject to check.

**Returns**

`String` The object's signature, eg. "[object String], [object Number]" etc.

```js
signature("test"); // '[object String]';
signature(1); // '[object Number]'
signature(true); // '[object Boolean]';
signature(new Date()); // '[object Date]'
signature(/test/); // '[object RegExp]'
signature(function () {}); // '[object Function]'
signature({}); // '[object Object]'
```
___

#### `scalar(subject);`
> Inspects if Mixed [subject] is Scalar.

Param | Type | Details
--- | --- | ---
subject | `{*}` | The subject to check.

**Returns**

`Boolean` True, if subject is a primitive or scalar type, false otherwise.

```js
scalar(101); // true
scalar("not empty"); // true
scalar(true); // true
scalar(null); // false
scalar(new Date()); // false
scalar(undefined); // false
scalar(/test/); // false
```
___

#### `date(subject);`
> Inspects if Mixed [subject] is Date.

Param | Type | Details
--- | --- | ---
subject | `{*}` | The subject to check.

**Returns**

`Boolean` True, if subject is a date type, false otherwise.

```js
date(new Date()); // true
date(1); // false
date({}); // false`
```
___

#### `nativeObject(subject);`
> Inspects if Mixed [subject] is raw Native Javascript Object.

Param | Type | Details
--- | --- | ---
subject | `{*}` | The subject to check.

**Returns**

`Boolean` True, if subject is a raw native Javascript object, false otherwise.

```js
var sample;

function Empty() {

}
Empty.prototype = { 'constructor': Empty };
sample = new Empty();

nativeObject(null); // false
nativeObject(/test/); // false
nativeObject(sample); // false
nativeObject(Empty); // false
nativeObject({}); // true
```
___

#### `type(subject, type);`
> Inspects if Mixed [subject] is an instance of simplified [type] signature.

Param | Type | Details
--- | --- | ---
subject | `{*}` | The subject to check.
type | `String` | The name of the type.

**Returns**

`Boolean` True, if subject is verified using the 2nd parameter, false otherwise.

```js
type("test", "string"); // true
type(/test/, "string"); // false
type(0xff, "number"); // true
type(true, "boolean"); // true
type(new Date(), "date"); // true
type([], "date"); // false
type({}, "date")); // false
```
___

#### `thenable(subject);`
> Inspects if Mixed [subject] is thenable (Promise) object or object.

Param | Type | Details
--- | --- | ---
subject | `{*}` | The subject to check.

**Returns**

`Boolean` True if subject is a Promise object or object with then() method, false otherwise.

```js
var resolver = (resolve) => resolve(true);

thenable(new Promise(resolver)); // true

var phony = function () {};
phony.then = () => 1;

thenable(phony); // true

thenable(1); // false
thenable(null); // false
thenable(false); // false
```
___

#### `iterable(subject);`
> Inspects if Mixed [subject] is iterable object.

Param | Type | Details
--- | --- | ---
subject | `{*}` | The subject to check.

**Returns**

`Boolean` True, if subject is not scalar or has "length" number property, false otherwise.

```js
iterable('my string'); // true
iterable([]); // true

var phony = { length: 0 };
iterable(phony); // true

iterable(1); // false
iterable(null); // false
iterable(false); // false
```
___


## Registry

#### `assign(value);`
> Assign [value] Object properties or Array items into the registry.

Param | Type | Details
--- | --- | ---
value | `Object | Array`  | The value to be assigned.

**Returns**

`Object` The registry object.

```js
// instantiate registry
var registry = createRegistry(),
    object1 = { "id": 100 };

// assigns object1
registry.assign(object1);
```
___

#### `exists(name);`
> Inspects the registry storage if String or Number [name] exists.

Param | Type | Details
--- | --- | ---
name | `String`  | The name of the registry.

**Returns**

`Boolean` True if indexed String or Number [name] exists in registry.

```js
// instantiate registry
var registry = createRegistry(),
    object1 = { "id": 100, "100": "^10" };

// assigns object1
registry.assign(object1);

registry.exists("id"); // true
registry.exists("name"); // false
registry.exists(100); // true
```
___

#### `find(path);`
> Retrieves registry value based from String json path [path].

Param | Type | Details
--- | --- | ---
path | `String`  | The name of the registry.

**Returns**

`{*}` The value that has been found.

```js
// instantiate registry
var registry = createRegistry(),
    object1 = {
        name: "Jane",
        "0": [{
            "id": 101,
            "value": 19,
            "label": "nineteen"
        }]
    };

// assigns object1
registry.assign(object1);

registry.find("name"); // 'Jane'
registry.find("[0].0.id"); // 101
```
___

#### `get(name);`
> Retrieves registry value based from [name] index.

Param | Type | Details
--- | --- | ---
path | `String`  | The name of the registry.

**Returns**

`{*}` The registry value.

```js
// instantiate registry
var registry = createRegistry(),
    object1 = {
        name: "Jane",
        "0": [{
            "id": 101,
            "value": 19,
            "label": "nineteen"
        }]
    };

// assigns object1
registry.assign(object1);

registry.get("name"); // 'Jane'
registry.get("0"); // object1[0]
```
___

#### `insert(path, value);`
> Inserts registry [value] into String json path [path] relative to registry storage.

Param | Type | Details
--- | --- | ---
path | `String`  | The path to the registry storage.
value | `{*}` | The value to be inserted.

**Returns**

`Object` The registry object.

```js
// instantiate registry
var registry = createRegistry(),
    object1 = {
        name: "Jane",
        "0": [{
            "id": 101,
            "value": 19,
            "label": "nineteen"
        }]
    },
    value = "Common";

// assigns object1
registry.assign(object1);

registry.insert("[0].0.id", value);
registry.find("[0].0.id"); // "Common"
```
___

#### `pathExists(path);`
> Inspects if String json [path] exists in registry.

Param | Type | Details
--- | --- | ---
path | `String`  | The path to be checked.

**Returns**

`Boolean` True, if the path exists, false otherwise.

```js
// instantiate registry
var registry = createRegistry(),
    object1 = {
        name: "Jane",
        "0": [{
            "id": 101,
            "value": 19,
            "label": "nineteen"
        }]
    },
    value = "Common";

// assigns object1
registry.assign(object1);

registry.pathExists("[0].0.id"); // true
registry.pathExists("name"); // true
registry.pathExists("0"); // true

registry.pathExists("[10].0.id"); // false
registry.pathExists("2[90].label"); // false
```
___

#### `remove(path);`
> Removes registry value with the given String json path [path] relative to registry storage.

Param | Type | Details
--- | --- | ---
path | `String`  | The path to the registry storage.

**Returns**

`Object` The registry object.

```js
// instantiate registry
var registry = createRegistry(),
    object1 = {
        name: "Jane",
        "0": [{
            "id": 101,
            "value": 19,
            "label": "nineteen"
        }]
    },
    value = "Common";

// assigns object1
registry.assign(object1);

registry.pathExists("name"); // true
registry.pathExists("0"); // true

registry.remove("name");
registry.remove("0");

registry.pathExists("name"); // false
registry.pathExists("0"); // false
```
___

### `set(name, value);`
> Sets registry [value] indexed with [name].

Param | Type | Details
--- | --- | ---
name | `String|Number|Object|Array`  | The name to set.
value | `{*}` | The value to set.

**Returns**

`Object` The registry object.

```js
// instantiate registry
var registry = createRegistry(),
    object1 = {
        name: "Jane",
        "0": [{
            "id": 101,
            "value": 19,
            "label": "nineteen"
        }]
    },
    value = "Common";

// assigns object1
registry.assign(object1);

registry.set("3", "another");
registry.get("3"); // 'another'

registry.set("5", "another one");
registry.get("5"); // 'another one'
```
___

### `unset(name);`
> Removes registry [value] indexed with [name].

Param | Type | Details
--- | --- | ---
name | `String|Number|Object|Array` | The name to unset.

**Returns**

`Object` The registry object.

```js
// instantiate registry
var registry = createRegistry(),
    object1 = {
        name: "Jane",
        "0": [{
            "id": 101,
            "value": 19,
            "label": "nineteen"
        }]
    },
    value = "Common";

// assigns object1
registry.assign(object1);

registry.set("3", "another");
registry.get("3"); // 'another'

registry.unset("3");
registry.get("3"); // undefined
```
___


## JSON

#### `jsonClone(path, object, deep);`
> Clone value extracted from [object] with given [path].

Param | Type | Details
--- | --- | ---
path | `String` | The string path to clone from.
data | `{*}` | Data - scalar, array, object, regex or date object to clone.
deep _(optional)_ | `Boolean` | Apply deep clone to object properties or array items.

**Returns**

`{*}` Cloned object based from data.

```js
var subject = {
        "grid": {
            "paging": {
                "limit": 20,
                "offset": 0
            }
        }
    };

jsonClone('grid.paging', subject); // equals to subject.grid.paging
```
___

#### `jsonCompare(path, object1, object2);`
> Compares value with [object2] where value is extracted from [object1] using [path] parameter.

Param | Type | Details
--- | --- | ---
path | `String` | The string path to compare from.
object1 | `{*}` | The object to compare.
object2 | `{*}` | The object to compare.

**Returns**

`Boolean` True if scalar, regex, date, object properties, or array items of object1 is identical to object2.

```js
var subject = {
        "grid": {
            "paging": {
                "limit": 20,
                "offset": 0
            }
        }
    };

jsonCompare('grid.paging.offset',
            subject,
            0); // true

jsonCompare('grid.paging',
            subject,
            20); // false
```
___

#### `jsonExists(path, subject);`
> Inspects a given Mixed [subject] if JSON [path] exists.

Param | Type | Details
--- | --- | ---
path | `String` | The string path to check.
subject | `{*}` | The subject to check.

**Returns**

`Boolean` True if JSON path exists in subject, false otherwise.

```js
var subject = {
        "grid": {
            "paging": {
                "limit": 20,
                "offset": 0
            }
        }
    };

jsonExists("grid['paging']", subject); // true
jsonExists("grid['paging'].offset", subject); // true

jsonExists("table", subject); // false
jsonExists("0[1].name", subject); // false
```
___

#### `jsonFill(path, subject, value);`
> Fill [subject] Object with property or array item with [value] accessed from [path].

Param | Type | Details
--- | --- | ---
path | `String` | The string path.
subject | `Object` | The subject to fill.
value | `{*}` | The value to be filled.

**Returns**

`Boolean` True.

```js
var subject = {};

jsonFill('grid.paging.offset',
                          subject,
                          0); // true

// subject.grid.paging.offset is 0
```
___

#### `jsonFind(path, object);`
> Retrieves Mixed value from a given JSON path.

Param | Type | Details
--- | --- | ---
path | `String` | The string path.
object | `{*}` | The subject to find from.

**Returns**

`{*}` The value that has been found, "undefined" otherwise.

```js
var subject = {
        "grid": {
            "paging": {
                "limit": 20,
                "offset": 0
            }
        }
    };

jsonFind("table", subject); // undefined
jsonFind("grid['paging'].offset", subject); // 0
jsonFind("grid['paging'].limit", subject); // 20
```
___

#### `jsonParsePath(path);`
> Extract property names from a JSON path.

Param | Type | Details
--- | --- | ---
path | `String` | The string path.

**Returns**

`Array` The extracted property names.

```js
var subject = 'grid.paging.offset';

jsonParsePath(subject); // ['grid', 'paging', 'offset']

jsonParsePath('[0]'); // ['0']

subject = 'grid["rows"].0.label.length';
jsonParsePath(subject); // ['grid','rows','0','label','length']
```
___

#### `jsonSet(path, subject, value, overwrite);`
> Set or Apply [value] into object extracted from [path].

Param | Type | Details
--- | --- | ---
path | `String` | The string path.
subject | `{*}` | Native non-scalar object.
value | `{*}` | The value to be set.
overwrite | `Boolean` | Trigger to apply overwrite.

**Returns**

`Boolean` True if value is set or applied, otherwise false.

```js
var subject = {
        "grid": {
            "paging": {
                "limit": 20,
                "offset": 0
            },
        }
    },
    path = 'grid.paging.limit',
    value = 10;

jsonSet(path, subject, value); // true

path = 'grid.paging.limit.test';
value = 10;

jsonSet(path, subject, value); // false
```
___

#### `jsonUnset(path, subject);`
> Removes property of non-Scalar Native Object.

Param | Type | Details
--- | --- | ---
path | `String` | The string path.
subject | `{*}` | The subject to unset.

**Returns**

`Boolean` True if property is found and removed, false otherwise.

```js
var subject = {
        "grid": {
            "paging": {
                "limit": 20,
                "offset": 0
            }
        }
    };

jsonUnset('grid.paging', subject); // true
jsonUnset('grid.paging.limit', subject); // false
jsonUnset('grid.paging.offset', subject); // false
```
___


## Promise

#### `all(iterable);`
> Creates a promise from [iterable] values or promises that resolves
 if all items in [iterable] fulfills or rejects if all items in
 [iterable] rejects.

Param | Type | Details
--- | --- | ---
iterable | `{*}` | Iterable object or Objects with "length" number of items.

**Returns**

`Object` The Promise object.

```js
var p = Promise, // assume imported Promise
    callback = {
            isRejected: false,
            result: null,

            fulfilled: (value) => {
                callback.result = value;
                return value;
            },

            rejected: (error) => {
                callback.isRejected = true;
                callback.result = error;
                return error;
            }
        };

P.all([1, 'test', P.resolve("100")]).
    then(callback.fulfilled,
         callback.rejected);    

 setTimeout(() => {    

    console.log(callback.isRejected); // false
    console.log(callback.result); //[1, 'test', "100"]

    // done

 }, 1000);
```
___

## Promise

#### `new Promise(resolver(resolve, reject));`
> Creates a promise from [iterable] values or promises that resolves
 if all items in [iterable] fulfills or rejects if all items in
 [iterable] rejects.

Param | Type | Details
--- | --- | ---
resolver | `Object` | The object resolver function.

**Returns**

`Object` The Promise object.

```js
var P = Promise, // assume imported Promise
    good = (resolve) => {
        resolve('good');
    };

(new P(good)).
then(resolver.goodResult,
     resolver.badResult);

 setTimeout(() => {
    // called with "good"
    console.log(resolver.goodResult);

    // not called
    // resolver.badResult

    // done
}, 10);
```
___

#### `race(iterable);`
> Creates a promise from [iterable] values or promises
 then resolves or rejects if one of the item in
 [iterable] is settled.

Param | Type | Details
--- | --- | ---
iterable | `{*}` | Iterable object or Objects with "length" number of items.

**Returns**

`Object` The Promise object.

```js
var p = Promise, // assume imported Promise
    callback = {
            isRejected: false,
            result: null,

            fulfilled: (value) => {
                callback.result = value;
                return value;
            },

            rejected: (error) => {
                callback.isRejected = true;
                callback.result = error;
                return error;
            }
        };

P.race([1, 'test', P.resolve("100")]).
    then(callback.fulfilled,
         callback.rejected);    

setTimeout(() => {    

    console.log(callback.isRejected); // false
    console.log(callback.result); // 1

    // done

}, 1000);
```
___
