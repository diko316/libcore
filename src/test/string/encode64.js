'use strict';

import {
    decode64,
    encode64
} from '../../string';

describe(`Encodes String [subject] into base 64 encoded string using 
         encode64(subject:String) method`,
    () => {
        
        var lib = global.libcore;
        
        it(`1. Should accept String [subject] and return base 64 
           encoded string`,
           () => {
                var subject = 'MZ  ÿÿ @ €',
                    result = 'TVogAyAEw7/DvyBAIOKCrA==';
                
                expect(() => encode64(subject)).not.toThrow();
                expect(encode64(subject)).
                    toBe(result);
                expect(btoa(unescape(encodeURIComponent(subject)))).
                    toBe(result);
           });
        
        it(`2. Should not accept non String [subject] parameter and 
           throws error instead`,
           () => {
                expect(() => encode64(true)).toThrow();
                expect(() => encode64(null)).toThrow();
                expect(() => encode64(new Date())).toThrow();
                
           });
    });
