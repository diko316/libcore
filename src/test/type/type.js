'use strict';


describe('Checks if Mixed [subject] is an instance of [type] ' +
         ' using type(subject:Mixed, type:String) method.',
        () => {
            var lib = global.libcore;
            
            it('1. Should accept Mixed [subject] and returns true if ' +
               '[subject] is a "string" [type].',
               () => {
                    expect(lib.type("test", "string")).toBe(true);
                    expect(lib.type("", "string")).toBe(true);
                    expect(lib.type(new String("test"), "string")).toBe(true);
               });
            
            it('2. Should accept Mixed [subject] and returns false if ' +
               '[subject] is not a "string" [type].',
               () => {
                    expect(lib.type(/test/, "string")).toBe(false);
                    expect(lib.type(new Date(), "string")).toBe(false);
                    expect(lib.type({}, "string")).toBe(false);
                    expect(lib.type([], "string")).toBe(false);
               });
            
            it('3. Should accept Mixed [subject] and returns true if ' +
               '[subject] is a "number" [type] and Finite.',
               () => {
                    expect(lib.type(0xff, "number")).toBe(true);
                    expect(lib.type(99, "number")).toBe(true);
               });
            
            it('4. Should accept Mixed [subject] and returns false if ' +
               '[subject] is not a "number" [type] or not Finite.',
               () => {
                    expect(lib.type(NaN, "number")).toBe(false);
                    expect(lib.type(/test/, "number")).toBe(false);
                    expect(lib.type(new Date(), "number")).toBe(false);
                    expect(lib.type({}, "number")).toBe(false);
                    expect(lib.type([], "number")).toBe(false);
               });
            
            it('5. Should accept Mixed [subject] and returns true if ' +
               '[subject] is "boolean" [type].',
               () => {
                    expect(lib.type(true, "boolean")).toBe(true);
                    expect(lib.type(false, "boolean")).toBe(true);
               });
            
            it('6. Should accept Mixed [subject] and returns false if ' +
               '[subject] is not "boolean" [type].',
               () => {
                    expect(lib.type(NaN, "boolean")).toBe(false);
                    expect(lib.type(/test/, "boolean")).toBe(false);
                    expect(lib.type(new Date(), "boolean")).toBe(false);
                    expect(lib.type({}, "boolean")).toBe(false);
                    expect(lib.type([], "boolean")).toBe(false);
               });
            
            it('7. Should accept Mixed [subject] and returns true if ' +
               '[subject] is "object" [type] or Native Javascript Object.',
               () => {
                    expect(lib.type({}, "object")).toBe(true);
               });
            
            it('8. Should accept Mixed [subject] and returns false if ' +
               '[subject] is not "object" [type] or ' +
               'not a Native Javascript Object.',
               () => {
                    expect(lib.type(NaN, "object")).toBe(false);
                    expect(lib.type(/test/, "object")).toBe(false);
                    expect(lib.type(new Date(), "object")).toBe(false);
                    expect(lib.type([], "object")).toBe(false);
               });
            
            it('9. Should accept Mixed [subject] and returns true if ' +
               '[subject] is "array" [type].',
               () => {
                    expect(lib.type([], "array")).toBe(true);
                    expect(lib.type(['item1'], "array")).toBe(true);
               });
            
            it('10. Should accept Mixed [subject] and returns false if ' +
               '[subject] is not "array" [type].',
               () => {
                    expect(lib.type(NaN, "array")).toBe(false);
                    expect(lib.type(/test/, "array")).toBe(false);
                    expect(lib.type(new Date(), "array")).toBe(false);
                    expect(lib.type({}, "array")).toBe(false);
               });
            
            it('11. Should accept Mixed [subject] and returns true if ' +
               '[subject] is "regex" [type] or instance of RegExp.',
               () => {
                    expect(lib.type(/test/, "regex")).toBe(true);
                    expect(lib.type(new RegExp('abc'), "regex")).toBe(true);
               });
            
            it('12. Should accept Mixed [subject] and returns false if ' +
               '[subject] is not "regex" [type] or instance of RegExp.',
               () => {
                    expect(lib.type(NaN, "regex")).toBe(false);
                    expect(lib.type(1, "regex")).toBe(false);
                    expect(lib.type(new Date(), "regex")).toBe(false);
                    expect(lib.type({}, "regex")).toBe(false);
               });
            
            it('13. Should accept Mixed [subject] and returns true if ' +
               '[subject] is "date" [type].',
               () => {
                    expect(lib.type(new Date(), "date")).toBe(true);
               });
            
            it('14. Should accept Mixed [subject] and returns false if ' +
               '[subject] is not "date" [type].',
               () => {
                    expect(lib.type(NaN, "date")).toBe(false);
                    expect(lib.type(/test/, "date")).toBe(false);
                    expect(lib.type([], "date")).toBe(false);
                    expect(lib.type({}, "date")).toBe(false);
               });
            
            
            it('15. Should accept Mixed [subject] and returns true if ' +
               '[subject] is "function" or "method" [type].',
               () => {
                    expect(lib.type(function () {}, "method")).toBe(true);
                    expect(lib.type(function () {}, "function")).toBe(true);
               });
            
            it('16. Should accept Mixed [subject] and returns false if ' +
               '[subject] is not "function" or "method" [type].',
               () => {
                    expect(lib.type(new Date(), "method")).toBe(false);
                    expect(lib.type(NaN, "method")).toBe(false);
                    expect(lib.type(/test/, "method")).toBe(false);
                    expect(lib.type([], "method")).toBe(false);
                    expect(lib.type({}, "method")).toBe(false);
                    expect(lib.type(new Date(), "function")).toBe(false);
                    expect(lib.type(NaN, "function")).toBe(false);
                    expect(lib.type(/test/, "function")).toBe(false);
                    expect(lib.type([], "function")).toBe(false);
                    expect(lib.type({}, "function")).toBe(false);
               });
            
            it('17. Should accept Mixed [subject] and returns true if ' +
               '[subject] is "native" or "nativeObject" [type].',
               () => {
                    expect(lib.type({}, "native")).toBe(true);
                    expect(lib.type({}, "nativeObject")).toBe(true);
               });
            
            it('18. Should accept Mixed [subject] and returns false if ' +
               '[subject] is not "native" or "nativeObject" [type].',
               () => {
                    var sample;
                    function Empty() {}
                    Empty.prototype = { constructor: Empty };
                    
                    sample = new Empty();
                    
                    expect(lib.type(sample, "native")).toBe(false);
                    expect(lib.type(new Date(), "native")).toBe(false);
                    expect(lib.type(NaN, "native")).toBe(false);
                    expect(lib.type(/test/, "native")).toBe(false);
                    expect(lib.type(function () {}, "native")).toBe(false);
                    expect(lib.type([], "native")).toBe(false);
                    expect(lib.type(sample, "nativeObject")).toBe(false);
                    expect(lib.type(new Date(), "nativeObject")).toBe(false);
                    expect(lib.type(NaN, "nativeObject")).toBe(false);
                    expect(lib.type(/test/, "nativeObject")).toBe(false);
                    expect(lib.type(function () {}, "nativeObject")).
                                        toBe(false);
                    expect(lib.type([], "nativeObject")).toBe(false);
                    
               });
            
            it('19. Should accept Mixed [subject] and returns true if ' +
               '[subject] is "scalar" [type] which is a: String,' +
               ' Finite Number, or Boolean.',
               () => {
                    expect(lib.type("", "scalar")).toBe(true);
                    expect(lib.type("test", "scalar")).toBe(true);
                    expect(lib.type(0xff, "scalar")).toBe(true);
                    expect(lib.type(99, "scalar")).toBe(true);
                    expect(lib.type(true, "scalar")).toBe(true);
                    expect(lib.type(false, "scalar")).toBe(true);
               });
            
            it('20. Should accept Mixed [subject] and returns false if ' +
               '[subject] is not "scalar" [type] which is not a: String,' +
               ' Finite Number, or Boolean.',
               () => {
                    var sample;
                    function Empty() {}
                    Empty.prototype = { constructor: Empty };
                    
                    sample = new Empty();
                    
                    expect(lib.type(sample, "scalar")).toBe(false);
                    expect(lib.type(new Date(), "scalar")).toBe(false);
                    expect(lib.type(NaN, "scalar")).toBe(false);
                    expect(lib.type(/test/, "scalar")).toBe(false);
                    expect(lib.type(function () {}, "scalar")).toBe(false);
                    expect(lib.type([], "scalar")).toBe(false);
               });
            
            it('21. Should accept Mixed [subject] and returns true if ' +
               '[subject] is "null" [type].',
               () => {
                    expect(lib.type(null, "null")).toBe(true);
               });
            
            it('22. Should accept Mixed [subject] and returns false if ' +
               '[subject] is not "null" [type].',
               () => {
                    var sample;
                    function Empty() {}
                    Empty.prototype = { constructor: Empty };
                    
                    sample = new Empty();
                    
                    expect(lib.type(sample, "null")).toBe(false);
                    expect(lib.type(new Date(), "null")).toBe(false);
                    expect(lib.type(/test/, "null")).toBe(false);
                    expect(lib.type(function () {}, "null")).toBe(false);
                    expect(lib.type([], "null")).toBe(false);
                    expect(lib.type(undefined, "null")).toBe(false);
               });
            
            it('23. Should accept Mixed [subject] and returns true if ' +
               '[subject] is "undefined" [type].',
               () => {
                    expect(lib.type(undefined, "undefined")).toBe(true);
                    expect(lib.type(void(0), "undefined")).toBe(true);
               });
            
            it('24. Should accept Mixed [subject] and returns false if ' +
               '[subject] is not "undefined" [type].',
               () => {
                    var sample;
                    function Empty() {}
                    Empty.prototype = { constructor: Empty };
                    
                    sample = new Empty();
                    
                    expect(lib.type(sample, "undefined")).toBe(false);
                    expect(lib.type(new Date(), "undefined")).toBe(false);
                    expect(lib.type(NaN, "undefined")).toBe(false);
                    expect(lib.type(/test/, "undefined")).toBe(false);
                    expect(lib.type(function () {}, "undefined")).toBe(false);
                    expect(lib.type([], "undefined")).toBe(false);
                    expect(lib.type(null, "undefined")).toBe(false);
               });
            
        });