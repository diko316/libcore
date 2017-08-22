'use strict';

describe('Inserts registry [value] into String json path [path] ' +
         'relative to registry storage using ' +
         'registryInstance.insert(path:String, value:Mixed)',
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
                var value = "buang";
                expect(() => registry.insert(null, value)).toThrow();
                expect(() => registry.insert(new Date(), value)).toThrow();
                expect(() => registry.insert(NaN, value)).toThrow();
                expect(() => registry.insert({}, value)).toThrow();
           });
        
        it('2. Should insert [value] into registry storage with the given ' +
           'String [path] parameter.',
           () => {
                var value = "buang";
                
                expect(() => registry.insert("name", value)).not.toThrow();
                expect(() => registry.insert("[0].id", value)).not.toThrow();
                
                expect(registry.find("name")).toBe(value);
                expect(registry.find("[0].id")).toBe(value);

                expect(registry.insert("[0].0.id", value)).toBe(registry);
                expect(registry.insert("2[0].label", value)).toBe(registry);
                
                expect(registry.find("[0].0.id")).toBe(value);
                expect(registry.find("2[0].label")).toBe(value);
                
                // retain "Array-ness"
                expect(lib.array(registry.find("[2]"))).toBe(true);

           });
        
        
        
    });