'use strict';

import {
    decode64,
    encode64
} from '../../string';

describe(`decodes a base 64 encoded String [subject] into
         ASCII 256 bit string using encode64(subject:String) method`,
    () => {
       
        it(`1. Should accept base 64 encoded String [subject] and 
           return ASCII 256 bit string`,
           () => {
                var subject = 'TVogAyAEw7/DvyBAIOKCrA==';
                
                expect(() => decode64(subject)).not.toThrow();
                expect(decode64(subject)).
                    toBe('MZ  ÿÿ @ €');
                expect(decodeURIComponent(escape(atob(subject)))).
                    toBe('MZ  ÿÿ @ €');
           });
        
        it(`2. Should not accept String [subject] parameter with
           non-base 64 encode character throws error.`,
           () => {
                expect(() => decode64('MZ  ÿÿ @ €')).
                    toThrow();
                
           });
        
        it(`3. Should not accept non String [subject] parameter and 
           throws error instead`,
           () => {
                expect(() => encode64(true)).toThrow();
                expect(() => encode64(null)).toThrow();
                expect(() => encode64(new Date())).toThrow();
                
           });
    });
