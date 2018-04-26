'use strict';

import { differenceList } from '../../array';

// motivation:
// https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php
describe(`Populates [array1] or Creates a difference of 
         Array [array1] and [array2] using differenceList(array1:Array, 
                                                    array2:Array, 
                                                    [clone:Boolean]) method`,
    () => {
        var array1, array2, correct;
        
        beforeEach(() => {
            array1 = ['abc', 'def', 'g', 89, 'g', 'abc'];
            array2 = [9, 2, 89, 0, 'abc', 'g'];
            correct = ['def'];
        });
        
        it(`1. Should not accept non-Array [array1] parameter`,
           () => {
                expect(() => differenceList(null, array2)).toThrow();
                expect(() => differenceList(1, array2)).toThrow();
                expect(() => differenceList(new Date(), array2)).toThrow();
                expect(() => differenceList('x', array2)).toThrow();
           });
        
        it(`2. Should not accept non-Array [array2] parameter`,
           () => {
                expect(() => differenceList(array1, null)).toThrow();
                expect(() => differenceList(array1, 1)).toThrow();
                expect(() => differenceList(array1, new Date())).toThrow();
                expect(() => differenceList(array1, 'x')).toThrow();
           });
        
        it(`3. Should populate [array1] with difference of 
           [array1] and [array2] parameters`,
           () => {
                var result;

                expect(() => result = differenceList(array1, array2)).
                        not.toThrow();
                        
                expect(result).toEqual(correct);
                expect(result).toBe(array1);
           });
        
        it(`4. Should create another Array with difference 
           of [array1] and [array2] parameters if [clone] parameter 
           is set to "true".`,
           () => {
                var result;

                expect(() => result = differenceList(array1, array2, true)).
                        not.toThrow();
                        
                expect(result).toEqual(correct);
                expect(result).not.toBe(array1);
           });
        
        
    });