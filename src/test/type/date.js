'use strict';

import { date } from '../../type';

describe(`Inspects if Mixed [subject] is Date using date(subject:Mixed)`,
        () => {
            it(`1. Should accept Mixed [subject] and returns true if 
               [subject] is a Date object.`,
               () => {
                    expect(date(new Date())).toBe(true);
               });
            
            it(`2. Should accept Mixed [subject] and returns false if 
               [subject] is not a Date object.`,
               () => {
                    
                    expect(date(null)).toBe(false);
                    expect(date(/test/)).toBe(false);
                    expect(date(NaN)).toBe(false);
                    expect(date(1)).toBe(false);
                    expect(date({})).toBe(false);
               });
            
            
        });