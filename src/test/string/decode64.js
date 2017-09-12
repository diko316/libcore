'use strict';


describe(`decodes a base 64 encoded String [subject] into
         ASCII 256 bit string using encode64(subject:String) method`,
    () => {
        
        var lib = global.libcore;
        
        it(`1. Should accept base 64 encoded String [subject] and 
           return ASCII 256 bit string`,
           () => {
                var subject = 'TVogAyAEw7/DvyBAIOKCrA==';
                
                expect(() => lib.decode64(subject)).not.toThrow();
                expect(lib.decode64(subject)).
                    toBe('MZ  ÿÿ @ €');
                expect(decodeURIComponent(escape(atob(subject)))).
                    toBe('MZ  ÿÿ @ €');
           });
        
        it(`2. Should not accept String [subject] parameter with
           non-base 64 encode character throws error.`,
           () => {
                expect(() => lib.decode64('MZ  ÿÿ @ €')).
                    toThrow();
                
           });
        
        it(`3. Should not accept non String [subject] parameter and 
           throws error instead`,
           () => {
                expect(() => lib.encode64(true)).toThrow();
                expect(() => lib.encode64(null)).toThrow();
                expect(() => lib.encode64(new Date())).toThrow();
                
           });
    });
