'use strict';

describe(`Retrieves normalized object information using signature(data:Mixed)`,
    () => {
        
        var lib = global.libcore;
        
        it(`1. Should accept String [data] parameter and 
           returns "[object String]".`,
            () => {
                expect(lib.signature("test")).toBe('[object String]');
            });
        
        it(`2. Should accept Finite Number [data] parameter and 
           returns "[object Number]".`,
            () => {
                expect(lib.signature(1)).toBe('[object Number]');
                expect(lib.signature(0xff)).toBe('[object Number]');
            });
        
        it(`3. Should accept Boolean [data] parameter and 
           returns "[object Boolean]".`,
            () => {
                expect(lib.signature(true)).toBe('[object Boolean]');
                expect(lib.signature(false)).toBe('[object Boolean]');
            });
        
        it(`4. Should accept Date [data] parameter and 
           returns "[object Date]".`,
            () => {
                expect(lib.signature(new Date())).toBe('[object Date]');
            });
        
        it(`5. Should accept RegExp [data] parameter and 
           returns "[object RegExp]".`,
            () => {
                expect(lib.signature(/test/)).toBe('[object RegExp]');
            });
        
        
        it(`6. Should accept Function [data] parameter and 
           returns "[object Function]".`,
            () => {
                expect(lib.signature(function () {})).toBe('[object Function]');
            });
        
        
        it(`7. Should accept Native Javascript Object [data] parameter and 
           returns "[object Object]".`,
            () => {
                expect(lib.signature({})).toBe('[object Object]');
            });
        
        it(`8. Should accept null or non-Finite Number [data] parameter and 
           returns "[object Null]".`,
            () => {
                expect(lib.signature(null)).toBe('[object Null]');
                expect(lib.signature(NaN)).toBe('[object Null]');
            });
        
        it(`9. Should accept undfined [data] parameter and
           returns "[object Undfined]".`,
            () => {
                expect(lib.signature(undefined)).toBe('[object Undefined]');
                expect(lib.signature(void(0))).toBe('[object Undefined]');
            });
        
    });