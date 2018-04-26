'use strict';

import { trim } from '../../string';

describe(`Removes extra leading and trailing white spaces using
        trim(subject:String) method`,
    () => {
        it(`1. Should accept string and removes line-feed(\\r\\n),
            tab, and space leading and trailing characters.`,
            () => {
                expect(trim(" \r\n test \t\r\n")).toBe("test");
                expect(trim("")).toBe("");
            });

        it(`2. Should not accept non-string and removes line-feed(\\r\\n),
            tab, and space leading and trailing characters.`,
            () => {
                expect(() => trim(1)).toThrow();
                expect(() => trim(/test/)).toThrow();
                expect(() => trim(null)).toThrow();
                expect(() => trim(new Date())).toThrow();
                expect(() => trim([])).toThrow();
                expect(() => trim({})).toThrow();
            });
    });