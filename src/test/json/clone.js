'use strict';


describe(`'Clone value extracted from [object] with given [path] using 
        jsonClone(path:String, object:Mixed, [deep:Boolean])`,
    () => {
        var lib = global.libcore,
            subject = {
                    "grid": {
                        "paging": {
                            "limit": 20,
                            "offset": 0
                        },
                        "rows": [{
                            "id": 201,
                            "name": "test1",
                            "label": "label1"
                        },
                        {
                            "id": 202,
                            "name": "test2",
                            "label": "label2"
                        },
                        {
                            "id": 203,
                            "name": "test3",
                            "label": "label3"
                        }]
                    }
                };
        
        it(`1. Should return a clone value extracted from [object] with the 
           given [path]`,
           () => {
                expect(() => lib.jsonClone('grid.paging', subject)).
                    not.toThrow();
                    
                expect(lib.jsonClone('grid.paging', subject)).
                    toEqual(subject.grid.paging);
                    
           });
        
        it(`2. Should return a deep clone value extracted from [object]
           with the given [path] if optional Boolean [deep] is true.`,
           () => {
                expect(() => lib.jsonClone('grid.rows', subject, true)).
                    not.toThrow();
                    
                expect(lib.jsonClone('grid.rows', subject, true)[0]).
                    not.toBe(subject.grid.rows[0]);
                    
                expect(lib.jsonClone('grid.rows[0]', subject, true)).
                    toEqual(subject.grid.rows[0]);
                    
           });
        
        it(`3. Should return a shallow clone value extracted from [object] 
           with the given [path] if optional Boolean [deep] is false.`,
           () => {
                expect(() => lib.jsonClone('grid.rows', subject, false)).
                    not.toThrow();
                    
                expect(lib.jsonClone('grid.rows', subject, false)[0]).
                    toBe(subject.grid.rows[0]);
                    
                expect(lib.jsonClone('grid.rows[0]', subject, false)).
                    toEqual(subject.grid.rows[0]);
                    
           });
        
    });