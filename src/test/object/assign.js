'use strict';


import { assign } from '../../object';

describe(`Apply properties of source object to target object using 
         assign(target:Object|Function, 
                source:Object|Function, 
                [defaults:Object, 
                ownedOnly:Boolean]) method`,
    () => {
        
        var fnSubject = function () {},
            subject = {
                id: fnSubject.id = "diko",
                value: fnSubject.value = 143,
                method: fnSubject.method = function () {
                            console.log("meth");
                        }
            };
        
        it(`1. Should accept Object as first "target" parameter.`,
            () => {
                var target = {},
                    source = subject;
                
                expect(() => assign(target, source)).not.toThrow();
                expect(source).toEqual(target);
                
            });
        
        it(`2. Should accept Native Object as first "target" parameter.`,
            () => {
                var target = function () {},
                    source = subject;
                
                expect(() => assign(target, source)).not.toThrow();
                expect(source.id).toBe(target.id);
                expect(source.value).toBe(target.value);
                expect(source.method).toBe(target.method);
                
            });
        
        it(`3. Should not accept non-Native Object as 
            first "target" parameter.`,
            () => {
                
                var source = subject;
                
                expect(() => assign(null, source)).toThrow();
                expect(() => assign("null", source)).toThrow();
                expect(() => assign(1056, source)).toThrow();
                expect(() => assign(new Date(), source)).not.toThrow();
                
            });
        
        it(`4. Should accept Object as 2nd "source" parameter.`,
            () => {
                var target = {},
                    source = subject;
                
                expect(() => assign(target, source)).not.toThrow();
                expect(source).toEqual(target);
                    
            });
        
        it(`5. Should accept Native Object as 2nd "source" parameter.`,
            () => {
                var target = {},
                    source = fnSubject;
                
                expect(() => assign(target, source)).not.toThrow();
                expect(source.id).toBe(target.id);
                expect(source.value).toBe(target.value);
                expect(source.method).toBe(target.method);
                    
            });
        
        it(`6. Should not accept non-Native Object as 
            2nd "source" parameter.`,
            () => {
                
                var target = {};
                
                expect(() => assign(target, null)).toThrow();
                expect(() => assign(target, "null")).toThrow();
                expect(() => assign(target, 1056)).toThrow();
                expect(() => assign(target, new Date())).not.toThrow();
                
            });
        
        it(`7. Should accept 3rd optional "defaults" Native Object parameter.`,
            () => {
                var target = {},
                    source = subject,
                    defaults = {
                        extra: "default",
                        "another-extra": "another"
                    };
                
                expect(() => assign(target, source, defaults)).
                    not.toThrow();
                    
                expect(target).toEqual({
                    id: source.id,
                    value: source.value,
                    method: source.method,
                    extra: defaults.extra,
                    "another-extra": defaults["another-extra"]
                });
                
            });
        
        it(`8. Should not accept non-Native Object 3rd optional 
           "defaults" parameter.`,
            () => {
                var target = {},
                    source = subject;
                expect(() => assign(target, source, null)).toThrow();
                expect(() => assign(target, source, "null")).toThrow();
                expect(() => assign(target, source, 100)).toThrow();
            });
        
    });
