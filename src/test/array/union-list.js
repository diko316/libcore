'use strict';

// motivation:
// https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php
describe(`Populates [array1] or Creates a union of Array [array1] and 
         [array2] using unionList(array1:Array,
                                array2:Array,
                                [clone:Boolean]) method`,
    () => {
        var lib = global.libcore;
        var array1, array2, correct;
        
        beforeEach(() => {
            array1 = ['abc', 'def', 'g', 89, 'g', 'abc'];
            array2 = [9, 2, 89, 0, 'abc', 'g'];
            correct = ['abc', 'def', 'g', 89, 9, 2, 0];
        });
        
        it(`'1. Should not accept non-Array [array1] parameter`,
           () => {
                expect(() => lib.unionList(null, array2)).toThrow();
                expect(() => lib.unionList(1, array2)).toThrow();
                expect(() => lib.unionList(new Date(), array2)).toThrow();
                expect(() => lib.unionList('x', array2)).toThrow();
           });
        
        it(`2. Should not accept non-Array [array2] parameter`,
           () => {
                expect(() => lib.unionList(array1, null)).toThrow();
                expect(() => lib.unionList(array1, 1)).toThrow();
                expect(() => lib.unionList(array1, new Date())).toThrow();
                expect(() => lib.unionList(array1, 'x')).toThrow();
           });
        
        it(`'3. Should populate [array1] with union of [array1] and [array2]
           parameters`,
           () => {
                var result;

                expect(() => result = lib.unionList(array1, array2)).
                        not.toThrow();
                        
                expect(result).toEqual(correct);
                expect(result).toBe(array1);
           });
        
        it(`4. Should create another Array with union of [array1] and 
           [array2] parameters if [clone] parameter is set to "true".`,
           () => {
                var result;

                expect(() => result = lib.unionList(array1, array2, true)).
                        not.toThrow();
                        
                expect(result).toEqual(correct);
                expect(result).not.toBe(array1);
           });
        
        
    });