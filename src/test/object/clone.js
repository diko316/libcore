'use strict';



describe('Clones Native Javascript objects using clone(data:Mixed,' +
                                                    '[deep:Boolean]) method',
    () => {
        var lib = global.libcore;
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
        
        it('1. Should accept Native Javascript Object and returns another ' +
           'instance of that object with the same properties.',
           () => {
            
                expect(() => lib.clone(objectSubject)).not.toThrow();
                expect(lib.clone(objectSubject)).toEqual(objectSubject);
                
                expect(() => lib.clone(arraySubject)).not.toThrow();
                expect(lib.clone(arraySubject)).toEqual(arraySubject);
                
                expect(() => lib.clone(regexSubject)).not.toThrow();
                expect(lib.clone(regexSubject).source).
                            toEqual(regexSubject.source);
                            
                expect(() => lib.clone(123)).not.toThrow();
                expect(lib.clone(123)).toBe(123);
                
                expect(() => lib.clone('test')).not.toThrow();
                expect(lib.clone('test')).toBe('test');
                
           });
        
        it('2. Should accept non Native Javascript Object and ' +
           'returns another instance of that object with the same properties.',
           () => {
            
                expect(() => lib.clone(null)).not.toThrow();
                expect(lib.clone(null)).toBe(null);
                
                expect(() => lib.clone(undefined)).not.toThrow();
                expect(lib.clone(undefined)).toBe(undefined);
                
           });
        
        it('3. Should accept optional Boolean true [deep] parameter ' +
           'to enable deep cloning of array and object properties.',
           () => {
                expect(() => lib.clone(objectSubject, true)).not.toThrow();
                expect(lib.clone(objectSubject, true)).toEqual(objectSubject);
                expect(lib.clone(objectSubject, true).inside).
                    toEqual(objectSubject.inside);
           });
    });