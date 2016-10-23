'use strict';

var DETECT = require('./detect.js'),
    OBJECT = require('./object.js'),
    A = Array.prototype,
    EXPORTS = {
        
    };
    
    
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


function union(array, array2, clone) {
    var subject, l, len, total;
    
    array = clone !== false ? array : array.slice(0);
    
    // apply
    array.push.apply(array, array2);
    total = array.length;
    
    // apply unique
    found: for (l = total; l--;) {
        subject = array[l];
        
        // remove if not unique
        for (len = total; len--;) {
            if (l !== len && subject === array[len]) {
                total--;
                array.splice(l, 1);
                continue found;
            }
        }
    }
    
    return array;
}

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

OBJECT.assign(EXPORTS, {
    unionList: union,
    intersectList: intersect,
    differenceList: difference
});

module.exports = EXPORTS;