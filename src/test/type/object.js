'use strict';

describe('Checks if Mixed [subject] is Native Javascript Object using ' +
         'object(subject:Mixed)',
        () => {
            var lib = global.libcore;
            
            it('1. Should accept Mixed [subject] and returns true if ' +
               '[subject] is a Native Javascript object or ' +
               'a sub class of it.',
               () => {
                    expect(lib.object({})).toBe(true);
               });
            
            it('1. Should accept Mixed [subject] and returns false if ' +
               '[subject] is not a Native Javascript object or ' +
               'not a sub class of it.',
               () => {
                    expect(lib.object(null)).toBe(false);
                    expect(lib.object(/test/)).toBe(false);
                    expect(lib.object("test")).toBe(false);
               });
        });