'use strict';

import { jsonFind } from '../../json';

describe(`Retrieves Mixed value from a given JSON path using
         jsonFind(path:String, object:Mixed)`,
        () => {
            var subject = {
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
                    expect(() => jsonFind(null, subject)).toThrow();
                    expect(() => jsonFind(undefined, subject)).toThrow();
                    expect(() => jsonFind(1, subject)).toThrow();
                    expect(() => jsonFind(/test/, subject)).toThrow();
                    expect(() => jsonFind("", subject)).toThrow();
                    
               });
            
            it(`2. Should accept String [path] and return undefined if 
               unable to extract property value of [object].`,
               () => {
                    expect(jsonFind("table", subject)).toBe(undefined);
                    expect(jsonFind("table", /test/)).toBe(undefined);
                    expect(jsonFind("table", 1)).toBe(undefined);
               });
            
            it(`3. Should accept String [path] and return property value 
               extracted from [object] parameter.`,
               () => {
                    expect(jsonFind("grid", subject)).toBe(subject.grid);
                    
                    expect(jsonFind("0.index", subject)).toBe("zero");
                    
                    expect(jsonFind("grid['paging']", subject)).
                                    toBe(subject.grid.paging);
                    expect(jsonFind("grid['paging'].offset", subject)).
                                    toBe(0);
                    expect(jsonFind("grid['paging'].limit", subject)).
                                    toBe(20);
                                    
                    expect(jsonFind("grid.rows[1].id", subject)).
                                    toBe(202);
                    expect(jsonFind("grid.rows[2].id", subject)).
                                    toBe(203);
                                    
                    expect(jsonFind("grid.rows[0]", subject)).
                                    toBe(subject.grid.rows[0]);
                    expect(jsonFind("grid.rows[1]", subject)).
                                    toBe(subject.grid.rows[1]);
                    
                    expect(jsonFind("method.id", subject)).
                                    toBe("fn1");
                    expect(jsonFind("method[\"type\"].grid", subject)).
                                    toBe(subject.grid);

                    expect(
                        jsonFind(
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