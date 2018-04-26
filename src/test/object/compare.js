'use strict';

import {
    compare,
    clone
} from '../../object';

describe(`Deep compares two Native or non-Native Javascript objects using 
         compare(object1:Mixed, object2:Mixed) method`,
    () => {
        var objectSubject, arraySubject, regexSubject, dateSubject;
                
        beforeEach(() => {
            
            objectSubject = {
                id: "id1",
                name: "diko",
                0: 'testitem',
                length: 1,
                now: new Date(),
                inside: {
                    name: "sub1",
                    id: "subId1",
                    subNow: new Date()
                }
            };
            
            arraySubject = ['test', 'at', 'array',
                                ['another', 'set']];
            
            regexSubject = /new/;
            dateSubject = new Date();
        });
        
        
        it(`1. Should accept any [object1] and [object2] parameters 
           returning true if [object1] is the same as [object2]. 
           returns false otherwise.`,
           () => {
            
                expect(compare(objectSubject, arraySubject)).toBe(false);
                expect(compare(objectSubject,
                                   clone(objectSubject))).toBe(true);
                expect(compare(objectSubject,
                                   clone(objectSubject, true))).toBe(true);
                
                expect(compare(arraySubject,
                                   clone(arraySubject))).toBe(true);
                
                expect(compare(arraySubject,
                                   clone(arraySubject, true))).toBe(true);
                expect(compare(null, undefined)).toBe(false);
                expect(compare(null, null)).toBe(true);
                expect(compare(undefined, null)).toBe(false);
                expect(compare(regexSubject,
                                   clone(regexSubject))).toBe(true);
                
                expect(compare(dateSubject,
                                   clone(dateSubject))).toBe(true);
            
           });
        
        
    });