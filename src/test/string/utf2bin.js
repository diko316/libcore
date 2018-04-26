'use strict';


import { utf2bin } from '../../string';

describe(`Encodes UTF-16 characters [subject] to ASCII safe string using 
         utf2bin(subject:String) method`,
    () => {
        var subject = 'MZ  ÿÿ @ €';
        
        it(`1. Should accept String [subject] and returns 
           ASCII safe characters`,
           () => {
            
                expect(() => utf2bin(subject)).
                    not.toThrow();
                
                expect(utf2bin(subject)).
                    toBe(unescape(encodeURIComponent(subject)));
                    
                expect(utf2bin(subject)).
                    toBe("MZ  Ã¿Ã¿ @ â¬");
                    
           });
        
        it(`2. Should not accept non-String [subject] parameter 
           and throws error instead.`,
           () => {
            
                expect(() => utf2bin(null)).
                    toThrow();
                
                expect(() => utf2bin(new Date())).
                    toThrow();
                    
                expect(() => utf2bin(1)).
                    toThrow();
           });
    });