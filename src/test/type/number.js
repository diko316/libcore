'use strict';


describe('Checks if Mixed [subject] is Number using number(subject:Mixed)',
        () => {
            var lib = global.libcore;
            
            it('1. Should accept Mixed [subject] and returns true if ' +
               '[subject] is a Number and is Finite.',
               () => {
                    
                    expect(lib.number(101)).toBe(true);
                    expect(lib.number(0xff)).toBe(true);
               });
            
            it('2. Should accept Mixed [subject] and returns false if ' +
               '[subject] is not a Number or not Finite.',
               () => {
                    
                    expect(lib.number(null)).toBe(false);
                    expect(lib.number(/test/)).toBe(false);
                    expect(lib.number(NaN)).toBe(false);
               });
            
            
        });