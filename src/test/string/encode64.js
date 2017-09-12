'use strict';


describe(`Encodes String [subject] into base 64 encoded string using 
         encode64(subject:String) method`,
    () => {
        
        var lib = global.libcore;
        
        it(`1. Should accept String [subject] and return base 64 
           encoded string`,
           () => {
                var subject = 'MZ  ÿÿ @ €',
                    result = 'TVogAyAEw7/DvyBAIOKCrA==';
                
                expect(() => lib.encode64(subject)).not.toThrow();
                expect(lib.encode64(subject)).
                    toBe(result);
                expect(btoa(unescape(encodeURIComponent(subject)))).
                    toBe(result);
           });
        
        it(`2. Should not accept non String [subject] parameter and 
           throws error instead`,
           () => {
                expect(() => lib.encode64(true)).toThrow();
                expect(() => lib.encode64(null)).toThrow();
                expect(() => lib.encode64(new Date())).toThrow();
                
           });
    });
