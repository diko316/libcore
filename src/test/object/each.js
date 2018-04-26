'use strict';

import { each } from '../../object';

describe(`Iterate an object using each(subject:Object|Function, 
                                        handler:Function, 
                                        scope:Mixed,
                                        [hasown:Boolean]) method`,
    () => {
        
        var fn = function () {},
            obj = {
                    id: fn.id = "diko",
                    value: fn.value = 100,
                    method: fn.method = function () {
                            console.log("meth");
                        }
                },
            
            objProperties = ['id', 'value', 'method'],
            
            augmented = (function () {
                    var E = empty;
                    var newObject;
                    
                    E.prototype = obj;
                    newObject = new E();
                    newObject.extra = true;
                    
                    return newObject;
                })(),
            
            augmentedProperties = objProperties.concat(['extra']);
                
        function empty() {
            
        }
        
        
        
        it(`1. Should only accept Native Javascript Object or Function 
             "subject" parameter.`,
            () => {
                
                expect(() => each(null, empty, null)).toThrow();
                
                expect(() => each(obj, empty, null)).not.toThrow();
                expect(each(obj, empty, null)).toBe(obj);
                
                expect(() => each(fn, empty, null)).not.toThrow();
                expect(each(fn, empty, null)).toBe(fn);
                
            });
        
        it(`2. Should call "handler" function parameter
            on each iteration of "subject" Object property.`,
            () => {
                
                function eachHandler(value, name, subject) {

                    expect(subject).toBe(obj);
                    expect(objProperties).toContain(name);
                    expect(subject[name]).toBe(value);
                }
                
                expect(() => each(obj, eachHandler, null)).not.toThrow();
                expect(each(obj, eachHandler, null)).toBe(obj);
                
                expect(() => each(obj, 100, null)).toThrow();
                expect(() => each(obj, 'str', null)).toThrow();
                
            });
        
        
        it(`3. Should accept 4th optional Boolean "hasown" parameter where 
            only modified or created properties is iterated.`,
        
            () => {
                
                function eachHandler(value, name, subject) {
                    expect(name).toBe("extra");
                    expect(subject).toBe(augmented);
                    expect(augmentedProperties).toContain(name);
                    expect(subject[name]).toBe(value);
                }
                
                expect(() => each(augmented, eachHandler, null, true)).
                        not.toThrow();
                expect(each(augmented, eachHandler, null, true)).
                        toBe(augmented);
                
                
            });
        
        it(`4. Should treat "hasown" parameter to true if no 4th optional 
           "hasown" parameter is given.`,
        
            () => {
                
                function eachHandler(value, name, subject) {
                    expect(name).toBe("extra");
                    expect(subject).toBe(augmented);
                    expect(augmentedProperties).toContain(name);
                    expect(subject[name]).toBe(value);
                }
                
                expect(() => each(augmented, eachHandler, null)).
                        not.toThrow();
                expect(each(augmented, eachHandler, null)).toBe(augmented);
                
            });
        
        it(`5. Should accept 4th optional Boolean "hasown" parameter where 
            all properties is iterated regardless if property is default.`,
            () => {

                function eachHandler(value, name, subject) {
                    expect(subject).toBe(augmented);
                    expect(augmentedProperties).toContain(name);
                    expect(subject[name]).toBe(value);
                }
                
                expect(() => each(augmented, eachHandler, null, false)).
                        not.toThrow();
                expect(each(augmented, eachHandler, null, false)).
                        toBe(augmented);

            });
        
        it(`6. Should not accept non-Boolean 4th optional "hasown" parameter.`,
           () => {
                
                expect(() => each(obj, empty, null, true)).not.toThrow();
                expect(() => each(obj, empty, null, 101)).toThrow();
                expect(() => each(obj, empty, null, "Javascript")).
                            toThrow();
           });
        
    });