'use strict';


describe(`Converts String [subject] to Camel cased String using 
         camelize(subject:String) method`,
    () => {
        var lib = global.libcore;
        
        it(`1. Should accept String [subject] and returns camel cased String 
           where non-alphabet characters are removed and change next 
           alphabet character to upper-case.`,
           () => {
            
                expect(() => lib.camelize('ads-b-ds')).not.toThrow();
                
                expect(lib.camelize('ads-b-ds')).toBe('adsBDs');
                
                expect(lib.camelize('ads-)(*b_%+-ds')).toBe('adsBDs');
                
           });
        
        it(`2. Should not accept non-String [subject] and 
           throw error instead.`,
           () => {
            
                expect(() => lib.camelize(1)).toThrow();
                expect(() => lib.camelize(null)).toThrow();
                expect(() => lib.camelize(new Date())).toThrow();
                
           });
    });