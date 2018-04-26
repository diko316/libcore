'use strict';

import { camelize } from '../../string';

describe(`Converts String [subject] to Camel cased String using 
         camelize(subject:String) method`,
    () => {
       
        it(`1. Should accept String [subject] and returns camel cased String 
           where non-alphabet characters are removed and change next 
           alphabet character to upper-case.`,
           () => {
            
                expect(() => camelize('ads-b-ds')).not.toThrow();
                
                expect(camelize('ads-b-ds')).toBe('adsBDs');
                
                expect(camelize('ads-)(*b_%+-ds')).toBe('adsBDs');
                
           });
        
        it(`2. Should not accept non-String [subject] and 
           throw error instead.`,
           () => {
            
                expect(() => camelize(1)).toThrow();
                expect(() => camelize(null)).toThrow();
                expect(() => camelize(new Date())).toThrow();
                
           });
    });