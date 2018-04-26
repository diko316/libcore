'use strict';

import { uncamelize } from '../../string';

describe(`Converts String [subject] to Snaked cased "-" delimited String 
         using uncamelize(subject:String) method`,
    () => {
        it(`1. Should accept String [subject] and returns snake cased 
            "-" delimited String and next upper-cased alphabet character 
           is onverted to lower-case.`,
           () => {
            
                expect(() => uncamelize('adsBDs')).not.toThrow();
                
                expect(uncamelize('adsBDs')).toBe('ads-b-ds');
                
                expect(uncamelize('testMethod')).toBe('test-method');
                
           });
        
        it(`2. Should not accept non-String [subject] and 
           throw error instead.`,
           () => {
            
                expect(() => uncamelize(1)).toThrow();
                expect(() => uncamelize(null)).toThrow();
                expect(() => uncamelize(new Date())).toThrow();
                
           });
    });