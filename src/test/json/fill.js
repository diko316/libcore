'use strict';


describe('Fill [subject] Object with property or array item with [value] ' +
         'accessed from [path] using jsonFill(path:String,' +
                                            'subject:Mixed, ' +
                                            'value:Mixed, ' +
                                            '[overwrite:Boolean])',
    () => {
        var lib = global.libcore;
        var subject;
        
        beforeEach(() => {
            subject = {
                
            };
        });
        
        
        it('1. Should accept [subject] and populate objects ' +
           'from the given [path] then returning "true" if it succeeds in ' +
           'adding property to object or appending item in array',
           () => {
                
                expect(() => lib.jsonFill('grid.paging.offset',
                                          {},
                                          0)).
                       not.toThrow();
                       
                expect(lib.jsonFill('grid.paging.offset',
                                          subject,
                                          0)).toBe(true);
                
                expect(subject.grid.paging.offset).toBe(0);
            
           });
        
        it('2. Should accept [subject] and populate array ' +
           'from the given [path] on every numeric propery name encountered ' +
           'then returning "true" if it succeeds in ' +
           'adding property to object or appending item in array',
           () => {
            
                var value = { name: "subitem" };
                
                expect(() => lib.jsonFill('grid[0].subitems[1]',
                                          {},
                                          { name: "subitem" })).
                       not.toThrow();
                       
                expect(lib.jsonFill('grid.rows[0].subitems[1]',
                                    subject,
                                    value)).toBe(true);
                
                expect(lib.array(subject.grid.rows)).toBe(true);
                
                expect(lib.array(subject.grid.rows[0].subitems)).toBe(true);
                
                expect(subject.grid.rows[0].subitems[1]).toBe(value);
            
           });
        
        
        it('3. Should accept [subject] and populate array ' +
           'from the given [path] on every numeric propery name encountered ' +
           'and appending items if already an array ' +
           'then returning "true" if it succeeds in ' +
           'adding property to object or appending item in array',
           () => {
            
                var value = { name: "subitem" },
                    firstValue = { name: "first value" },
                    anotherRow = { id: "row2" };
                
                expect(() => lib.jsonFill('grid.rows[0].subitems[1]',
                                          subject,
                                          firstValue)).
                       not.toThrow();
                       
                expect(lib.jsonFill('grid.rows[0].subitems[2]',
                                    subject,
                                    value)).
                        toBe(true);
                
                expect(lib.array(subject.grid.rows)).toBe(true);
                
                expect(lib.array(subject.grid.rows[0].subitems)).toBe(true);
                expect(lib.jsonFill('grid.rows[1]',
                                    subject,
                                    anotherRow)).
                        toBe(true);
                
                expect(subject.grid.rows[0].subitems[1]).toBe(firstValue);
                expect(subject.grid.rows[0].subitems[2]).toBe(value);
                expect(subject.grid.rows[1]).toBe(anotherRow);
            
           });
        
        it('4. Should accept [subject] and populate array ' +
           'from the given [path] appending array items when blank index is ' +
           'encountered then returning "true" if it succeeds in ' +
           'adding property to object or appending item in array',
           () => {
            
                var value = { name: "subitem" },
                    firstValue = { name: "first value" },
                    anotherRow = { id: "row2" };
                
                expect(() => lib.jsonFill('grid.rows[].subitems[]',
                                          subject,
                                          firstValue)).
                       not.toThrow();
                       
                expect(lib.jsonFill('grid.rows[].subitems[]',
                                    subject,
                                    value)).
                        toBe(true);
                
                expect(lib.array(subject.grid.rows)).toBe(true);
                
                expect(lib.array(subject.grid.rows[0].subitems)).toBe(true);
                
                
                expect(lib.jsonFill('grid.rows[]',
                                    subject,
                                    anotherRow)).
                        toBe(true);
                
                expect(subject.grid.rows[0].subitems[0]).toBe(firstValue);
                expect(subject.grid.rows[1].subitems[0]).toBe(value);
                expect(subject.grid.rows[2]).toBe(anotherRow);
            
           });
    });