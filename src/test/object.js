'use strict';

var object = require("../object.js"),
    redundant = {
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
object.fillJson(json, 'root[]', 'root[]');
object.fillJson(json, 'root[names][]', 'root[names][]');
object.fillJson(json, 'root[names][]', 'root[names][]');
object.fillJson(json, 'root[names][]', 'root[names][]');

object.fillJson(json, 'root[][test]', 'root[][test]');
object.fillJson(json, 'root[][test]', 'root[][test]');


console.log(json);


