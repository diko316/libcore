'use strict';

var PROMISE = require("../promise.js");

console.log('run');

var promise = PROMISE(function (resolve) {
        resolve({ name: "resolved" });
    }).
    then(function (data) {
        console.log('success: ', data);
    });




PROMISE.all([
    new PROMISE(function (resolve) {
        resolve('first');
    }),
    new PROMISE(function (resolve) {
        resolve('second');
    }),
    new PROMISE(function (resolve) {
        resolve('third');
    })
]).then(function (result) {
    console.log('all result: ', result);
},
function (e) {
    console.log('all error: ', e);
});



PROMISE.all([
    new PROMISE(function (resolve) {
        resolve('first');
    }),
    new PROMISE(function (resolve) {
        resolve('second');
    }),
    new PROMISE(function (resolve, reject) {
        reject('third');
    })
]).then(function (result) {
    console.log('all result: ', result);
},
function (e) {
    console.log('all error: ', e);
});



(new PROMISE(function (resolve) {
    resolve('first');
})).
    then(function (data) {
        var reject = PROMISE.reject('test ');
        console.log(data, ' reject: ', reject);
        return reject;
    }).
    catch(function (e) {
            console.log('error: ', e);
            return 'back to resolved';
        }).
    then(function (data) {
        console.log('catch: ', data);
    });




