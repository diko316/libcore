'use strict';

import { number } from '../../type';

describe(`Inspects if Mixed [subject] is Number using number(subject:Mixed)`,
        () => {
            it(`1. Should accept Mixed [subject] and returns true if 
               [subject] is a Number and is Finite.`,
               () => {
                    
                    expect(number(101)).toBe(true);
                    expect(number(0xff)).toBe(true);
               });
            
            it(`2. Should accept Mixed [subject] and returns false if 
               [subject] is not a Number or not Finite.`,
               () => {
                    
                    expect(number(null)).toBe(false);
                    expect(number(/test/)).toBe(false);
                    expect(number(NaN)).toBe(false);
               });
            
            
        });