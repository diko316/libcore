'use strict';


describe('Inspects if Mixed [subject] is Scalar using scalar(subject:Mixed)',
        () => {
            var lib = global.libcore;
            
            it('1. Should accept Mixed [subject] and returns true if ' +
               '[subject] is Number and is Finite.',
               () => {
                    
                    expect(lib.scalar(101)).toBe(true);
                    expect(lib.scalar(0xff)).toBe(true);
                    expect(lib.scalar(NaN)).toBe(false);
               });
            
            
            it('2. Should accept Mixed [subject] and returns true if ' +
               '[subject] is String (empty or not empty).',
               () => {
                    
                    expect(lib.scalar("")).toBe(true);
                    expect(lib.scalar("not empty")).toBe(true);
               });
            
            it('3. Should accept Mixed [subject] and returns true if ' +
               '[subject] is Boolean.',
               () => {
                    
                    expect(lib.scalar(true)).toBe(true);
                    expect(lib.scalar(false)).toBe(true);
               });
            
            it('4. Should accept Mixed [subject] and returns false if ' +
               '[subject] is not String, Finite Number, or Boolean.',
               () => {
                    
                    expect(lib.scalar(null)).toBe(false);
                    expect(lib.scalar(new Date())).toBe(false);
                    expect(lib.scalar(undefined)).toBe(false);
                    expect(lib.scalar(/test/)).toBe(false);
               });
        });