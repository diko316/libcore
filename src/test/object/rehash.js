'use strict';


describe('Remaps properties of an object into new property of another object' +
                                    ' using rehash(target:Object|Function, ' +
                                        'source:Object|Function, ' +
                                        'access:Object) method',
    () => {
        var lib = global.libcore;
        var target, source;
        
        
        beforeEach(() => {
            target = {};
            source = {
                pseudoName: 'diko',
                pseudoId: 'myId1'
            };
        });
        
        it('1. Should only accept Native Javascript Object "target" parameter.',
            () => {
                expect(() => lib.rehash(null, source, {})).toThrow();
                
                expect(() => lib.rehash(new Date(), source, {})).not.toThrow();
                
                expect(() => lib.rehash(1, source, {})).toThrow();
                
                expect(() => lib.rehash('test', source, {})).toThrow();
                
                expect(() => lib.rehash(target, source, {})).not.toThrow();
                
                expect(() => lib.rehash(function () {}, source, {})).
                    not.toThrow();
            });
        
        it('2. Should only accept Native Javascript Object "source" parameter.',
            () => {
                expect(() => lib.rehash(target, null, {})).toThrow();
                
                expect(() => lib.rehash(target, new Date(), {})).not.toThrow();
                
                expect(() => lib.rehash(target, 1, {})).toThrow();
                
                expect(() => lib.rehash(target, 'test', {})).toThrow();
                
                expect(() => lib.rehash(target, source, {})).not.toThrow();
                
                expect(() => lib.rehash(target, function (){}, {})).
                    not.toThrow();
            });
        
        
        it('3. Should only accept Native Javascript Object "access" parameter.',
            () => {
                expect(() => lib.rehash(target, source, null)).toThrow();
                
                expect(() => lib.rehash(target, source, new Date())).toThrow();
                
                expect(() => lib.rehash(target, source, 1)).toThrow();
                
                expect(() => lib.rehash(target, source, 'test')).toThrow();
                
                expect(() => lib.rehash(target, source, function () {})).
                    toThrow();
                
                expect(() => lib.rehash(target, source, {})).not.toThrow();
            });
        
        it('4. Should be able to relocate properties from [source] to ' +
           '[target] object by mapping properties using schema from [access] ' +
           'defined in this manner { "newName": "sourcePropertyName" } .',
            () => {
                
                expect(lib.rehash(target, source, {
                        "name": "pseudoName",
                        "id": "pseudoId"
                    })).toEqual({
                        name: 'diko',
                        id: 'myId1'
                    });
                
                expect(lib.rehash(target, source, {
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