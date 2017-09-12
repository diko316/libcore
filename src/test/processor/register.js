'use strict';


describe(`Registers a middleware callback using 
         register(name:String, handler:Function) method.`,
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
            
        });
        
        it(`1. Should accept [name] parameter without "before:" or "after:" 
           prefix and Function [handler] parameter then succesfully 
           register middleware callback.`,
           () => {
                expect(() => lib.register(runName, registered.normal)).
                    not.toThrow();
                expect(() => lib.run(runName, [sampleParam])).
                    not.toThrow();
                    
                expect(registered.normal).
                    toHaveBeenCalledWith(sampleParam);
           });
           
        it(`2. Should accept [name] parameter with "before:" prefix and 
           Function [handler] parameter then succesfully 
           register middleware callback.`,
           () => {
                
                expect(() => lib.register(beforeRunName, registered.before)).
                    not.toThrow();
                
                expect(() => lib.run(beforeRunName, [sampleParam])).
                    not.toThrow();
                    
                expect(registered.before).
                    toHaveBeenCalledWith(sampleParam);
           });
        
        it(`3. Should accept [name] parameter with "after:" prefix and 
           Function [handler] parameter then succesfully 
           register middleware callback.`,
           () => {
                
                expect(() => lib.register(afterRunName, registered.after)).
                    not.toThrow();
                
                expect(() => lib.run(afterRunName, [sampleParam])).
                    not.toThrow();
                    
                expect(registered.after).
                    toHaveBeenCalledWith(sampleParam);
           });
        
        it(`4. Should not accept non-String or emtpy String [name]
           parameter and throw exception.`,
           () => {
                expect(() => lib.register(1, registered.before)).
                    toThrow();
                expect(() => lib.register(null, registered.before)).
                    toThrow();
                expect(() => lib.register({}, registered.before)).
                    toThrow();
                expect(() => lib.register([], registered.before)).
                    toThrow();
                expect(() => lib.register(() => null, registered.before)).
                    toThrow();
                expect(() => lib.register(/test/, registered.before)).
                    toThrow();
           });
        
        it(`5. Should not accept non-Function [handler] parameter 
           parameter and throw exception.`,
           () => {
                expect(() => lib.register(runName, null)).
                    toThrow();
                expect(() => lib.register(afterRunName, undefined)).
                    toThrow();
                expect(() => lib.register(beforeRunName, /test/)).
                    toThrow();
                expect(() => lib.register(runName, [])).
                    toThrow();
                expect(() => lib.register(afterRunName, 'test')).
                    toThrow();
                expect(() => lib.register(beforeRunName, 1)).
                    toThrow();
           });
        
    });