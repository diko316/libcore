'use strict';

import { regex } from '../../type';

describe(`Inspects if Mixed [subject] is RegExp using regex(subject:Mixed)`,
        () => {
            it(`1. Should accept Mixed [subject] and returns true if 
               [subject] is a RegExp object.`,
               () => {
                    expect(regex(/test/)).toBe(true);
                    expect(regex(new RegExp('abc'))).toBe(true);
               });
            
            it(`2. Should accept Mixed [subject] and returns false if 
               [subject] is not a RegExp object.`,
               () => {
                    
                    expect(regex(null)).toBe(false);
                    expect(regex(new Date())).toBe(false);
                    expect(regex(NaN)).toBe(false);
                    expect(regex(1)).toBe(false);
                    expect(regex({})).toBe(false);
               });
            
            
        });