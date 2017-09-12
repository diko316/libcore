'use strict';

describe(`Removes property of non-Scalar Native Object using
         jsonUnset(path:String, subject:Mixed) method`,
    () => {
        var lib = global.libcore;
        var subject;
        
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
                "sampleMethod": function () {
                    
                }
            };
            subject.sampleMethod.id = 400;
            subject.sampleMethod.type = "test";
        });
        
        it(`1. Should remove property in [subject] extracted from
           json [path] and returns "true" if property is found and removed.`,
           () => {
                
                expect(() => lib.jsonUnset('grid.paging.limit', subject)).
                    not.toThrow();
                    
                expect(lib.jsonUnset('grid.paging', subject)).
                    toBe(true);
                    
                expect(lib.jsonUnset('sampleMethod.type', subject)).
                    toBe(true);

            
           });
        
        it(`2. Should try to remove property in [subject] extracted from 
           json [path] and returns "false" if property is not found or 
            not removed.`,
           () => {
                
                expect(() => {
                    lib.jsonUnset('grid.paging.limit', subject);
                    lib.jsonUnset('grid.paging', subject);
                    lib.jsonUnset('sampleMethod.type', subject);
                }).
                    not.toThrow();
                    
                // expecting that this should be removed and do not exist
                expect(lib.jsonUnset('grid.paging.limit', subject)).
                    toBe(false);
                    
                expect(lib.jsonUnset('grid.paging.offset', subject)).
                    toBe(false);
                    
                expect(lib.jsonUnset('sampleMethod.type', subject)).
                    toBe(false);
                
                expect(lib.jsonUnset('sampleMethod.hasOwnProperty', subject)).
                    toBe(false);
            
           });
        
        it(`3. Should try to remove array item in [subject] extracted from 
           json [path] and returns "true" if array item is found and removed.`,
           () => {
                var removedRow = subject.grid.rows[1],
                    length = subject.grid.rows.length;
                
                expect(() => lib.jsonUnset('grid.rows[1]', subject)).
                    not.toThrow();
                    
                expect(subject.grid.rows[1]).not.toBe(removedRow);
                
                expect(subject.grid.rows.length).toBe(length - 1);
            
           });
        
        it(`4. Should try to remove array item in [subject] extracted from 
           json [path] and returns "false" if it failed in removing 
           the array item or if not found.`,
           () => {
                
                expect(() => lib.jsonUnset('grid.rows[3]', subject)).
                    not.toThrow();
                    
                expect(lib.jsonUnset('grid.rows[3]', subject)).toBe(false);
            
           });
    });