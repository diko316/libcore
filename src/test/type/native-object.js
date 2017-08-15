'use strict';

describe('Checks if Mixed [subject] is raw Native Javascript Object using ' +
         'nativeObject(subject:Mixed)',
        () => {
            var lib = global.libcore;
            
            it('1. Should accept Mixed [subject] and returns true if ' +
               '[subject] is a raw Native Javascript Object.',
               () => {
                    
                
                    expect(lib.nativeObject({})).toBe(true);
                    
               });
            
            it('2. Should accept Mixed [subject] and returns false if ' +
               '[subject] is not a raw Native Javascript Object or ' +
               'a sub class of Native Javascript Object.',
               () => {
                    var sample;
                    function Empty() {
                    }
                    Empty.prototype = { constructor: Empty };
                    sample = new Empty();
                    
                    expect(lib.nativeObject(null)).toBe(false);
                    expect(lib.nativeObject(/test/)).toBe(false);
                    expect(lib.nativeObject(sample)).toBe(false);
                    expect(lib.nativeObject(Empty)).toBe(false);
               });
            
            
        });