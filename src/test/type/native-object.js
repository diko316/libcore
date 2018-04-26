'use strict';

import { nativeObject } from '../../type';

describe(`Inspects if Mixed [subject] is raw Native Javascript Object using 
         nativeObject(subject:Mixed)`,
        () => {
            it(`1. Should accept Mixed [subject] and returns true if 
               [subject] is a raw Native Javascript Object.`,
               () => {
                    expect(nativeObject({})).toBe(true);
               });
            
            it(`2. Should accept Mixed [subject] and returns false if 
               [subject] is not a raw Native Javascript Object or 
               a sub class of Native Javascript Object.`,
               () => {
                    var sample;
                    function Empty() {
                    }
                    Empty.prototype = { constructor: Empty };
                    sample = new Empty();
                    
                    expect(nativeObject(null)).toBe(false);
                    expect(nativeObject(/test/)).toBe(false);
                    expect(nativeObject(sample)).toBe(false);
                    expect(nativeObject(Empty)).toBe(false);
               });
            
            
        });