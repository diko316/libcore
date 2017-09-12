'use strict';


describe(`Inspects if Mixed [subject] is iterable object using 
         iterable(subject:Mixed)`,
    () => {
        var lib = global.libcore;
        
        it(`1. Should accept any type of [subject] parameter and 
           returns true if [subject] is not scalar or has "length" 
           number property.`,
           () => {
            
                var phony;
                
                
                expect(lib.iterable('my string')).toBe(true);
                expect(lib.iterable([])).toBe(true);
                
                phony = { length: 0 };
                expect(lib.iterable(phony)).toBe(true);
                
                phony = new Date();
                phony.length = 1;
                expect(lib.iterable(phony)).toBe(true);
            
           });
        
        it(`2. Should accept any type of [subject] parameter and
           returns false if [subject] is scalar or has no "length" 
           number property.`,
           () => {
                var phony;
                
                expect(lib.iterable(1)).toBe(false);
                expect(lib.iterable(null)).toBe(false);
                expect(lib.iterable(false)).toBe(false);
                
                expect(lib.iterable({})).toBe(false);
                
                phony = new Date();
                expect(lib.iterable(phony)).toBe(false);
                
            
           });
        
        
    });