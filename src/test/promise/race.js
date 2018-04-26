'use strict';

import Promise from '../../promise';

describe(`Creates a promise from [iterable] values or promises 
         then resolves or rejects if one of the item in 
         [iterable] is settled using Promise.race(iterable:Mixed)`,
    () => {
        var P = Promise;
            
        it(`1. Should accept [iterable] object or Objects with "length" 
           Number of items.`,
           (done) => {
                var callback = {
                        isRejected: false,
                        result: null,
                        
                        fulfilled: (value) => {
                            callback.result = value;
                            return value;
                        },
                        
                        rejected: (error) => {
                            callback.isRejected = true;
                            callback.result = error;
                            return error;
                        }
                    };
                
                expect(() => P.race([1, 2, P.resolve("18")])).not.toThrow();
                expect(() => P.race('Str')).not.toThrow();
                
                P.race([1, 'test', P.resolve("100")]).
                    then(callback.fulfilled,
                         callback.rejected);
                    
                setTimeout(() => {
                    
                    expect(callback.isRejected).toBe(false);
                    expect(callback.result).toEqual(1);
                    
                    done();
                    
                }, 1000);
                
           });
        
        it(`2. Should not accept [iterable] that is not iterable object or 
            Objects without "length" Number of items.`,
           () => {
                expect(() => P.race(null)).toThrow();
                expect(() => P.race(1)).toThrow();
                expect(() => P.race(undefined)).toThrow();
                expect(() => P.race(false)).toThrow();
           });
    });