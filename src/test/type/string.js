'use strict';

import { string } from '../../type';

describe(`Inspects if Mixed [subject] is String using 
         string(subject:Mixed, [allowEmpty:Boolean])`,
    () => {
        
        it(`1. Should accept Mixed [subject] and returns true if 
            [subject] is a non-empty String.`,
            () => {
                expect(string("test")).toBe(true);
                expect(string(new String("test"))).toBe(true);
            });
        
        it(`2. Should accept Mixed [subject] and returns false if 
            [subject] is not a non-empty String.`,
            () => {
                expect(string("")).toBe(false);
                expect(string(null)).toBe(false);
                expect(string(/test/)).toBe(false);
                expect(string(new String(""))).toBe(false);
            });
        
        it(`3. Should accept optional Boolean true [allowEmpty] 
            parameter and returns true 
            if [subject] is empty or not empty String.`,
            () => {
                expect(string("", true)).toBe(true);
                expect(string(new String(""), true)).toBe(true);
            });
        
        it(`4. Should accept optional Boolean false [allowEmpty] 
            parameter and returns true if [subject] is not empty String.`,
            () => {
                expect(string("", false)).toBe(false);
                expect(string(new String(""), false)).toBe(false);
                expect(string("test", false)).toBe(true);
                expect(string(new String("test"), false)).toBe(true);
            });
    });