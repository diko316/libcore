'use strict';


global.libcore = require("../index.js");


require("./type/signature.js");
require("./type/object.js");
require("./type/array.js");
require("./type/native-object.js");
require("./type/string.js");
require("./type/number.js");
require("./type/scalar.js");
require("./type/date.js");
require("./type/regex.js");
require("./type/type.js");
require("./type/iterable.js");
require("./type/thenable.js");

require("./string/encode64.js");
require("./string/decode64.js");
require("./string/utf2bin.js");
require("./string/bin2utf.js");
require("./string/camelize.js");
require("./string/uncamelize.js");

require("./array/union-list.js");
require("./array/intersect-list.js");
require("./array/difference-list.js");

require("./object/each.js");
require("./object/assign.js");
require("./object/fillin.js");
require("./object/rehash.js");
require("./object/contains.js");
require("./object/clone.js");
require("./object/compare.js");

require("./json/parse-path.js");
require("./json/find.js");
require("./json/compare.js");
require("./json/clone.js");
require("./json/set.js");
require("./json/unset.js");
require("./json/fill.js");
require("./json/exists.js");

require("./registry/get.js");
require("./registry/set.js");
require("./registry/assign.js");
require("./registry/unset.js");
require("./registry/exists.js");
require("./registry/find.js");
require("./registry/insert.js");
require("./registry/remove.js");
require("./registry/path-exists.js");

require("./promise/constructor.js");
require("./promise/all.js");
require("./promise/race.js");
