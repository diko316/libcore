# libcore
Kicks-start helpers for cross-browser libraries and different versions of nodejs

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


## Module API

Please refer to [API Documentation](https://diko316.github.io/libcore) for more information and usage of this library.


## License

This Project is fully Open Source [MIT](https://opensource.org/licenses/MIT) licensed.
