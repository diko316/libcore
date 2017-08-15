'use strict';

describe('Checks if Mixed [subject] is Native Javascript Object using ' +
         'object(subject:Mixed)',
        () => {
            var lib = global.libcore;
            
            it('1. Should accept any [subject] and returns true if ' +
               '[subject] is a Native Javascript object.',
               () => {
                    expect(lib.object({})).toBe(true);
                    expect(lib.object(null)).toBe(false);
                    expect(lib.object(/test/)).toBe(false);
                    expect(lib.object("test")).toBe(false);
               });
        });