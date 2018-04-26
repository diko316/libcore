'use strict';

import {
    setAsync,
    clearAsync
} from '../../processor';

describe(`Clears an asynchronous Function call from 
         setAsync(handler:Function) call using its returned call [id] in 
         clearAsync(id:Mixed).`,
    () => {
        
        it(`1. Should accept any valid asynchrounous Function call [id] 
           parameter and removes from pending execution list.`,
           (done) => {
            
                var value = 1,
                    id = null,
                    calling = {
                        fn: () => {
                            value++;
                        }
                    };
                spyOn(calling, 'fn');
                
                expect(() => id = setAsync(calling.fn)).not.toThrow();
                
                expect(() => clearAsync(id)).not.toThrow();
                
                setTimeout(() => {
                    
                    expect(calling.fn).
                        not.toHaveBeenCalled();
                        
                    expect(++value).toBe(2);
                    
                    done();
                }, 100);
           });
        
        it(`2. Should accept any [id] value and do nothing if it is not 
           a valid asynchronous Function call [id].`,
           () => {
                expect(() => clearAsync(null)).not.toThrow();
                expect(() => clearAsync(1)).not.toThrow();
                expect(() => clearAsync({})).not.toThrow();
                expect(() => clearAsync([])).not.toThrow();
                expect(() => clearAsync(/test/)).not.toThrow();
           });
    });