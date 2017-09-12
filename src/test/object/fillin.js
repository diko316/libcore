'use strict';


describe(`Apply properties of [source] object to [target] object only if 
        property in [target] do not exist or 
        not an updated property using 
        fillin(target:Object|Function,
                source:Object|Function, 
                [hasown:Boolean]) method`,
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
                id: 'filler',
                fillPropety: "fill",
                fillMethod: function () {
                    console.log("filling it with metho!");
                }
            };
        });
        
        
        it(`1. Should only accept [target] Native Javascript Object parameter.`,
           () => {
                expect(() => lib.fillin(null, filler)).toThrow();
                expect(() => lib.fillin(new Date(), filler)).not.toThrow();
                expect(() => lib.fillin(undefined, filler)).toThrow();
                expect(() => lib.fillin(1, filler)).toThrow();
           });
        
        it(`2. Should only accept [source] Native Javascript Object parameter.`,
           () => {
                expect(() => lib.fillin(subject, null)).toThrow();
                expect(() => lib.fillin(subject, new Date())).not.toThrow();
                expect(() => lib.fillin(subject, undefined)).toThrow();
                expect(() => lib.fillin(subject, 1)).toThrow();
                expect(() => lib.fillin(subject, filler)).not.toThrow();
           });
        
        
        it(`3. Should optionally accept [hasown] Boolean true 
            to only use updated properties from [source] or false 
            to use all enumerable properties from [source].`,
           () => {
                var fillin = lib.clone(subject),
                    compare = lib.clone(fillin);
                var newFiller, result;
                
                function Empty() {
                }
                Empty.prototype = filler;
                newFiller = new Empty();
                result = lib.fillin(fillin,
                                    newFiller,
                                    false);
                
                lib.assign(compare, newFiller);
                
                expect(result).toEqual(compare);
                expect(result.id).toBe(subject.id);
                
                
                fillin = lib.clone(subject);
                compare = lib.clone(fillin);
                result = lib.fillin(fillin,
                                    newFiller,
                                    true);
                
                expect(result).toEqual(compare);
                expect(result.id).toBe(compare.id);
                
           });
        
    });