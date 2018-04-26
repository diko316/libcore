'use strict';


import {
    register,
    run,
    clearRunner
} from '../../processor';


describe(`Removes ":before" or ":after" registered middleware callbacks 
         using clearRunner(name:String[, after:Boolean]]).`,
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
        
        
        it(`1. Should accept registered "before:[name]" or "after:[name]" 
           [name] parameter without the optional Booolean [after] parameter 
           and autodetect purging of "before" or "after" callbacks 
           based on [name] parameter`,
           () => {
                expect(() => clearRunner(beforeRunName)).
                    not.toThrow();
                
                expect(() => run(beforeRunName, [sampleParam])).
                    not.toThrow();
                    
                expect(registered.before).
                    not.toHaveBeenCalled();

                expect(() => clearRunner(afterRunName));
                
                expect(() => run(afterRunName, [sampleParam])).
                    not.toThrow();
                    
                expect(registered.after).
                    not.toHaveBeenCalled();
                    
                expect(registered.normal).
                    not.toHaveBeenCalled();
           });
        
        it(`2. Should accept Boolean true [after] parameter and removes all 
           "after:[name]" runners overriding [name] parameter selection.`,
           () => {
                expect(() => clearRunner(beforeRunName, true)).
                    not.toThrow();
                    
                expect(() => run(beforeRunName, [sampleParam])).
                    not.toThrow();
                    
                expect(() => run(afterRunName, [sampleParam])).
                    not.toThrow();
                    
                expect(registered.before).
                    toHaveBeenCalled();
                    
                expect(registered.after).
                    not.toHaveBeenCalled();
                    
                expect(registered.normal).
                    not.toHaveBeenCalled();
           });
        
        it(`3. Should accept Boolean false [after] parameter and removes all 
           "before:[name]" runners overriding [name] parameter selection.`,
           () => {
                expect(() => clearRunner(afterRunName, false)).
                    not.toThrow();
                    
                expect(() => run(beforeRunName, [sampleParam])).
                    not.toThrow();
                    
                expect(() => run(afterRunName, [sampleParam])).
                    not.toThrow();
                    
                expect(registered.before).
                    not.toHaveBeenCalled();
                    
                expect(registered.after).
                    toHaveBeenCalled();
                    
                expect(registered.normal).
                    toHaveBeenCalled();
           });
        
        it(`4. Should accept null [after] parameter and removes all 
           "before:[name]" and "after:[name]" runners.`,
           () => {
                expect(() => clearRunner(afterRunName, null)).
                    not.toThrow();
                    
                expect(() => run(beforeRunName, [sampleParam])).
                    not.toThrow();
                    
                expect(() => run(afterRunName, [sampleParam])).
                    not.toThrow();
                    
                expect(registered.before).
                    not.toHaveBeenCalled();
                    
                expect(registered.after).
                    not.toHaveBeenCalled();
                    
                expect(registered.normal).
                    not.toHaveBeenCalled();
           });
        
        it(`5. Should not accept non-String or empty String [name] parameter
           and throws an exception.`,
           () => {
                expect(() => clearRunner(null)).
                    toThrow();
                expect(() => clearRunner(undefined)).
                    toThrow();
                expect(() => clearRunner(1)).
                    toThrow();
                expect(() => clearRunner(/test/)).
                    toThrow();
                expect(() => clearRunner(new Date())).
                    toThrow();
                expect(() => clearRunner([])).
                    toThrow();
                expect(() => clearRunner({})).
                    toThrow();
           });
    });
