'use strict';

describe(`Retrieves registry value based from String json path [path] using 
         registryInstance.find(path:String)`,
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
                expect(() => registry.find(null)).toThrow();
                expect(() => registry.find(new Date())).toThrow();
                expect(() => registry.find(NaN)).toThrow();
                expect(() => registry.find({})).toThrow();
           });
        
        it(`2. Should return value with the given String [path] parameter.`,
           () => {
                expect(() => registry.find("name")).not.toThrow();
                expect(() => registry.find("[0].id")).not.toThrow();
                
                expect(registry.find("[0].0.id")).toBe(101);
                expect(registry.find("2[0].label")).toBe("sixty eight");
                
                expect(registry.find("name")).toBe("diko");
                expect(registry.find("0")).toBe(registry.data["0"]);
                expect(registry.find("next")).toBe(registry.data["next"]);
           });
        
        
        
    });