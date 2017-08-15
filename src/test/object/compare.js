'use strict';


describe('Deep compares two Native or non-Native Javascript objects using ' +
        ' compare(object1:Mixed, object2:Mixed) method',
    () => {
        var lib = global.libcore;
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
        
        
        it('1. Should accept any [object1] and [object2] parameters ' +
           'returning true if [object1] is the same as [object2]. ' +
           'returns false otherwise.',
           () => {
            
                expect(lib.compare(objectSubject, arraySubject)).toBe(false);
                expect(lib.compare(objectSubject,
                                   lib.clone(objectSubject))).toBe(true);
                expect(lib.compare(objectSubject,
                                   lib.clone(objectSubject, true))).toBe(true);
                
                expect(lib.compare(arraySubject,
                                   lib.clone(arraySubject))).toBe(true);
                
                expect(lib.compare(arraySubject,
                                   lib.clone(arraySubject, true))).toBe(true);
                expect(lib.compare(null, undefined)).toBe(false);
                expect(lib.compare(null, null)).toBe(true);
                expect(lib.compare(undefined, null)).toBe(false);
                expect(lib.compare(regexSubject,
                                   lib.clone(regexSubject))).toBe(true);
                
                expect(lib.compare(dateSubject,
                                   lib.clone(dateSubject))).toBe(true);
            
           });
        
        
    });