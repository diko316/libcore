'use strict';

import { jsonParsePath } from '../../json';


describe(`Extract property names from a JSON path using 
         jsonParsePath(path:String)`,
        () => {
            it(`1. Should be able to extract dot notation JSON path 
                (e.g. "grid.paging.offset")`,
               () => {
                    var subject = 'grid.paging.offset';
                    
                    expect(() => jsonParsePath(subject)).
                        not.toThrow();
                        
                    expect(jsonParsePath(subject)).
                        toEqual(['grid', 'paging', 'offset']);
                    
                    subject = 'grid.rows.0.label.length';
                    expect(jsonParsePath(subject)).
                        toEqual(['grid',
                                  'rows',
                                  '0',
                                  'label',
                                  'length']);
                        
                    subject = 'grid.rows.0';
                    expect(jsonParsePath(subject)).
                        toEqual(['grid',
                                  'rows',
                                  '0']);
               });
            
            it(`2. Should be able to extract quoted string properties 
               JSON path (e.g. "grid["paging"].offset")`,
               () => {
                    var subject = 'grid["paging"].offset';
                    
                    expect(() => jsonParsePath(subject)).
                        not.toThrow();
                    
                    expect(jsonParsePath('[0]')).
                        toEqual(['0']);
                        
                    expect(jsonParsePath('[0].id')).
                        toEqual(['0', 'id']);
                        
                    expect(jsonParsePath('items[]')).
                        toEqual(['items', '']);
                        
                    expect(jsonParsePath(subject)).
                        toEqual(['grid', 'paging', 'offset']);
                    
                    
                    subject = 'grid["rows"].0.label.length';
                    expect(() => jsonParsePath(subject)).
                        not.toThrow();
                    expect(jsonParsePath(subject)).
                        toEqual(['grid',
                                  'rows',
                                  '0',
                                  'label',
                                  'length']);
                    subject = 'grid.rows[0].label.length';
                    expect(() => jsonParsePath(subject)).
                        not.toThrow();
                    expect(jsonParsePath(subject)).
                        toEqual(['grid',
                                  'rows',
                                  '0',
                                  'label',
                                  'length']);
                        
                    subject = 'grid["rows"][0].label.length';
                    expect(() => jsonParsePath(subject)).
                        not.toThrow();
                    expect(jsonParsePath(subject)).
                        toEqual(['grid',
                                  'rows',
                                  '0',
                                  'label',
                                  'length']);
                        
                    subject = '["grid"].rows[0].label.length';
                    expect(() => jsonParsePath(subject)).
                        not.toThrow();
                    expect(jsonParsePath(subject)).
                        toEqual(['grid',
                                  'rows',
                                  '0',
                                  'label',
                                  'length']);
               });
            
            it(`3. Should be able to extract escaped string properties 
               JSON path (e.g. "grid.\\n\\.o\\].offset")`,
               () => {
                
                    var subject = "grid.\\n\\.o\\].offset";
                    expect(() => jsonParsePath(subject)).
                        not.toThrow();
                        
                    expect(jsonParsePath(subject)).
                        toEqual([
                            'grid',
                            'n.o]',
                            'offset'
                        ]);
                        
                    subject = "grid.\\n\\.o\\]['offset']";
                    expect(() => jsonParsePath(subject)).
                        not.toThrow();
                        
                    expect(jsonParsePath(subject)).
                        toEqual([
                            'grid',
                            'n.o]',
                            'offset'
                        ]);
                        
                    subject = "method[\"type\"].grid";
                    expect(() => jsonParsePath(subject)).
                        not.toThrow();
                        
                    expect(jsonParsePath(subject)).
                        toEqual([
                            'method',
                            'type',
                            'grid'
                        ]);
                        
                    subject = "method.id";
                    expect(() => jsonParsePath(subject)).
                        not.toThrow();
                        
                    expect(jsonParsePath(subject)).
                        toEqual([
                            'method',
                            'id'
                        ]);
               });
            
            it(`4. Should be able to extract empty bracket property 
               JSON path (e.g. "[].offset")`,
               () => {
                
                    var subject = "[].offset";
                    
                    expect(() => jsonParsePath(subject)).
                        not.toThrow();
                        
                    expect(jsonParsePath(subject)).
                        toEqual([
                            '',
                            'offset'
                        ]);
                        
                    subject = "offset[]";
                    
                    expect(() => jsonParsePath(subject)).
                        not.toThrow();
                        
                    expect(jsonParsePath(subject)).
                        toEqual([
                            'offset',
                            ''
                        ]);
                        
                        
                    subject = "grid[].offset";
                    
                    expect(() => jsonParsePath(subject)).
                        not.toThrow();
                        
                    expect(jsonParsePath(subject)).
                        toEqual([
                            'grid',
                            '',
                            'offset'
                        ]);
               });
            
            it(`5. Should be able to extract empty string in 
               bracket property JSON path (e.g. [""].offset)`,
               () => {
                
                    var subject = "[''].offset";
                    
                    expect(() => jsonParsePath(subject)).
                        not.toThrow();
                        
                    expect(jsonParsePath(subject)).
                        toEqual([
                            '',
                            'offset'
                        ]);
                        
                    subject = '[""].offset';
                    
                    expect(() => jsonParsePath(subject)).
                        not.toThrow();
                        
                    expect(jsonParsePath(subject)).
                        toEqual([
                            '',
                            'offset'
                        ]);
                        
               });
            
            it(`6. Should be able to extract empty string in 
               quoted property JSON path (e.g. "".offset)`,
               () => {
                
                    var subject = "''.offset";
                    
                    expect(() => jsonParsePath(subject)).
                        not.toThrow();
                        
                    expect(jsonParsePath(subject)).
                        toEqual([
                            '',
                            'offset'
                        ]);
                    
                    
                    subject = "offset.''";
                    
                    expect(() => jsonParsePath(subject)).
                        not.toThrow();
                        
                    expect(jsonParsePath(subject)).
                        toEqual([
                            'offset',
                            ''
                        ]);
                        
                    subject = '"".offset';
                    
                    expect(() => jsonParsePath(subject)).
                        not.toThrow();
                        
                    expect(jsonParsePath(subject)).
                        toEqual([
                            '',
                            'offset'
                        ]);
                        
                        
                    subject = 'offset.""';
                    
                    expect(() => jsonParsePath(subject)).
                        not.toThrow();
                        
                    expect(jsonParsePath(subject)).
                        toEqual([
                            'offset',
                            ''
                        ]);
                        
               });
        });