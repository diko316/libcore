'use strict';

import createRegistry from '../../registry';

describe(`Assign [value] Object properties or Array items into the registry 
         using registryInstance.assign(value:Object|Array)`,
    () => {
        var registry;
        
        beforeEach(() => {
            registry = createRegistry();
        });
        
        
        it(`1. Should throw error if [value] parameter is 
           not Object or Array.`,
           () => {
                expect(() => registry.assign(null)).toThrow();
                expect(() => registry.assign(new Date())).toThrow();
                expect(() => registry.assign(NaN)).toThrow();
                expect(() => registry.assign(/test/)).toThrow();
                expect(() => registry.assign(1)).toThrow();
                expect(() => registry.assign("label")).toThrow();
           });
        
        it(`2. Should assign Native Object properties of [value] parameter 
           indexed by property name to registry and 
           return registry instance when suscessfull.`,
           () => {
                expect(() => registry.assign({})).not.toThrow();
                expect(registry.assign({
                        "name": "diko",
                        "next": function () {
                            return true;
                        }
                    })).toBe(registry);
                
                expect(registry.get("name")).toBe("diko");
                
           });
        
        it(`3. Should assign Array items of [value] parameter indexed by 
           numeric array index to registry and 
           return registry instance when suscessfull.`,
           () => {
                var array = [{
                        "id": 101,
                        "value": 19,
                        "label": "nineteen"
                    },
                    {
                        "id": 10,
                        "value": 68,
                        "label": "sixty eight"
                    }];
                
                expect(() => registry.assign([])).not.toThrow();
                expect(registry.assign(array)).toBe(registry);
                
                expect(registry.get("0")).toBe(array[0]);
                expect(registry.get("1")).toBe(array[1]);
                
           });
        
        
    });