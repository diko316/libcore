'use strict';

import { scalar } from '../../type';

describe(`Inspects if Mixed [subject] is Scalar using scalar(subject:Mixed)`, () => {
    it(`1. Should accept Mixed [subject] and returns true if 
        [subject] is Number and is Finite.`,
        () => {
        expect(scalar(101)).toBe(true);
        expect(scalar(0xff)).toBe(true);
        expect(scalar(NaN)).toBe(false);
    });


    it(`2. Should accept Mixed [subject] and returns true if 
        [subject] is String (empty or not empty).`,
        () => {
        expect(scalar("")).toBe(true);
        expect(scalar("not empty")).toBe(true);
    });

    it(`3. Should accept Mixed [subject] and returns true if 
        [subject] is Boolean.`,
        () => {
        expect(scalar(true)).toBe(true);
        expect(scalar(false)).toBe(true);
    });

    it(`4. Should accept Mixed [subject] and returns false if 
        [subject] is not String, Finite Number, or Boolean.`,
        () => {
        expect(scalar(null)).toBe(false);
        expect(scalar(new Date())).toBe(false);
        expect(scalar(undefined)).toBe(false);
        expect(scalar(/test/)).toBe(false);
    });
});