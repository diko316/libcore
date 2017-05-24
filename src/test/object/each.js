'use strict';


describe('Iterate an object using each(subject:Object|Function, ' +
                                        'handler:Function, ' +
                                        'scope:Mixed, ' +
                                        '[hasown:Boolean]) method',
    function () {
        
        var lib = global.libcore,
            fn = function () {},
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
        
        
        
        it('1. Should only accept Native Javascript Object or Function ' +
            ' "subject" parameter.',
            function () {
                
                function eachObject() {
                    return lib.each(obj, empty, null);
                }
                
                function eachNonObject() {
                    return lib.each(null, empty, null);
                }
                
                function eachFunction() {
                    return lib.each(fn, empty, null);
                }
                
                expect(eachNonObject).toThrow();
                
                expect(eachObject).not.toThrow();
                expect(eachObject()).toBe(obj);
                
                expect(eachFunction).not.toThrow();
                expect(eachFunction()).toBe(fn);
                
            });
        
        it('2. Should call "handler" function parameter ' +
            'on each iteration of "subject" Object property.',
            function () {
                
                function eachHandler(value, name, subject) {

                    expect(subject).toBe(obj);
                    expect(objProperties).toContain(name);
                    expect(subject[name]).toBe(value);
                }
                
                function execHasOwn() {
                    return lib.each(obj, eachHandler, null);
                }
                
                function invalidNumberHandler() {
                    return lib.each(obj, 100, null);
                }
                
                function invalidStringHandler() {
                    return lib.each(obj, 'str', null);
                }
                
                expect(execHasOwn).not.toThrow();
                expect(execHasOwn()).toBe(obj);
                
                expect(invalidStringHandler).toThrow();
                expect(invalidNumberHandler).toThrow();
                
            });
        
        
        it('3. Should accept 4th optional Boolean "hasown" parameter where ' +
           ' only modified or created properties is iterated.',
        
            function () {
                
                function eachHandler(value, name, subject) {
                    expect(name).toBe("extra");
                    expect(subject).toBe(augmented);
                    expect(augmentedProperties).toContain(name);
                    expect(subject[name]).toBe(value);
                }
                
                function execHasOwn() {
                    return lib.each(augmented, eachHandler, null, true);
                }
                
                expect(execHasOwn).not.toThrow();
                expect(execHasOwn()).toBe(obj);
                
                
            });
        
        it('4. Should treat "hasown" parameter to true if no 4th optional ' +
           '"hasown" parameter is given.',
        
            function () {
                
                function eachHandler(value, name, subject) {
                    expect(name).toBe("extra");
                    expect(subject).toBe(augmented);
                    expect(augmentedProperties).toContain(name);
                    expect(subject[name]).toBe(value);
                }
                
                function execHasOwn() {
                    return lib.each(augmented, eachHandler, null);
                }
                
                expect(execHasOwn).not.toThrow();
                expect(execHasOwn()).toBe(obj);
                
            });
        
        it('5. Should accept 4th optional Boolean "hasown" parameter where ' +
           ' all properties is iterated regardless if property is default.',
            function () {

                function eachHandler(value, name, subject) {
                    expect(subject).toBe(augmented);
                    expect(augmentedProperties).toContain(name);
                    expect(subject[name]).toBe(value);
                }
                
                function execAllProperties() {
                    return lib.each(augmented, eachHandler, null, false);
                }
                
                expect(execAllProperties).not.toThrow();
                expect(execAllProperties()).toBe(augmented);

            });
        
        it('6. Should not accept non-Boolean 4th optional "hasown" parameter.',
           function () {
                
                function eachNonObject() {
                    return lib.each(obj, empty, null, true);
                }
                
                function eachNumberHasOwn() {
                    return lib.each(obj, empty, null, 101);
                }
                
                function eachStringHasOwn() {
                    return lib.each(obj, empty, null, "Javascript");
                }
                
                expect(eachNonObject).not.toThrow();
                expect(eachNumberHasOwn).toThrow();
                expect(eachStringHasOwn).toThrow();
           });
        
    });