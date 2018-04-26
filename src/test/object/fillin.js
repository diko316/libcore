'use strict';

import {
    fillin,
    clone,
    assign
} from '../../object';

describe(`Apply properties of [source] object to [target] object only if 
        property in [target] do not exist or 
        not an updated property using 
        fillin(target:Object|Function,
                source:Object|Function, 
                [hasown:Boolean]) method`,
    () => {
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
                expect(() => fillin(null, filler)).toThrow();
                expect(() => fillin(new Date(), filler)).not.toThrow();
                expect(() => fillin(undefined, filler)).toThrow();
                expect(() => fillin(1, filler)).toThrow();
           });
        
        it(`2. Should only accept [source] Native Javascript Object parameter.`,
           () => {
                expect(() => fillin(subject, null)).toThrow();
                expect(() => fillin(subject, new Date())).not.toThrow();
                expect(() => fillin(subject, undefined)).toThrow();
                expect(() => fillin(subject, 1)).toThrow();
                expect(() => fillin(subject, filler)).not.toThrow();
           });
        
        
        it(`3. Should optionally accept [hasown] Boolean true 
            to only use updated properties from [source] or false 
            to use all enumerable properties from [source].`,
           () => {
                var fillinValue = clone(subject),
                    compare = clone(fillinValue);
                var newFiller, result;
                
                function Empty() {
                }
                Empty.prototype = filler;
                newFiller = new Empty();
                result = fillin(fillinValue,
                                    newFiller,
                                    false);
                
                assign(compare, newFiller);
                
                expect(result).toEqual(compare);
                expect(result.id).toBe(subject.id);
                
                
                fillinValue = clone(subject);
                compare = clone(fillinValue);
                result = fillin(fillinValue,
                                    newFiller,
                                    true);
                
                expect(result).toEqual(compare);
                expect(result.id).toBe(compare.id);
                
           });
        
    });