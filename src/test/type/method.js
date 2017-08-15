'use strict';


describe('Checks if Mixed [subject] is Function using ' +
         'method(subject:Mixed) method.',
        () => {
            var lib = global.libcore;
            
            it('1. Should accept Mixed [subject] and returns true if ' +
               '[subject] is Function.',
               () => {
                    
                    expect(lib.method(function() {})).toBe(true);
                    
               });
            
            it('2. Should accept Mixed [subject] and returns false if ' +
               '[subject] is not a Function.',
               () => {
                    
                    expect(lib.method(1)).toBe(false);
                    expect(lib.method(/test/)).toBe(false);
                    expect(lib.method({})).toBe(false);
                    expect(lib.method(new Date())).toBe(false);
                    
               });
            
            
        });