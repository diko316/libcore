'use strict';


describe('Converts String [subject] to Snaked cased "-" delimited String ' +
         'using uncamelize(subject:String) method',
    () => {
        var lib = global.libcore;
        
        it('1. Should accept String [subject] and returns snake cased ' +
           ' "-" delimited String and next upper-cased alphabet character ' +
           'is onverted to lower-case.',
           () => {
            
                expect(() => lib.uncamelize('adsBDs')).not.toThrow();
                
                expect(lib.uncamelize('adsBDs')).toBe('ads-b-ds');
                
                expect(lib.uncamelize('testMethod')).toBe('test-method');
                
           });
        
        it('2. Should not accept non-String [subject] and ' +
           'throw error instead.',
           () => {
            
                expect(() => lib.uncamelize(1)).toThrow();
                expect(() => lib.uncamelize(null)).toThrow();
                expect(() => lib.uncamelize(new Date())).toThrow();
                
           });
    });