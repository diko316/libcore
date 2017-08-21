'use strict';

describe('Encodes UTF-16 characters [subject] to ASCII safe string using ' +
         'utf2bin(subject:String) method',
    () => {
        var lib = global.libcore,
            subject = 'MZ  ÿÿ @ €';;
        
        it('1. Should accept String [subject] and returns ' +
           'ASCII safe characters',
           () => {
            
                expect(() => lib.utf2bin(subject)).
                    not.toThrow();
                
                expect(lib.utf2bin(subject)).
                    toBe(unescape(encodeURIComponent(subject)));
                    
                expect(lib.utf2bin(subject)).
                    toBe("MZ  Ã¿Ã¿ @ â¬");
                    
           });
        
        it('2. Should not accept non-String [subject] parameter ' +
           'and throws error instead.',
           () => {
            
                expect(() => lib.utf2bin(null)).
                    toThrow();
                
                expect(() => lib.utf2bin(new Date())).
                    toThrow();
                    
                expect(() => lib.utf2bin(1)).
                    toThrow();
           });
    });