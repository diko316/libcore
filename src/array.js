'use strict';

var DETECT = require('./detect.js'),
    OBJECT = require('./object.js'),
    A = Array.prototype;

function indexOf(subject) {
    /*jshint validthis:true */
    var array = this,
        l = array.length,
        c = -1;
    
    for (; l--;) {
        if (subject === array[++c]) {
            array = null;
            return c;
        }
    }
    
    return -1;
}

function lastIndexOf(subject) {
    /*jshint validthis:true */
    var array = this,
        l = array.length;
        
    for (; l--;) {
        if (subject === array[l]) {
            array = null;
            return l;
        }
    }
    
    return -1;
}

/**
 * Creates a union of two arrays
 * @name libcore.unionList
 * @function
 * @param {Array} array1 - source array
 * @param {Array} array2 - array to merge
 * @param {boolean} [clone] - Filters array1 parameter with union of array2
 *                          if this parameter is false. It returns a new set
 *                          of array containing union of array1 and array2
 *                          otherwise.
 * @returns {Array} union of first two array parameters
 */
function union(array1, array2, clone) {
    var subject, l, len, total;
    
    array1 = clone !== false ? array1 : array1.slice(0);
    
    // apply
    array1.push.apply(array1, array2);
    total = array1.length;
    
    // apply unique
    found: for (l = total; l--;) {
        subject = array1[l];
        
        // remove if not unique
        for (len = total; len--;) {
            if (l !== len && subject === array1[len]) {
                total--;
                array1.splice(l, 1);
                continue found;
            }
        }
    }
    
    return array1;
}

/**
 * Creates an intersection of two arrays
 * @name libcore.intersect
 * @function
 * @param {Array} array1 - source array 
 * @param {Array} array2 - array to intersect
 * @param {boolean} [clone] - Filters array1 parameter with intersection of
 *                          array2 if this parameter is false. It returns a
 *                          new set of array containing intersection of
 *                          array1 and array2 otherwise.
 * @returns {Array} intersection of first two array parameters
 */
function intersect(array1, array2, clone) {
    var total1 = array1.length,
        total2 = array2.length;
    var subject, l1, l2;
        
    // create a copy
    array1 = clone !== false ? array1 : array1.slice(0);
    
    found: for (l1 = total1; l1--;) {
        subject = array1[l1];
        foundSame: for (l2 = total2; l2--;) {
            if (subject === array2[l2]) {
                // intersect must be unique
                for (l2 = total1; l2--;) {
                    if (l2 !== l1 && subject === array1[l2]) {
                        break foundSame;
                    }
                }
                continue found;
            }
        }
        array1.splice(l1, 1);
        total1--;
    }
    
    return array1;
}


/**
 * Creates a difference of two arrays
 * @name libcore.differenceList
 * @function
 * @param {Array} array1 - source array 
 * @param {Array} array2 - array to be applied as difference of array1
 * @param {boolean} [clone] - Filters array1 parameter with difference of array2
 *                          if this parameter is false. It returns a new set
 *                          of array containing difference of
 *                          array1 and array2 otherwise.
 * @returns {Array} difference of first two array parameters
 */
function difference(array1, array2, clone) {
     var total1 = array1.length,
        total2 = array2.length;
    var subject, l1, l2;
        
    // create a copy
    array1 = clone !== false ? array1 : array1.slice(0);
    
    found: for (l1 = total1; l1--;) {
        subject = array1[l1];
        
        // remove if found
        for (l2 = total2; l2--;) {
            if (subject === array2[l2]) {
                array1.splice(l1, 1);
                total1--;
                continue found;
            }
        }
        
        // diff must be unique
        for (l2 = total1; l2--;) {
            if (l2 !== l1 && subject === array1[l2]) {
                array1.splice(l1, 1);
                total1--;
                continue found;
            }
        }
    }
    
    return array1;
}





// apply polyfill
if (!DETECT.indexOfSupport) {
    OBJECT.assign(A, {
        indexOf: indexOf,
        lastIndexOf: lastIndexOf
    });
}

module.exports = {
    unionList: union,
    intersectList: intersect,
    differenceList: difference
};

