'use strict';

describe('Sets registry [value] indexed with [name] using ' +
         'registryInstance.set(name:String|Number|Object|Array, value:Mixed)',
    () => {
        var lib = global.libcore;
        var registry;
        
        beforeEach(() => {
            registry = lib.createRegistry();
            registry.apply({
                "name": "diko",
                "0": [{
                    "id": 101,
                    "value": 19,
                    "label": "nineteen"
                }],
                
                "2": [{
                    "id": 10,
                    "value": 68,
                    "label": "sixty eight"
                }],
                
                "next": function () {
                    return true;
                }
            });
        });
        
        it('1. Should throw error if given [name] parameter is not String, ' +
           'Number, Object or Array.',
           () => {
                expect(() => registry.set(null, 1)).toThrow();
                expect(() => registry.set(new Date(), "buang")).toThrow();
                expect(() => registry.set(NaN, "uses")).toThrow();
                expect(() => registry.set(true, new Date())).toThrow();
           });
        
        it('2. Should insert [value] indexed with String [name] parameter ' +
           'returning registry object.',
           () => {
                expect(() => registry.set("label", "new label")).not.toThrow();
                expect(registry.set("label1", "new label")).toBe(registry);
                
                expect(() => registry.set("3", "another")).not.toThrow();
                expect(registry.get("3")).toBe("another");
           });
        
        it('3. Should insert [value] indexed with String [name] parameter ' +
           'returning registry object.',
           () => {
                expect(() => registry.set(3, "new label")).not.toThrow();
                expect(registry.set(4, "new label")).toBe(registry);
                
                expect(() => registry.set(5, "another")).not.toThrow();
                expect(registry.get(5)).toBe("another");
           });
        
        
        it('4. Should assign Native Object [name] properties if [name] ' +
           'parameter is Native Object returning registry object.',
           () => {
                var insert = {
                        "id": 35,
                        "label1": "test"
                    };
                expect(() => registry.set(insert)).not.toThrow();
                
                expect(registry.set({ "another": "label?" })).toBe(registry);
                
                expect(registry.get("id")).toBe(35);
                expect(registry.get("label1")).toBe("test");
           });
        
        it('5. Should assign Array [name] items if [name] parameter is' +
           'Array returning registry object.',
           () => {
                var insert = [35, "test"];
                
                expect(() => registry.set(insert)).not.toThrow();
                
                expect(registry.get(0)).toBe(35);
                expect(registry.get(1)).toBe("test");
                
                expect(registry.set(insert)).toBe(registry);
           });
        
    });