'use strict';

describe('Runs an asynchronous Function [handler] using ' +
         'setAsync(handler:Function).',
    () => {
        
        var lib = global.libcore;
        
        it('1. Should accept Function [handler] parameter and' +
           'run it later returning identifier for clearing it later.',
           (done) => {
            
                var value = 1;
                
                expect(() => lib.setAsync(() => {
                        expect(++value).toBe(3);
                        done();
                    })).
                       not.toThrow();
                
                expect(++value).toBe(2);
           });
        
        it('2. Should not accept non-Function [handler] parameter ' +
           'and throws an exception.',
           () => {
                expect(() => lib.setAsync(null)).toThrow();
                expect(() => lib.setAsync(1)).toThrow();
                expect(() => lib.setAsync({})).toThrow();
                expect(() => lib.setAsync([])).toThrow();
                expect(() => lib.setAsync(/test/)).toThrow();
           });
    });