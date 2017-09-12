'use strict';

describe(`Removes registry [value] indexed with [name] using 
         registryInstance.unset(name:String|Number)`,
    () => {
        var lib = global.libcore;
        var registry;
        
        beforeEach(() => {
            registry = lib.createRegistry();
            registry.assign({
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
        
        it(`1. Should throw error if given [name] parameter is not String, 
           Number, Object or Array.`,
           () => {
                expect(() => registry.unset(null)).toThrow();
                expect(() => registry.unset(new Date())).toThrow();
                expect(() => registry.unset(NaN)).toThrow();
                expect(() => registry.unset(true)).toThrow();
           });
        
        it(`2. Should remove [value] indexed with String [name] parameter 
           returning registry object.`,
           () => {
                expect(registry.exists("name")).toBe(true);
                expect(registry.exists("next")).toBe(true);
                
                expect(() => registry.unset("name")).not.toThrow();
                expect(registry.unset("next")).toBe(registry);
                
                expect(registry.exists("name")).toBe(false);
                expect(registry.exists("next")).toBe(false);
           });
        
        it(`3. Should remove [value] indexed with Number [name] parameter 
           returning registry object.`,
           () => {
                expect(registry.exists(0)).toBe(true);
                expect(registry.exists(2)).toBe(true);
                
                expect(() => registry.unset(0)).not.toThrow();
                expect(registry.unset(2)).toBe(registry);
                
                expect(registry.exists(0)).toBe(false);
                expect(registry.exists(2)).toBe(false);
           });
        
    });