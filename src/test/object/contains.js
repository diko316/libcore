'use strict';


describe('Inspects property exists in an object using contains(subject:Mixed,' +
                                            'property:String|Number) method',
    () =>  {
        var lib = global.libcore;
        var subject;
        
        beforeEach(() =>  {
            subject = {
                id: "myId1",
                name: "diko",
                property: "myProperty",
                0: 'testItem',
                length: 1
            };
        });
        
        it('1. Should not accept non-Native Javascript Object [subject]',
            () => {
                expect(() => lib.contains(null, 'toString')).toThrow();
                expect(() => lib.contains(undefined, 'valueOf')).toThrow();
            });
        
        it('2. Should accept any Native Javascript Object [subject]',
            () => {
                expect(() => lib.contains(['item1'], '0')).
                                not.toThrow();
                expect(() => lib.contains(subject, 'len')).
                                not.toThrow();
                expect(() => lib.contains(new Date(), 'x')).
                                not.toThrow();
                expect(() => lib.contains(1, 'valueOf')).
                                not.toThrow();
                expect(() => lib.contains(/regex/, 'source')).
                                not.toThrow();
            });
        
        it('3. Should not accept non-String or ' +
           'non-Number [property] parameter.',
            () => {
                expect(() => lib.contains(subject, null)).
                                toThrow();
                expect(() => lib.contains(subject, undefined)).
                                toThrow();
                expect(() => lib.contains(subject, new Date())).
                                toThrow();
                expect(() => lib.contains(subject, /test/)).
                                toThrow();
                
            });
        
        it('4. Should accept String or Number [property] parameter.',
            () => {
                expect(() => lib.contains(subject, 0)).
                                not.toThrow();
                expect(() => lib.contains(subject, 'valueOf')).
                                not.toThrow();
                expect(() => lib.contains(subject, 'toString')).
                                not.toThrow();
                expect(() => lib.contains(subject, 'id')).
                                not.toThrow();
            });
        
        it('5. Should return true if [property] in [subject] exists ' +
           'and is an updated property.',
           () => {
                expect(lib.contains(subject, 'id')).toBe(true);
                expect(lib.contains(subject, 'name')).toBe(true);
                expect(lib.contains(subject, 'property')).toBe(true);
                expect(lib.contains(subject, 0)).toBe(true);
                expect(lib.contains(subject, 'length')).toBe(true);
           });
        
        it('6. Should return false if [property] in [subject] do not exists ' +
           'or not an updated property.',
           () => {
                expect(lib.contains(subject, 'valueOf')).toBe(false);
                expect(lib.contains(subject, 'toString')).toBe(false);
                expect(lib.contains(subject, 'bogus')).toBe(false);
                expect(lib.contains(subject, 1)).toBe(false);
                expect(lib.contains(subject, 'invalid')).toBe(false);
           });
    });