'use strict';

import createRegistry from '../../registry';

describe(`Retrieves registry value based from [name] index using 
         registryInstance.get(name:String|Number)`,
    () => {
        var registry;
        
        beforeEach(() => {
            registry = createRegistry();
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
        
        it(`1. Should throw error if given [name] parameter is not String or 
           Number.`,
           () => {
                expect(() => registry.get(null)).toThrow();
                expect(() => registry.get(new Date())).toThrow();
                expect(() => registry.get(NaN)).toThrow();
                expect(() => registry.get({})).toThrow();
           });
        
        it(`2. Should return value with the given String [name] parameter.`,
           () => {
                expect(() => registry.get("name")).not.toThrow();
                expect(registry.get("name")).toBe("diko");
                expect(registry.get("0")).toBe(registry.data["0"]);
                expect(registry.get("next")).toBe(registry.data["next"]);
           });
        
        it(`3. Should return value with the given Number [name] parameter.`,
           () => {
                expect(() => registry.get(0)).not.toThrow();
                expect(registry.get(0)).toBe(registry.data["0"]);
           });
        
        
        
    });