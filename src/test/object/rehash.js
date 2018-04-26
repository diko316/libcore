'use strict';

import { rehash } from '../../object';

describe(`Remaps properties of an object into new property of another object
                                     using rehash(target:Object|Function, 
                                        source:Object|Function, 
                                        access:Object) method`,
    () => {
        var target, source;
        
        
        beforeEach(() => {
            target = {};
            source = {
                pseudoName: 'diko',
                pseudoId: 'myId1'
            };
        });
        
        it(`1. Should only accept Native Javascript Object "target" parameter.`,
            () => {
                expect(() => rehash(null, source, {})).toThrow();
                
                expect(() => rehash(new Date(), source, {})).not.toThrow();
                
                expect(() => rehash(1, source, {})).toThrow();
                
                expect(() => rehash('test', source, {})).toThrow();
                
                expect(() => rehash(target, source, {})).not.toThrow();
                
                expect(() => rehash(function () {}, source, {})).
                    not.toThrow();
            });
        
        it(`2. Should only accept Native Javascript Object "source" parameter.`,
            () => {
                expect(() => rehash(target, null, {})).toThrow();
                
                expect(() => rehash(target, new Date(), {})).not.toThrow();
                
                expect(() => rehash(target, 1, {})).toThrow();
                
                expect(() => rehash(target, 'test', {})).toThrow();
                
                expect(() => rehash(target, source, {})).not.toThrow();
                
                expect(() => rehash(target, function (){}, {})).
                    not.toThrow();
            });
        
        
        it(`3. Should only accept Native Javascript Object "access" parameter.`,
            () => {
                expect(() => rehash(target, source, null)).toThrow();
                
                expect(() => rehash(target, source, new Date())).toThrow();
                
                expect(() => rehash(target, source, 1)).toThrow();
                
                expect(() => rehash(target, source, 'test')).toThrow();
                
                expect(() => rehash(target, source, function () {})).
                    toThrow();
                
                expect(() => rehash(target, source, {})).not.toThrow();
            });
        
        it(`4. Should be able to relocate properties from [source] to 
           [target] object by mapping properties using schema from [access] 
           defined in this manner { "newName": "sourcePropertyName" } .`,
            () => {
                
                expect(rehash(target, source, {
                        "name": "pseudoName",
                        "id": "pseudoId"
                    })).toEqual({
                        name: 'diko',
                        id: 'myId1'
                    });
                
                expect(rehash(target, source, {
                        "targetName": "pseudoName",
                        "targetId": "pseudoId"
                    })).toEqual({
                        name: 'diko',
                        id: 'myId1',
                        targetName: 'diko',
                        targetId: 'myId1'
                    });
            });
        
        
    });