'use strict';


describe(`Retrieves Mixed value from a given JSON path using
         jsonFind(path:String, object:Mixed)`,
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
                    },
                    "0": {
                        "index": "zero"
                    },
                    "method": testFunction
                };
                
            function testFunction() {
            }
            
            testFunction.id = "fn1";
            testFunction.type = subject;
            
            it(`1. Should throw error if [path] parameter is 
               not String or empty.`,
               () => {
                    expect(() => lib.jsonFind(null, subject)).toThrow();
                    expect(() => lib.jsonFind(undefined, subject)).toThrow();
                    expect(() => lib.jsonFind(1, subject)).toThrow();
                    expect(() => lib.jsonFind(/test/, subject)).toThrow();
                    expect(() => lib.jsonFind("", subject)).toThrow();
                    
               });
            
            it(`2. Should accept String [path] and return undefined if 
               unable to extract property value of [object].`,
               () => {
                    expect(lib.jsonFind("table", subject)).toBe(undefined);
                    expect(lib.jsonFind("table", /test/)).toBe(undefined);
                    expect(lib.jsonFind("table", 1)).toBe(undefined);
               });
            
            it(`3. Should accept String [path] and return property value 
               extracted from [object] parameter.`,
               () => {
                    expect(lib.jsonFind("grid", subject)).toBe(subject.grid);
                    
                    expect(lib.jsonFind("0.index", subject)).toBe("zero");
                    
                    expect(lib.jsonFind("grid['paging']", subject)).
                                    toBe(subject.grid.paging);
                    expect(lib.jsonFind("grid['paging'].offset", subject)).
                                    toBe(0);
                    expect(lib.jsonFind("grid['paging'].limit", subject)).
                                    toBe(20);
                                    
                    expect(lib.jsonFind("grid.rows[1].id", subject)).
                                    toBe(202);
                    expect(lib.jsonFind("grid.rows[2].id", subject)).
                                    toBe(203);
                                    
                    expect(lib.jsonFind("grid.rows[0]", subject)).
                                    toBe(subject.grid.rows[0]);
                    expect(lib.jsonFind("grid.rows[1]", subject)).
                                    toBe(subject.grid.rows[1]);
                    
                    expect(lib.jsonFind("method.id", subject)).
                                    toBe("fn1");
                    expect(lib.jsonFind("method[\"type\"].grid", subject)).
                                    toBe(subject.grid);

                    expect(
                        lib.jsonFind(
                            "rows[1]",
                            {
                                rows: [
                                    'one',
                                    'two',
                                    'three'
                                ]
                            }
                        )
                    )
                    .toBe('two');
               });
        });