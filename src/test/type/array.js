'use strict';

describe(`Inspects if Mixed [subject] is Array using
         array(subject:Mixed, [nonEmpty:Boolean]) method`,
        () => {
            var lib = global.libcore;
            
            it(`1. Should accept Mixed [subject] and returns true if 
               [subject] is Array.`,
               () => {
                    
                    expect(lib.array([])).toBe(true);
                    expect(lib.array(['withitem'])).toBe(true);
               });
            
            it(`2. Should accept optional Boolean true [nonEmpty] parameter
               and returns true if [subject] is an not empty Array.`,
               () => {
                    expect(lib.array([], true)).toBe(false);
                    expect(lib.array(['withitem'], true)).toBe(true);
               });
            
            it(`3. Should accept optional Boolean false [nonEmpty] parameter
               and returns true if [subject] is empty or not empty Array.`,
               () => {
                    expect(lib.array([], false)).toBe(true);
                    expect(lib.array(['withitem'], false)).toBe(true);
               });
            
            it(`4. Should accept Mixed [subject] parameter
               and returns false if [subject] is not an Array.`,
               () => {
                    expect(lib.array({})).toBe(false);
                    expect(lib.array(/test/)).toBe(false);
                    expect(lib.array('ws')).toBe(false);
                    expect(lib.array(0xff)).toBe(false);
               });
            
        });