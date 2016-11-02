'use strict';

var processor = require("../processor.js");

var namespace = processor.middleware('test.innerTest');



console.log('-----------------------------middleware');
namespace.register('after:listen',
    function () {
        console.log('listen ', arguments);
    });

namespace.register('before:fire',
    function () {
        console.log('before fire ', arguments);
    });

namespace.register('unlisten',
    function () {
        console.log('unlisten ', arguments);
    });




processor.run('test.innerTest.listen', ['listen event', {label: 'diko'}]);

namespace.run('before:fire', ['before fire event', {label: 'diko'}]);


console.log('-----------------------------end');



