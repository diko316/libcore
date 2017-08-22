'use strict';


describe('Inspects if Mixed [subject] is RegExp using regex(subject:Mixed)',
        () => {
            var lib = global.libcore;
            
            it('1. Should accept Mixed [subject] and returns true if ' +
               '[subject] is a RegExp object.',
               () => {
                    expect(lib.regex(/test/)).toBe(true);
                    expect(lib.regex(new RegExp('abc'))).toBe(true);
               });
            
            it('2. Should accept Mixed [subject] and returns false if ' +
               '[subject] is not a RegExp object.',
               () => {
                    
                    expect(lib.regex(null)).toBe(false);
                    expect(lib.regex(new Date())).toBe(false);
                    expect(lib.regex(NaN)).toBe(false);
                    expect(lib.regex(1)).toBe(false);
                    expect(lib.regex({})).toBe(false);
               });
            
            
        });