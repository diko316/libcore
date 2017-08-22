'use strict';

describe('Inspects if String json [path] exists in registry using ' +
         'registryInstance.pathExists(path:String)',
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
        
        it('1. Should throw error if given [path] parameter is not String.',
           () => {
                expect(() => registry.pathExists(null)).toThrow();
                expect(() => registry.pathExists(new Date())).toThrow();
                expect(() => registry.pathExists(NaN)).toThrow();
                expect(() => registry.pathExists({})).toThrow();
           });
        
        it('2. Should return true if given json String [path] parameter ' +
           'exists in registry.',
           () => {
                expect(() => registry.pathExists("name")).not.toThrow();
                
                expect(registry.pathExists("[0].0.id")).toBe(true);
                expect(registry.pathExists("2[0].label")).toBe(true);
                
                expect(registry.pathExists("name")).toBe(true);
                expect(registry.pathExists("0")).toBe(true);
                expect(registry.pathExists("next")).toBe(true);
           });
        
        it('3. Should return false if given json String [path] parameter ' +
           'exists in registry.',
           () => {
                expect(() => registry.pathExists("10.name")).not.toThrow();
                
                expect(registry.pathExists("[10].0.id")).toBe(false);
                expect(registry.pathExists("2[90].label")).toBe(false);
                
                expect(registry.pathExists("label")).toBe(false);
                expect(registry.pathExists("another.0")).toBe(false);
                expect(registry.pathExists("unnext")).toBe(false);
           });
        
        
        
    });