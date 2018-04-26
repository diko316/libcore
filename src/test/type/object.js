'use strict';

import { object } from '../../type';

describe(`Inspects if Mixed [subject] is Native Javascript Object using 
         object(subject:Mixed)`,
        () => {
            it(`1. Should accept Mixed [subject] and returns true if 
               [subject] is a Native Javascript object or 
               a sub class of it.`,
               () => {
                    expect(object({})).toBe(true);
               });
            
            it(`2. Should accept Mixed [subject] and returns false if 
               [subject] is not a Native Javascript object or 
               not a sub class of it.`,
               () => {
                    expect(object(null)).toBe(false);
                    expect(object(/test/)).toBe(false);
                    expect(object("test")).toBe(false);
               });
        });