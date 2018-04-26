'use strict';

import { clone } from '../../object';

describe(`Clones Native Javascript objects using clone(data:Mixed,
                                                    [deep:Boolean]) method`,
    () => {
        var objectSubject, arraySubject, regexSubject;
                
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
        });
        
        it(`1. Should accept Native Javascript Object and returns another 
           instance of that object with the same properties.`,
           () => {
            
                expect(() => clone(objectSubject)).not.toThrow();
                expect(clone(objectSubject)).toEqual(objectSubject);
                expect(clone(objectSubject)).not.toBe(objectSubject);
                
                expect(() => clone(arraySubject)).not.toThrow();
                expect(clone(arraySubject)).toEqual(arraySubject);
                expect(clone(arraySubject)).not.toBe(arraySubject);
                
                expect(() => clone(regexSubject)).not.toThrow();
                expect(clone(regexSubject).source).
                            toEqual(regexSubject.source);
                expect(clone(regexSubject)).not.toBe(regexSubject);
                            
                expect(() => clone(123)).not.toThrow();
                expect(clone(123)).toBe(123);
                
                expect(() => clone('test')).not.toThrow();
                expect(clone('test')).toBe('test');
                
           });
        
        it(`2. Should accept non Native Javascript Object and 
           returns another instance of that object with the same properties.`,
           () => {
            
                expect(() => clone(null)).not.toThrow();
                expect(clone(null)).toBe(null);
                
                expect(() => clone(undefined)).not.toThrow();
                expect(clone(undefined)).toBe(undefined);
                
           });
        
        it(`3. Should accept optional Boolean true [deep] parameter 
           to enable deep cloning of array and object properties.`,
           () => {
                expect(() => clone(objectSubject, true)).not.toThrow();
                expect(clone(objectSubject, true)).toEqual(objectSubject);
                expect(clone(objectSubject, true).inside).
                    toEqual(objectSubject.inside);
                expect(clone(objectSubject, true).inside).
                    not.toBe(objectSubject.inside);
           });
        
        it(`4. Should accept optional Boolean false [deep] parameter 
           to enable shallow cloning of array and object properties.`,
           () => {
                expect(() => clone(objectSubject, false)).not.toThrow();
                expect(clone(objectSubject, false)).toEqual(objectSubject);
                expect(clone(objectSubject, false).inside).
                    toEqual(objectSubject.inside);
                expect(clone(objectSubject, false).inside).
                    toBe(objectSubject.inside);
           });
    });