'use strict';

import createRegistry from '../../registry';

describe(`Inspects the registry storage if String or Number [name] exists 
         using registryInstance(name:String)`,
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
        
        it(`1. Should throw error if given [name] parameter is 
           not String or Number.`,
           () => {
                expect(() => registry.exists(null)).toThrow();
                expect(() => registry.exists(new Date())).toThrow();
                expect(() => registry.exists(NaN)).toThrow();
                expect(() => registry.exists({})).toThrow();
           });
        
        it(`2. Should return true if indexed String or Number [name] exists 
           in registry.`,
           () => {
                expect(() => registry.exists("name")).not.toThrow();
                expect(() => registry.exists(0)).not.toThrow();
                
                expect(registry.exists("name")).toBe(true);
                expect(registry.exists("next")).toBe(true);
                
                expect(registry.exists(0)).toBe(true);
                expect(registry.exists(2)).toBe(true);
                
           });
        
        it(`3. Should return false if indexed String or Number [name] 
           do not exist in registry.`,
           () => {
                expect(registry.exists("label")).toBe(false);
                expect(registry.exists("another")).toBe(false);
                
                expect(registry.exists(11)).toBe(false);
                expect(registry.exists(290)).toBe(false);
           });
        
    });