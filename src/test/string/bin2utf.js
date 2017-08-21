'use strict';

describe('Encodes ASCII in UTF-8 String [subject] to UTF-16 characters using ' +
         'bin2utf(subject:String) method',
    () => {
        var lib = global.libcore,
            subject = "MZ  Ã¿Ã¿ @ â¬";
        
        it('1. Should accept String [subject] and returns ' +
           'ASCII safe characters',
           () => {
            
                expect(() => lib.bin2utf(subject)).
                    not.toThrow();
                
                expect(lib.bin2utf(subject)).
                    toBe(decodeURIComponent(escape(subject)));
                    
                expect(lib.bin2utf(subject)).
                    toBe('MZ  ÿÿ @ €');
                    
           });
        
        it('2. Should not accept non-String [subject] parameter ' +
           'and throws error instead.',
           () => {
            
                expect(() => lib.bin2utf(null)).
                    toThrow();
                
                expect(() => lib.bin2utf(new Date())).
                    toThrow();
                    
                expect(() => lib.bin2utf(1)).
                    toThrow();
           });
    });