'use strict';

import { middleware } from '../../processor';

describe(`Creates a Namespaced Middleware instance that can register() and 
          run() using middleware(name:String) method.`,
    () => {
        
        var beforeRunName = 'before:exampleCall',
            runName = 'exampleCall',
            afterRunName = 'after:exampleCall';
        var registered;
        
        beforeEach(() => {
            
            registered = {
                before: (count) => {
                    return ++count;
                },
                after: (count) => {
                    return ++count;
                },
                normal: (count) => {
                    return ++count;
                }
            };
            
            spyOn(registered, 'before').and.callThrough();
            spyOn(registered, 'after').and.callThrough();
            spyOn(registered, 'normal').and.callThrough();
            
            
        });
        
        it(`1. Should accept String [name] parameter and returns an instance 
           of Middleware for further registration of callbacks.`,
           () => {
                var myMiddleware;
                
                expect(() => myMiddleware = middleware('test')).
                    not.toThrow();
                    
                expect(() => myMiddleware.register(runName,
                                                   registered.normal)).
                    not.toThrow();
                expect(() => myMiddleware.run(runName, [1])).
                    not.toThrow();
                    
                expect(registered.normal).
                    toHaveBeenCalledWith(1);
                
                expect(() => myMiddleware.register(beforeRunName,
                                                   registered.before)).
                    not.toThrow();
                
                expect(() => myMiddleware.run(beforeRunName, [1])).
                    not.toThrow();
                    
                expect(registered.before).
                    toHaveBeenCalledWith(1);
                    
                expect(() => myMiddleware.register(afterRunName,
                                                   registered.after)).
                    not.toThrow();
                
                expect(() => myMiddleware.run(afterRunName, [1])).
                    not.toThrow();
                
                // 2 because it included the normal callback
                expect(registered.after).
                    toHaveBeenCalledWith(2);
                
            
           });
        
        it(`2. Should not accept non-String or empty String [name]
               parameter and throws an exception.`,
           () => {
                expect(() => middleware(1)).toThrow();
                expect(() => middleware(/test/)).toThrow();
                expect(() => middleware([])).toThrow();
                expect(() => middleware({})).toThrow();
                expect(() => middleware(new Date())).toThrow();
           });
            
    });