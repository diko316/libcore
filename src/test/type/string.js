'use strict';

describe(`Inspects if Mixed [subject] is String using 
         string(subject:Mixed, [allowEmpty:Boolean])`,
        () => {
            var lib = global.libcore;
            
            it(`1. Should accept Mixed [subject] and returns true if 
               [subject] is a non-empty String.`,
               () => {
                    expect(lib.string("test")).toBe(true);
                    expect(lib.string(new String("test"))).toBe(true);
               });
            
            it(`2. Should accept Mixed [subject] and returns false if 
               [subject] is not a non-empty String.`,
               () => {
                    expect(lib.string("")).toBe(false);
                    expect(lib.string(null)).toBe(false);
                    expect(lib.string(/test/)).toBe(false);
                    expect(lib.string(new String(""))).toBe(false);
               });
            
            it(`3. Should accept optional Boolean true [allowEmpty] 
               parameter and returns true 
               if [subject] is empty or not empty String.`,
               () => {
                    expect(lib.string("", true)).toBe(true);
                    expect(lib.string(new String(""), true)).toBe(true);
               });
            
            it(`4. Should accept optional Boolean false [allowEmpty] 
               parameter and returns true if [subject] is not empty String.`,
               () => {
                    expect(lib.string("", false)).toBe(false);
                    expect(lib.string(new String(""), false)).toBe(false);
                    expect(lib.string("test", false)).toBe(true);
                    expect(lib.string(new String("test"), false)).toBe(true);
               });
        });