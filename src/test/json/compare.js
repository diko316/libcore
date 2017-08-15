'use strict';

describe('Compares value with [object2] where value is ' +
         'extracted from [object1] using [path] parameter using ' +
         'jsonCompare(path:String, object1:Mixed, object2:Mixed) method',
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
            
            it('1. Should throw error if [path] parameter is not String or ' +
               'empty String.',
               () => {
                    expect(() => lib.jsonCompare(null,
                                                 subject,
                                                 20)).toThrow();
                    expect(() => lib.jsonCompare(/test/,
                                                 subject,
                                                 20)).toThrow();
                    expect(() => lib.jsonCompare(1,
                                                 subject,
                                                 20)).toThrow();
                    expect(() => lib.jsonCompare(new Date(),
                                                 subject,
                                                 20)).toThrow();
               });
            
            it('2. Should return true if value in [object1] from [path] ' +
               'matches [object2].',
               () => {
                    var paging = lib.clone(subject.grid.paging, true);
                    
                    expect(() => lib.jsonCompare('grid.paging.offset',
                                                 subject,
                                                 0)).not.toThrow();
                    
                    expect(lib.jsonCompare('grid.paging.offset',
                                           subject,
                                           0)).toBe(true);
                    
                    expect(lib.jsonCompare('grid.paging',
                                           subject,
                                           paging)).toBe(true);
                    
                    expect(lib.jsonCompare('["grid"].paging',
                                           subject,
                                           paging)).toBe(true);
               });
        
            it('3. Should return false if value in [object1] from [path] ' +
               'do not match [object2].',
               () => {
                    var paging = lib.clone(subject.grid.paging, true);
                    
                    expect(lib.jsonCompare('grid.paging',
                                           subject,
                                           19)).toBe(false);
                    
                    expect(lib.jsonCompare('grid.paging.offset',
                                           subject,
                                           20)).toBe(false);
                    
                    expect(lib.jsonCompare('grid.paging.test',
                                           subject,
                                           lib.clone(subject.grid.paging,
                                                     true))).toBe(false);
                    
                    expect(lib.jsonCompare('["grid"].rows[0]',
                                           subject,
                                           lib.clone(subject.grid.paging,
                                                     true))).toBe(false);
               });
            
        });