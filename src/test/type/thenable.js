'use strict';


describe('Inspects if Mixed [subject] is thenable (Promise) object or ' +
         'object with then() method using thenable(subject:Mixed)',
    () => {
        var lib = global.libcore;
        
        it('1. Should accept any type of [subject] parameter and ' +
           'returns true if [subject] is a Promise object or object with ' +
           'then() method.',
           () => {
            
                var resolver = (resolve) => resolve(true);
                var phony;
                
                expect(lib.thenable(new Promise(resolver))).
                    toBe(true);
                expect(lib.thenable(Promise.resolve(1))).toBe(true);
                
                phony = { then: () => 1 };
                expect(lib.thenable(phony)).toBe(true);
                
                phony = function () {};
                phony.then = () => 1;
                expect(lib.thenable(phony)).toBe(true);
            
           });
        
        it('1. Should accept any type of [subject] parameter and ' +
           'returns false if [subject] is not a Promise object or ' +
           'object without then() method.',
           () => {
                var phony;
                
                expect(lib.thenable(1)).toBe(false);
                expect(lib.thenable(null)).toBe(false);
                expect(lib.thenable(false)).toBe(false);
                
                expect(lib.thenable({})).toBe(false);
                
                phony = function () {};
                expect(lib.thenable(phony)).toBe(false);
                
            
           });
        
        
    });