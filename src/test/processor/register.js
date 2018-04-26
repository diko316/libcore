'use strict';

import {
    register,
    run
} from '../../processor';

describe(`Registers a middleware callback using 
         register(name:String, handler:Function) method.`,
    () => {
        
        var sampleParam = { count: 1 },
            beforeRunName = 'before:exampleCall',
            runName = 'exampleCall',
            afterRunName = 'after:exampleCall';
        var registered;
        
        beforeEach(() => {
            
            registered = {
                before: (obj) => {
                    obj.count++;
                },
                after: (obj) => {
                    obj.count++;
                },
                normal: (obj) => {
                    obj.count++;
                }
            };
            
            spyOn(registered, 'before').and.callThrough();
            spyOn(registered, 'after').and.callThrough();
            spyOn(registered, 'normal').and.callThrough();
            
        });
        
        it(`1. Should accept [name] parameter without "before:" or "after:" 
           prefix and Function [handler] parameter then succesfully 
           register middleware callback.`,
           () => {
                expect(() => register(runName, registered.normal)).
                    not.toThrow();
                expect(() => run(runName, [sampleParam])).
                    not.toThrow();
                    
                expect(registered.normal).
                    toHaveBeenCalledWith(sampleParam);
           });
           
        it(`2. Should accept [name] parameter with "before:" prefix and 
           Function [handler] parameter then succesfully 
           register middleware callback.`,
           () => {
                
                expect(() => register(beforeRunName, registered.before)).
                    not.toThrow();
                
                expect(() => run(beforeRunName, [sampleParam])).
                    not.toThrow();
                    
                expect(registered.before).
                    toHaveBeenCalledWith(sampleParam);
           });
        
        it(`3. Should accept [name] parameter with "after:" prefix and 
           Function [handler] parameter then succesfully 
           register middleware callback.`,
           () => {
                
                expect(() => register(afterRunName, registered.after)).
                    not.toThrow();
                
                expect(() => run(afterRunName, [sampleParam])).
                    not.toThrow();
                    
                expect(registered.after).
                    toHaveBeenCalledWith(sampleParam);
           });
        
        it(`4. Should not accept non-String or emtpy String [name]
           parameter and throw exception.`,
           () => {
                expect(() => register(1, registered.before)).
                    toThrow();
                expect(() => register(null, registered.before)).
                    toThrow();
                expect(() => register({}, registered.before)).
                    toThrow();
                expect(() => register([], registered.before)).
                    toThrow();
                expect(() => register(() => null, registered.before)).
                    toThrow();
                expect(() => register(/test/, registered.before)).
                    toThrow();
           });
        
        it(`5. Should not accept non-Function [handler] parameter 
           parameter and throw exception.`,
           () => {
                expect(() => register(runName, null)).
                    toThrow();
                expect(() => register(afterRunName, undefined)).
                    toThrow();
                expect(() => register(beforeRunName, /test/)).
                    toThrow();
                expect(() => register(runName, [])).
                    toThrow();
                expect(() => register(afterRunName, 'test')).
                    toThrow();
                expect(() => register(beforeRunName, 1)).
                    toThrow();
           });
        
    });