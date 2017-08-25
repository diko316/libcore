'use strict';

import * as object from "../object.js";

import * as libjson from "../json.js";


var redundant = {
                    label: "redundant",
                    child: {
                        name: "very"
                    }
                },
    sample = {
        name: "sample data",
        redundancy: {
            list: [ "name", "value", "last", redundant],
            anObject: {
                item: redundant
            }
        }
    };
    
redundant.child.owner = redundant;

console.log(' cloned: ', object.clone(sample));

console.log(' clone redundant: ', redundant, object.clone(redundant, true));

console.log(' compare object: sample, redundant', object.compare(sample, redundant));

console.log(' compare object: redundant, redundant', object.compare(redundant, redundant));

console.log(' compare object: cloned(redundant), redundant', object.compare(object.clone(redundant, true), redundant));




console.log(' -------------------------------------json fill');

var json = {};
libjson.jsonFill('root[]', json, 'root[]');
libjson.jsonFill('root[names][]', json, 'root[names][]');
libjson.jsonFill('root[names][]', json, 'root[names][]');
libjson.jsonFill('root[names][]', json, 'root[names][]');

libjson.jsonFill('root[][test]', json, 'root[][test]');
libjson.jsonFill('root[][test]', json, 'root[][test]');


console.log(json);


