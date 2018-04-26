'use strict';

import { thenable } from '../../type';

describe(`Inspects if Mixed [subject] is thenable (Promise) object or 
         object with then() method using thenable(subject:Mixed)`,
    () => {
        it(`1. Should accept any type of [subject] parameter and 
           returns true if [subject] is a Promise object or object with 
           then() method.`,
           () => {
            
                var resolver = (resolve) => resolve(true);
                var phony;
                
                expect(thenable(new Promise(resolver))).
                    toBe(true);
                expect(thenable(Promise.resolve(1))).toBe(true);
                
                phony = { then: () => 1 };
                expect(thenable(phony)).toBe(true);
                
                phony = function () {};
                phony.then = () => 1;
                expect(thenable(phony)).toBe(true);
            
           });
        
        it(`1. Should accept any type of [subject] parameter and 
           returns false if [subject] is not a Promise object or 
           object without then() method.`,
           () => {
                var phony;

                // NaN
                expect(thenable(2 * 'p')).toBe(false);
                
                expect(thenable(1)).toBe(false);
                expect(thenable(null)).toBe(false);
                expect(thenable(false)).toBe(false);
                
                expect(thenable({})).toBe(false);
                
                phony = function () {};
                expect(thenable(phony)).toBe(false);
                
            
           });
        
        
    });