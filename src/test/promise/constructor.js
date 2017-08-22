'use strict';


describe('Creates Promise by instantiating Promise constructor ' +
         'with [resolver] Function that passes [resolve] and [reject] ' +
         'parameters using ' +
         'new Promise(resolver(resolve:Function, reject:Function)) ' +
         'constructor.',
    () => {
        
        var lib = global.libcore;
        var resolver, good, bad;
        
        beforeEach(() => {
            
            good = (resolve) => {
                    resolve('good');
                };
                
            bad = (resolve, reject) => {
                    reject("Invalid");
                };
                
            resolver = {
                goodResult: (value) => {
                    return value;
                },
                
                badResult: (value) => {
                    return value;
                }
            };
            spyOn(resolver, 'goodResult');
            spyOn(resolver, 'badResult');
        });
        
        it('1. Should accept [resolver] Function that resolves a promise ' +
           'when using "new" keyword to instantiate a promise object',
           (done) => {
                var P = lib.Promise;
                
                (new P(good)).
                    then(resolver.goodResult,
                         resolver.badResult);
                    
                setTimeout(() => {
                    expect(resolver.goodResult).
                        toHaveBeenCalledWith('good');
                
                    expect(resolver.badResult).
                            not.toHaveBeenCalled();
                            
                    done();
                }, 10);
            
           });
        
        it('2. Should accept [resolver] Function that rejects a promise ' +
           'when using "new" keyword to instantiate a promise object',
           (done) => {
                var P = lib.Promise;
                
                (new P(bad)).
                    then(resolver.goodResult,
                         resolver.badResult);
                    
                setTimeout(() => {
                    expect(resolver.goodResult).
                        not.toHaveBeenCalled();
                    
                    expect(resolver.badResult).
                            toHaveBeenCalledWith("Invalid");
                            
                    done();
                }, 10);
            
           });
        
        it('3. Should instantiate a promise object that contains ' +
           'then() method.',
           () => {
                var P = lib.Promise;
                var promise;
                
                // resolved promise
                expect(() => promise = new P(good)).not.toThrow();
                expect(lib.object(promise)).toBe(true);
                expect('then' in promise).toBe(true);
                expect(lib.method(promise.then)).toBe(true);
                
                // rejected promise
                expect(() => promise = new P(bad)).not.toThrow();
                expect(lib.object(promise)).toBe(true);
                expect('then' in promise).toBe(true);
                expect(lib.method(promise.then)).toBe(true);
                
            
           });
        
        it('4. Should not accept non-Function [resolver] or empty constructor ' +
           'parameter when instantiating a Promise object using "new" keyword.',
           () => {
                var P = lib.Promise;
                
                expect(() => new P()).toThrow();
                
                expect(() => new P(null)).toThrow();
                
                expect(() => new P(new Date())).toThrow();
                
                expect(() => new P(1)).toThrow();
                
                expect(() => new P(/null/)).toThrow();
            
           });
        
        
    });