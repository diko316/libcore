'use strict';


describe('Extract property names from a JSON path using ' +
         'jsonParsePath(path:String)',
        () => {
            var lib = global.libcore;
            
            it('1. Should be able to extract dot notation JSON path ' +
               ' (e.g. "grid.paging.offset")',
               () => {
                    var subject = 'grid.paging.offset';
                    
                    expect(() => lib.jsonParsePath(subject)).
                        not.toThrow();
                        
                    expect(lib.jsonParsePath(subject)).
                        toEqual(['grid', 'paging', 'offset']);
                    
                    subject = 'grid.rows.0.label.length'
                    expect(lib.jsonParsePath(subject)).
                        toEqual(['grid',
                                  'rows',
                                  '0',
                                  'label',
                                  'length']);
               });
            
            it('2. Should be able to extract quoted string properties ' +
               'JSON path (e.g. "grid["paging"].offset")',
               () => {
                    var subject = 'grid["paging"].offset';
                    
                    expect(() => lib.jsonParsePath(subject)).
                        not.toThrow();
                        
                    expect(lib.jsonParsePath(subject)).
                        toEqual(['grid', 'paging', 'offset']);
                    
                    
                    subject = 'grid["rows"].0.label.length'
                    expect(() => lib.jsonParsePath(subject)).
                        not.toThrow();
                    expect(lib.jsonParsePath(subject)).
                        toEqual(['grid',
                                  'rows',
                                  '0',
                                  'label',
                                  'length']);
                    subject = 'grid.rows[0].label.length'
                    expect(() => lib.jsonParsePath(subject)).
                        not.toThrow();
                    expect(lib.jsonParsePath(subject)).
                        toEqual(['grid',
                                  'rows',
                                  '0',
                                  'label',
                                  'length']);
                        
                    subject = 'grid["rows"][0].label.length'
                    expect(() => lib.jsonParsePath(subject)).
                        not.toThrow();
                    expect(lib.jsonParsePath(subject)).
                        toEqual(['grid',
                                  'rows',
                                  '0',
                                  'label',
                                  'length']);
                        
                    subject = '["grid"].rows[0].label.length'
                    expect(() => lib.jsonParsePath(subject)).
                        not.toThrow();
                    expect(lib.jsonParsePath(subject)).
                        toEqual(['grid',
                                  'rows',
                                  '0',
                                  'label',
                                  'length']);
               });
            
            
        });