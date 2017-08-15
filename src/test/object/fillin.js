'use strict';


describe('Apply properties of [source] object to [target] object only if ' +
         ' property in [target] do not exist or ' +
         ' not an updated property using ' +
        ' fillin(target:Object|Function, ' +
                'source:Object|Function, ' +
                '[hasown:Boolean]) method',
    () => {
        
        var lib = global.libcore;
        var subject, filler;
            
        beforeEach(() => {
            subject = {
                id: "diko",
                value: 143,
                method: function () {
                    console.log("meth");
                }
            };
            filler = {
                fillPropety: "fill",
                fillMethod: function () {
                    console.log("filling it with metho!");
                }
            };
        });
        
        
        it('1. Should only accept [target] Native Javascript Object or ' +
           'Function parameter.',
           () => {
                expect(() => lib.fillin(null, filler)).toThrow();
                expect(() => lib.fillin(new Date(), filler)).toThrow();
                //expect(() => lib.fillin(undefined, filler)).toThrow();
                //expect(() => lib.fillin(1, filler)).toThrow();
                //expect(() => lib.fillin(subject, filler)).not.toThrow();
           });
        
        it('2. Should only accept [source] Native Javascript Object or ' +
           'Function parameter.',
           () => {
                expect(() => lib.fillin(subject, null)).toThrow();
                expect(() => lib.fillin(subject, new Date())).toThrow();
                expect(() => lib.fillin(subject, undefined)).toThrow();
                expect(() => lib.fillin(subject, 1)).toThrow();
                expect(() => lib.fillin(subject, filler)).not.toThrow();
           });
        
        
        it('3. Should optionally accept [hasown] Boolean true ' +
           ' to only use updated properties from [source] or false ' +
           ' to use all enumerable properties from [source].',
           () => {
                var toCompare = lib.clone(subject);
                var newFiller;
                function Empty() {
                }
                Empty.prototype = filler;
                newFiller = new Empty();
                
                expect(lib.fillin(subject,
                                  newFiller,
                                  false)).toEqual(toCompare);
                
                lib.assign(toCompare, filler);
                expect(lib.fillin(subject,
                                  filler,
                                  true)).toEqual(toCompare);
                
           });
        
    });