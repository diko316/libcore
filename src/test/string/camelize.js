'use strict';


describe('Converts String [subject] to Camel cased String using ' +
         'camelize(subject:String) method',
    () => {
        var lib = global.libcore;
        
        it('1. Should accept String [subject] and returns camel cased String ' +
           'where non-alphabet characters are removed and change next ' +
           'alphabet character to upper-case.',
           () => {
            
                expect(() => lib.camelize('ads-b-ds')).not.toThrow();
                
           });
    });