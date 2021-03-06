'use strict';

import { jsonExists } from '../../json';

describe(`Inspects a given Mixed [subject] if JSON [path] exists
         using jsonExists(path:String, subject:Mixed)`,
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
                    expect(() => jsonExists(null, subject)).toThrow();
                    expect(() => jsonExists(undefined, subject)).toThrow();
                    expect(() => jsonExists(1, subject)).toThrow();
                    expect(() => jsonExists(/test/, subject)).toThrow();
                    expect(() => jsonExists("", subject)).toThrow();
                    
               });
            
            it(`2. Should accept String [path] and return false if 
               JSON path do not exist in [subject].`,
               () => {
                    expect(jsonExists("table", subject)).toBe(false);
                    expect(jsonExists("0[1].name", subject)).toBe(false);
                    expect(jsonExists("table", /test/)).toBe(false);
                    expect(jsonExists("table", 1)).toBe(false);
               });
            
            it(`3. Should accept String [path] and return true if
               JSON path exists in [subject].`,
               () => {
                    expect(jsonExists("grid", subject)).toBe(true);
                    
                    expect(jsonExists("0.index", subject)).toBe(true);
                    
                    expect(jsonExists("grid['paging']", subject)).
                                    toBe(true);
                    expect(jsonExists("grid['paging'].offset", subject)).
                                    toBe(true);
                    expect(jsonExists("grid['paging'].limit", subject)).
                                    toBe(true);
                                    
                    expect(jsonExists("grid.rows[1].id", subject)).
                                    toBe(true);
                    expect(jsonExists("grid.rows[2].id", subject)).
                                    toBe(true);
                                    
                    expect(jsonExists("grid.rows[0]", subject)).
                                    toBe(true);
                    expect(jsonExists("grid.rows[1]", subject)).
                                    toBe(true);
                    
                    expect(jsonExists("method.id", subject)).
                                    toBe(true);
                    expect(jsonExists("method[\"type\"].grid", subject)).
                                    toBe(true);
               });
        });