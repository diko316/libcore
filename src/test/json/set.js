'use strict';


import { jsonSet } from '../../json';
import { assign } from '../../object';

describe(`Set or Apply [value] into object extracted from [path] using 
         jsonSet(path:String, 
                    subject:Mixed, 
                    value:Mixed, 
                    [overwrite:Boolean|"insert"|"push"]) method.`,
        () => {
            var subject;
                
            function testFunction() {
            }
            
            beforeEach(() => {
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
                    "method": testFunction
                };
                testFunction.id = "fn1";
                testFunction.type = subject;
            });
            
            it(`1. Should accept json String [path], 
                       Native non-scalar Javascript Object [subject], and 
                       Mixed [value] returning "true" 
                       if value was set or applied`,
                () => {
                    var path = 'grid.paging.limit',
                        value = 10;
                    expect(() => jsonSet(path, subject, value)).not.toThrow();
                    expect(jsonSet(path, subject, value)).toBe(true);
                    expect(subject.grid.paging.limit).toBe(value);
                    
                    
                    path = 'grid.rows[1].name';
                    value = "someone";
                    expect(() => jsonSet(path, subject, value)).not.toThrow();
                    expect(jsonSet(path, subject, value)).toBe(true);
                    expect(subject.grid.rows[1].name).toBe(value);
                });
            
            it(`2. Should accept json String [path], 
                       Native non-scalar Javascript Object [subject], and 
                       Mixed [value] returning "false" 
                       if value was not set or applied`,
                () => {
                    var path = 'grid.paging.limit.test',
                        value = 10;
                    expect(() => jsonSet(path, subject, value)).not.toThrow();
                    expect(jsonSet(path, subject, value)).toBe(false);
                    
                    
                    path = 'grid.rows[1].name.id';
                    value = "someone";
                    expect(() => jsonSet(path, subject, value)).not.toThrow();
                    expect(jsonSet(path, subject, value)).toBe(false);
                    
                });
            
            it(`3. Should accept json String [path], and populate them with 
                    Object if some properties in [path] doesn't exist. 
                    And, returns "true" if [value] is set or applied in the 
                    [subject].`,
                () => {
                    var path = 'test1[row].test',
                        value = 10;
                    expect(() => jsonSet(path, subject, value)).not.toThrow();
                    expect(subject.test1.row.test).toBe(value);
                    
                    
                    path = 'test1.row[item]';
                    value = "someone";
                    expect(() => jsonSet(path, subject, value)).not.toThrow();
                    expect(subject.test1.row.item).toBe(value);
                    
                });
            
            it(`4. Should accept json String [path], and update or apply 
                    non-scalar Object [value] properties to path resolved 
                    non-scalar Object [subject] if [overwrite] parameter is 
                    false.`,
                () => {
                    var path = 'grid.paging',
                        value = {
                            offset: 20,
                            "buang-ka": "yes",
                            "what": null,
                            "0": "item1"
                        },
                        result = assign({}, value, subject.grid.paging);

                    assign(result, value);
                        
                    expect(() => jsonSet(path, subject, value, false)).
                        not.toThrow();
                    expect(subject.grid.paging).toEqual(result);
                    
                    
                    path = 'test.array';
                    value = { "0": "item1" };
                    subject.test = { array: [] };
                    result = assign([], value, subject.test.array);
                    
                    expect(() => jsonSet(path, subject, value, false)).
                        not.toThrow();
                    expect(subject.test.array).toEqual(result);
                    
                    
                });
            
            it(`5. Should accept json String [path], and apply 
                    non-scalar Object [value] properties to path resolved 
                    non-scalar Object [subject] if [overwrite] parameter is 
                    "apply".`,
                () => {
                    var path = 'grid.rows',
                        value = {
                            "3": {
                                offset: 20,
                                "buang-ka": "yes",
                                "what": null
                            }
                        },
                        result = subject.grid.rows.slice(0);
                        
                    result[3] = value["3"];
                    
                    expect(() => jsonSet(path, subject, value, "apply")).
                        not.toThrow();
                    expect(subject.grid.rows).toEqual(result);
                });
            
            it(`6. Should accept json String [path], and insert 
                    Mixed [value] to path resolved Array 
                    [subject] if [overwrite] parameter is "insert".`,
                () => {
                    var path = 'grid.rows.1',
                        value = {
                                offset: 20,
                                "buang-ka": "yes",
                                "what": null
                            },
                        result = subject.grid.rows.slice(0);
                        
                    result.splice(1, 0, value);
                    
                    expect(() => jsonSet(path, subject, value, "insert")).
                        not.toThrow();
                    expect(subject.grid.rows).toEqual(result);
                });
            
            it(`7. Should accept json String [path], and push 
                    Array [value] items to path resolved Array 
                    [subject] if [overwrite] parameter is "push".`,
                () => {
                    var path = 'grid.rows',
                        value = [{
                                offset: 20,
                                "buang-ka": "yes",
                                "what": null
                            }],
                        result = subject.grid.rows;
                        
                    result.push.apply(result, value);
                    
                    expect(() => jsonSet(path, subject, value, "push")).
                        not.toThrow();
                    expect(subject.grid.rows).toEqual(result);
                });
            
            it(`8. Should accept json String [path], and unshift Array 
                    [value] items to start index of path resolved Array 
                    [subject] if [overwrite] parameter is "unshift".`,
                () => {
                    var path = 'grid.rows',
                        value = [{
                                offset: 20,
                                "buang-ka": "yes",
                                "what": null
                            }],
                        result = subject.grid.rows;
                        
                    result.unshift.apply(result, value);
                    
                    expect(() => jsonSet(path, subject, value, "unshift")).
                        not.toThrow();
                    expect(subject.grid.rows).toEqual(result);
                });
            
            it(`9. Should throw an Error if non-String or empty String [path] 
                    parameter is passed.`,
                () => {
                    expect(() => jsonSet(null, subject, 10)).
                            toThrow();
                    expect(() => jsonSet(new Date(), subject, 10)).
                            toThrow();
                    
                    expect(() => jsonSet(/test/, subject, 10)).
                            toThrow();
                    expect(() => jsonSet(1, subject, 10)).
                            toThrow();
                            
                    expect(() => jsonSet("", subject, 10)).
                            toThrow();
                });
            
        });