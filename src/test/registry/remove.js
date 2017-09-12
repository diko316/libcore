'use strict';

describe(`Removes registry value with the given String json path [path] 
         relative to registry storage using
         registryInstance.remove(path:String)`,
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
        
        it(`1. Should throw error if given [path] parameter is not String.`,
           () => {
                expect(() => registry.remove(null)).toThrow();
                expect(() => registry.remove(new Date())).toThrow();
                expect(() => registry.remove(NaN)).toThrow();
                expect(() => registry.remove({})).toThrow();
           });
        
        it(`2. Should remove [value] found in String [path] parameter and 
           return true when found and removed.`,
           () => {
                
                expect(registry.pathExists("name")).toBe(true);
                expect(registry.pathExists("[0].0.id")).toBe(true);
                
                expect(() => registry.remove("name")).not.toThrow();
                expect(() => registry.remove("[0].0.id")).not.toThrow();
                
                expect(registry.pathExists("name")).toBe(false);
                expect(registry.pathExists("[0].0.id")).toBe(false);
                
                
                expect(registry.pathExists("[0]")).toBe(true);
                expect(registry.pathExists("2[0].label")).toBe(true);

                expect(registry.remove("[0]")).toBe(registry);
                expect(registry.remove("2[0].label")).toBe(registry);
                
                expect(registry.pathExists("[0]")).toBe(false);
                expect(registry.pathExists("2[0].label")).toBe(false);

           });
        
        
        
    });