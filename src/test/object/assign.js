'use strict';


describe('Apply properties of source object to target object using ' +
        ' assign(target:Object|Function, ' +
                'source:Object|Function, ' +
                '[defaults:Object]) method',
    function () {
        
        var lib = global.libcore,
            fnSubject = function () {},
            subject = {
                id: fnSubject.id = "diko",
                value: fnSubject.value = 143,
                method: fnSubject.method = function () {
                            console.log("meth");
                        }
            };
        
        it('1. Should accept Object as first "target" parameter.',
            function () {
                var target = {},
                    source = subject;
                
                function execAssign() {
                    return lib.assign(target, source);
                }
                
                expect(execAssign).not.toThrow();
                expect(source).toEqual(target);
                
            });
        
        it('2. Should accept Function as first "target" parameter.',
            function () {
                var target = function () {},
                    source = subject;
                
                function execAssign() {
                    return lib.assign(target, source);
                }
                
                expect(execAssign).not.toThrow();
                expect(source.id).toBe(target.id);
                expect(source.value).toBe(target.value);
                expect(source.method).toBe(target.method);
                
            });
        
        it('3. Should not accept non-Function or non-Object as ' +
            'first "target" parameter.',
            function () {
                
                var source = subject;
                
                function execAssignNull() {
                    return lib.assign(null, source);
                }
                
                function execAssignString() {
                    return lib.assign("null", source);
                }
                
                function execAssignNumber() {
                    return lib.assign(1056, source);
                }
                
                function execAssignDate() {
                    return lib.assign(new Date(), source);
                }
                
                expect(execAssignNull).toThrow();
                expect(execAssignString).toThrow();
                expect(execAssignNumber).toThrow();
                expect(execAssignDate).toThrow();
                
            });
        
        it('4. Should accept Object as 2nd "source" parameter.',
            function () {
                var target = {},
                    source = subject;
                    
                function execAssign() {
                    return lib.assign(target, source);
                }
                
                expect(execAssign).not.toThrow();
                expect(source).toEqual(target);
                    
            });
        
        it('5. Should accept Function as 2nd "source" parameter.',
            function () {
                var target = {},
                    source = fnSubject;
                    
                function execAssign() {
                    return lib.assign(target, source);
                }
                
                expect(execAssign).not.toThrow();
                expect(source.id).toBe(target.id);
                expect(source.value).toBe(target.value);
                expect(source.method).toBe(target.method);
                    
            });
        
        it('6. Should not accept non-Function or non-Object as ' +
            '2nd "source" parameter.',
            function () {
                
                var target = {};
                
                function execAssignNull() {
                    return lib.assign(target, null);
                }
                
                function execAssignString() {
                    return lib.assign(target, "null");
                }
                
                function execAssignNumber() {
                    return lib.assign(target, 1056);
                }
                
                function execAssignDate() {
                    return lib.assign(target, new Date());
                }
                
                expect(execAssignNull).toThrow();
                expect(execAssignString).toThrow();
                expect(execAssignNumber).toThrow();
                expect(execAssignDate).toThrow();
                
            });
        
        it('7. Should accept 3rd optional "defaults" Object parameter.',
            function () {
                var target = {},
                    source = subject,
                    defaults = {
                        extra: "default",
                        "another-extra": "another"
                    };
                
                function execAssign() {
                    return lib.assign(target, source, defaults);
                }
                
                expect(execAssign).not.toThrow();
                expect(target).toEqual({
                    id: source.id,
                    value: source.value,
                    method: source.method,
                    extra: defaults.extra,
                    "another-extra": defaults["another-extra"]
                });
                
            });
        
        it('8. Should not accept non-Object 3rd optional "defaults" parameter.',
            function () {
                var target = {},
                    source = subject;
                
                function execAssignNull() {
                    return lib.assign(target, source, null);
                }
                
                function execAssignString() {
                    return lib.assign(target, source, "null");
                }
                
                function execAssignNumber() {
                    return lib.assign(target, source, 100);
                }
                
                expect(execAssignNull).toThrow();
                expect(execAssignString).toThrow();
                expect(execAssignNumber).toThrow();
            });
        
    });
