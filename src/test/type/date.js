'use strict';


describe(`Inspects if Mixed [subject] is Date using date(subject:Mixed)`,
        () => {
            var lib = global.libcore;
            
            it(`1. Should accept Mixed [subject] and returns true if 
               [subject] is a Date object.`,
               () => {
                    expect(lib.date(new Date())).toBe(true);
               });
            
            it(`2. Should accept Mixed [subject] and returns false if 
               [subject] is not a Date object.`,
               () => {
                    
                    expect(lib.date(null)).toBe(false);
                    expect(lib.date(/test/)).toBe(false);
                    expect(lib.date(NaN)).toBe(false);
                    expect(lib.date(1)).toBe(false);
                    expect(lib.date({})).toBe(false);
               });
            
            
        });