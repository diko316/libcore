'use strict';


describe('Creates a promise from [iterable] values or promises that resolves ' +
         'if all items in [iterable] fulfills or rejects if all items in ' +
         '[iterable] rejects using Promise.all(iterable:Mixed)',
    () => {
        var lib = global.libcore,
            P = lib.Promise;
            
        it('1. Should accept [iterable] object or Objects with "length" ' +
           'Number of items.',
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
                
                expect(() => P.all([1, 2, P.resolve("18")])).not.toThrow();
                expect(() => P.all('Str')).not.toThrow();
                
                P.all([1, 'test', P.resolve("100")]).
                    then(callback.fulfilled,
                         callback.rejected);
                    
                setTimeout(() => {
                    
                    expect(callback.isRejected).toBe(false);
                    expect(callback.result).toEqual([1, 'test', "100"]);
                    
                    done();
                    
                }, 1000);
                
           });
        
        it('2. Should not accept [iterable] that is not iterable object or ' +
           ' Objects without "length" Number of items.',
           () => {
                expect(() => P.all(null)).toThrow();
                expect(() => P.all(1)).toThrow();
                expect(() => P.all(undefined)).toThrow();
                expect(() => P.all(false)).toThrow();
           });
    });