'use strict';

import { setAsync } from '../../processor';

describe(`Runs an asynchronous Function [handler] using 
         setAsync(handler:Function).`,
    () => {
        
        it(`1. Should accept Function [handler] parameter and
           run it later returning identifier for clearing it later.`,
           (done) => {
            
                var value = 1;
                
                expect(() => setAsync(() => {
                        expect(++value).toBe(3);
                        done();
                    })).
                       not.toThrow();
                
                expect(++value).toBe(2);
           });
        
        it(`2. Should not accept non-Function [handler] parameter 
           and throws an exception.`,
           () => {
                expect(() => setAsync(null)).toThrow();
                expect(() => setAsync(1)).toThrow();
                expect(() => setAsync({})).toThrow();
                expect(() => setAsync([])).toThrow();
                expect(() => setAsync(/test/)).toThrow();
           });
    });