'use strict';

import {
    register,
    run
} from '../../processor';

describe(`Runs a registered middleware callback using 
         run(name:String[, args:Iterable[, scope:Mixed]]).`,
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
            
            register(beforeRunName, registered.before);
            register(afterRunName, registered.after);
            register(runName, registered.normal);
            
        });
        
        
        it(`1. Should accept registered "before:[name]" middleware and run 
           all handlers that matches "before:[name]".`,
           () => {
                expect(() => run(beforeRunName, [sampleParam])).
                    not.toThrow();
                    
                expect(registered.before).
                    toHaveBeenCalledWith(sampleParam);
                    
                expect(registered.after).
                    not.toHaveBeenCalled();
                    
                expect(registered.normal).
                    not.toHaveBeenCalled();
           });
        
        it(`2. Should accept registered "after:[name]" middleware and run 
           all handlers that matches "after:[name]" and "[name]".`,
           () => {
                expect(() => run(afterRunName, [sampleParam])).
                    not.toThrow();
                    
                expect(registered.before).
                    not.toHaveBeenCalled();
                    
                expect(registered.after).
                    toHaveBeenCalledWith(sampleParam);
                    
                expect(registered.normal).
                    toHaveBeenCalledWith(sampleParam);
           });
        
        it(`3. Should accept registered "[name]" middleware and run 
           all handlers that matches "after:[name]" and "[name]".`,
           () => {
                expect(() => run(runName, [sampleParam])).
                    not.toThrow();
                    
                expect(registered.before).
                    not.toHaveBeenCalled();
                    
                expect(registered.after).
                    toHaveBeenCalledWith(sampleParam);
                    
                expect(registered.normal).
                    toHaveBeenCalledWith(sampleParam);
                    
           });
    });