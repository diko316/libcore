'use strict';

import { method } from '../../type';

describe(`Inspects if Mixed [subject] is Function using 
         method(subject:Mixed) method.`,
        () => {
            it(`1. Should accept Mixed [subject] and returns true if 
               [subject] is Function.`,
               () => {
                    
                    expect(method(function() {})).toBe(true);
                    
               });
            
            it(`2. Should accept Mixed [subject] and returns false if 
               [subject] is not a Function.`,
               () => {
                    
                    expect(method(1)).toBe(false);
                    expect(method(/test/)).toBe(false);
                    expect(method({})).toBe(false);
                    expect(method(new Date())).toBe(false);
                    
               });
            
            
        });