'use strict';



describe(`Removes ":before" or ":after" registered middleware callbacks 
         using clearRunner(name:String[, after:Boolean]]).`,
    () => {
        
        var lib = global.libcore,
            sampleParam = { count: 1 },
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
            
            lib.register(beforeRunName, registered.before);
            lib.register(afterRunName, registered.after);
            lib.register(runName, registered.normal);
            
        });
        
        
        it(`1. Should accept registered "before:[name]" or "after:[name]" 
           [name] parameter without the optional Booolean [after] parameter 
           and autodetect purging of "before" or "after" callbacks 
           based on [name] parameter`,
           () => {
                expect(() => lib.clearRunner(beforeRunName)).
                    not.toThrow();
                
                expect(() => lib.run(beforeRunName, [sampleParam])).
                    not.toThrow();
                    
                expect(registered.before).
                    not.toHaveBeenCalled();

                expect(() => lib.clearRunner(afterRunName));
                
                expect(() => lib.run(afterRunName, [sampleParam])).
                    not.toThrow();
                    
                expect(registered.after).
                    not.toHaveBeenCalled();
                    
                expect(registered.normal).
                    not.toHaveBeenCalled();
           });
        
        it(`2. Should accept Boolean true [after] parameter and removes all 
           "after:[name]" runners overriding [name] parameter selection.`,
           () => {
                expect(() => lib.clearRunner(beforeRunName, true)).
                    not.toThrow();
                    
                expect(() => lib.run(beforeRunName, [sampleParam])).
                    not.toThrow();
                    
                expect(() => lib.run(afterRunName, [sampleParam])).
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
                expect(() => lib.clearRunner(afterRunName, false)).
                    not.toThrow();
                    
                expect(() => lib.run(beforeRunName, [sampleParam])).
                    not.toThrow();
                    
                expect(() => lib.run(afterRunName, [sampleParam])).
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
                expect(() => lib.clearRunner(afterRunName, null)).
                    not.toThrow();
                    
                expect(() => lib.run(beforeRunName, [sampleParam])).
                    not.toThrow();
                    
                expect(() => lib.run(afterRunName, [sampleParam])).
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
                expect(() => lib.clearRunner(null)).
                    toThrow();
                expect(() => lib.clearRunner(undefined)).
                    toThrow();
                expect(() => lib.clearRunner(1)).
                    toThrow();
                expect(() => lib.clearRunner(/test/)).
                    toThrow();
                expect(() => lib.clearRunner(new Date())).
                    toThrow();
                expect(() => lib.clearRunner([])).
                    toThrow();
                expect(() => lib.clearRunner({})).
                    toThrow();
           });
    });
