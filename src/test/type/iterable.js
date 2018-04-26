'use strict';

import { iterable } from '../../type';

describe(`Inspects if Mixed [subject] is iterable object using 
         iterable(subject:Mixed)`,
    () => {
        it(`1. Should accept any type of [subject] parameter and 
           returns true if [subject] is not scalar or has "length" 
           number property.`,
           () => {
            
                var phony;
                
                
                expect(iterable('my string')).toBe(true);
                expect(iterable([])).toBe(true);
                
                phony = { length: 0 };
                expect(iterable(phony)).toBe(true);
                
                phony = new Date();
                phony.length = 1;
                expect(iterable(phony)).toBe(true);
            
           });
        
        it(`2. Should accept any type of [subject] parameter and
           returns false if [subject] is scalar or has no "length" 
           number property.`,
           () => {
                var phony;
                
                expect(iterable(1)).toBe(false);
                expect(iterable(null)).toBe(false);
                expect(iterable(false)).toBe(false);
                
                expect(iterable({})).toBe(false);
                
                phony = new Date();
                expect(iterable(phony)).toBe(false);
                
            
           });
        
        
    });