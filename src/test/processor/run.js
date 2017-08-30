'use strict';


describe('Runs a registered middleware callback using ' +
         'run(name:String[, args:Iterable[, scope:Mixed]]).',
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
            
            spyOn(registered, 'before');
            spyOn(registered, 'after');
            spyOn(registered, 'normal');
            
            lib.register(beforeRunName, registered.before);
            lib.register(afterRunName, registered.after);
            lib.register(runName, registered.normal);
            
        });
        
        
        it('1. Should accept registered "before:[name]" middleware and run ' +
           'all handlers that matches "before:[name]".',
           () => {
                expect(() => lib.run(beforeRunName, [sampleParam])).
                    not.toThrow();
                    
                expect(registered.before).
                    toHaveBeenCalledWith(sampleParam);
                    
                expect(registered.after).
                    not.toHaveBeenCalled();
                    
                expect(registered.normal).
                    not.toHaveBeenCalled();
           });
        
        it('2. Should accept registered "after:[name]" middleware and run ' +
           'all handlers that matches "after:[name]" and "[name]".',
           () => {
                expect(() => lib.run(afterRunName, [sampleParam])).
                    not.toThrow();
                    
                expect(registered.before).
                    not.toHaveBeenCalled();
                    
                expect(registered.after).
                    toHaveBeenCalledWith(sampleParam);
                    
                expect(registered.normal).
                    toHaveBeenCalledWith(sampleParam);
           });
        
        it('3. Should accept registered "[name]" middleware and run ' +
           'all handlers that matches "after:[name]" and "[name]".',
           () => {
                expect(() => lib.run(runName, [sampleParam])).
                    not.toThrow();
                    
                expect(registered.before).
                    not.toHaveBeenCalled();
                    
                expect(registered.after).
                    toHaveBeenCalledWith(sampleParam);
                    
                expect(registered.normal).
                    toHaveBeenCalledWith(sampleParam);
                    
           });
    });