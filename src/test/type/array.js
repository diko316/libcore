'use strict';

import { array } from '../../type';

describe(`Inspects if Mixed [subject] is Array using
         array(subject:Mixed, [nonEmpty:Boolean]) method`,
        () => {
            it(`1. Should accept Mixed [subject] and returns true if 
               [subject] is Array.`,
               () => {
                    
                    expect(array([])).toBe(true);
                    expect(array(['withitem'])).toBe(true);
               });
            
            it(`2. Should accept optional Boolean true [nonEmpty] parameter
               and returns true if [subject] is an not empty Array.`,
               () => {
                    expect(array([], true)).toBe(false);
                    expect(array(['withitem'], true)).toBe(true);
               });
            
            it(`3. Should accept optional Boolean false [nonEmpty] parameter
               and returns true if [subject] is empty or not empty Array.`,
               () => {
                    expect(array([], false)).toBe(true);
                    expect(array(['withitem'], false)).toBe(true);
               });
            
            it(`4. Should accept Mixed [subject] parameter
               and returns false if [subject] is not an Array.`,
               () => {
                    expect(array({})).toBe(false);
                    expect(array(/test/)).toBe(false);
                    expect(array('ws')).toBe(false);
                    expect(array(0xff)).toBe(false);
               });
            
        });