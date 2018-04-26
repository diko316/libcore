'use strict';

import { type } from '../../type';

describe(`Inspects if Mixed [subject] is an instance of simplified [type] 
         signature using type(subject:Mixed, type:String) method.`,
        () => {
            it(`1. Should accept Mixed [subject] and returns true if 
               [subject] is a "string" [type].`,
               () => {
                    var S = String;
                    expect(type("test", "string")).toBe(true);
                    expect(type("", "string")).toBe(true);
                    expect(type(new S("test"), "string")).toBe(true);
               });
            
            it(`2. Should accept Mixed [subject] and returns false if 
               [subject] is not a "string" [type].`,
               () => {
                    expect(type(/test/, "string")).toBe(false);
                    expect(type(new Date(), "string")).toBe(false);
                    expect(type({}, "string")).toBe(false);
                    expect(type([], "string")).toBe(false);
               });
            
            it(`'3. Should accept Mixed [subject] and returns true if 
               [subject] is a "number" [type] and Finite.`,
               () => {
                    expect(type(0xff, "number")).toBe(true);
                    expect(type(99, "number")).toBe(true);
               });
            
            it(`4. Should accept Mixed [subject] and returns false if 
               [subject] is not a "number" [type] or not Finite.`,
               () => {
                    expect(type(NaN, "number")).toBe(false);
                    expect(type(/test/, "number")).toBe(false);
                    expect(type(new Date(), "number")).toBe(false);
                    expect(type({}, "number")).toBe(false);
                    expect(type([], "number")).toBe(false);
               });
            
            it(`5. Should accept Mixed [subject] and returns true if 
               [subject] is "boolean" [type].`,
               () => {
                    expect(type(true, "boolean")).toBe(true);
                    expect(type(false, "boolean")).toBe(true);
               });
            
            it(`6. Should accept Mixed [subject] and returns false if 
               [subject] is not "boolean" [type].`,
               () => {
                    expect(type(NaN, "boolean")).toBe(false);
                    expect(type(/test/, "boolean")).toBe(false);
                    expect(type(new Date(), "boolean")).toBe(false);
                    expect(type({}, "boolean")).toBe(false);
                    expect(type([], "boolean")).toBe(false);
               });
            
            it(`7. Should accept Mixed [subject] and returns true if 
               [subject] is "object" [type] or Native Javascript Object.`,
               () => {
                    expect(type({}, "object")).toBe(true);
               });
            
            it(`8. Should accept Mixed [subject] and returns false if
               [subject] is not "object" [type] or 
               not a Native Javascript Object.`,
               () => {
                    expect(type(NaN, "object")).toBe(false);
                    expect(type(/test/, "object")).toBe(false);
                    expect(type(new Date(), "object")).toBe(false);
                    expect(type([], "object")).toBe(false);
               });
            
            it(`9. Should accept Mixed [subject] and returns true if 
               [subject] is "array" [type].`,
               () => {
                    expect(type([], "array")).toBe(true);
                    expect(type(['item1'], "array")).toBe(true);
               });
            
            it(`10. Should accept Mixed [subject] and returns false if 
               [subject] is not "array" [type].`,
               () => {
                    expect(type(NaN, "array")).toBe(false);
                    expect(type(/test/, "array")).toBe(false);
                    expect(type(new Date(), "array")).toBe(false);
                    expect(type({}, "array")).toBe(false);
               });
            
            it(`11. Should accept Mixed [subject] and returns true if 
               [subject] is "regex" [type] or instance of RegExp.`,
               () => {
                    expect(type(/test/, "regex")).toBe(true);
                    expect(type(new RegExp('abc'), "regex")).toBe(true);
               });
            
            it(`12. Should accept Mixed [subject] and returns false if 
               [subject] is not "regex" [type] or instance of RegExp.`,
               () => {
                    expect(type(NaN, "regex")).toBe(false);
                    expect(type(1, "regex")).toBe(false);
                    expect(type(new Date(), "regex")).toBe(false);
                    expect(type({}, "regex")).toBe(false);
               });
            
            it(`13. Should accept Mixed [subject] and returns true if 
               [subject] is "date" [type].`,
               () => {
                    expect(type(new Date(), "date")).toBe(true);
               });
            
            it(`14. Should accept Mixed [subject] and returns false if 
               [subject] is not "date" [type].`,
               () => {
                    expect(type(NaN, "date")).toBe(false);
                    expect(type(/test/, "date")).toBe(false);
                    expect(type([], "date")).toBe(false);
                    expect(type({}, "date")).toBe(false);
               });
            
            
            it(`15. Should accept Mixed [subject] and returns true if 
               [subject] is "function" or "method" [type].`,
               () => {
                    expect(type(function () {}, "method")).toBe(true);
                    expect(type(function () {}, "function")).toBe(true);
               });
            
            it(`16. Should accept Mixed [subject] and returns false if 
               [subject] is not "function" or "method" [type].`,
               () => {
                    expect(type(new Date(), "method")).toBe(false);
                    expect(type(NaN, "method")).toBe(false);
                    expect(type(/test/, "method")).toBe(false);
                    expect(type([], "method")).toBe(false);
                    expect(type({}, "method")).toBe(false);
                    expect(type(new Date(), "function")).toBe(false);
                    expect(type(NaN, "function")).toBe(false);
                    expect(type(/test/, "function")).toBe(false);
                    expect(type([], "function")).toBe(false);
                    expect(type({}, "function")).toBe(false);
               });
            
            it(`17. Should accept Mixed [subject] and returns true if
               [subject] is "native" or "nativeObject" [type].`,
               () => {
                    expect(type({}, "native")).toBe(true);
                    expect(type({}, "nativeObject")).toBe(true);
               });
            
            it(`18. Should accept Mixed [subject] and returns false if 
               [subject] is not "native" or "nativeObject" [type].`,
               () => {
                    var sample;
                    function Empty() {}
                    Empty.prototype = { constructor: Empty };
                    
                    sample = new Empty();
                    
                    expect(type(sample, "native")).toBe(false);
                    expect(type(new Date(), "native")).toBe(false);
                    expect(type(NaN, "native")).toBe(false);
                    expect(type(/test/, "native")).toBe(false);
                    expect(type(function () {}, "native")).toBe(false);
                    expect(type([], "native")).toBe(false);
                    expect(type(sample, "nativeObject")).toBe(false);
                    expect(type(new Date(), "nativeObject")).toBe(false);
                    expect(type(NaN, "nativeObject")).toBe(false);
                    expect(type(/test/, "nativeObject")).toBe(false);
                    expect(type(function () {}, "nativeObject")).
                                        toBe(false);
                    expect(type([], "nativeObject")).toBe(false);
                    
               });
            
            it(`19. Should accept Mixed [subject] and returns true if 
               [subject] is "scalar" [type] which is a: String,
                Finite Number, or Boolean.`,
               () => {
                    expect(type("", "scalar")).toBe(true);
                    expect(type("test", "scalar")).toBe(true);
                    expect(type(0xff, "scalar")).toBe(true);
                    expect(type(99, "scalar")).toBe(true);
                    expect(type(true, "scalar")).toBe(true);
                    expect(type(false, "scalar")).toBe(true);
               });
            
            it(`20. Should accept Mixed [subject] and returns false if 
               [subject] is not "scalar" [type] which is not a: String,
                Finite Number, or Boolean.`,
               () => {
                    var sample;
                    function Empty() {}
                    Empty.prototype = { constructor: Empty };
                    
                    sample = new Empty();
                    
                    expect(type(sample, "scalar")).toBe(false);
                    expect(type(new Date(), "scalar")).toBe(false);
                    expect(type(NaN, "scalar")).toBe(false);
                    expect(type(/test/, "scalar")).toBe(false);
                    expect(type(function () {}, "scalar")).toBe(false);
                    expect(type([], "scalar")).toBe(false);
               });
            
            it(`21. Should accept Mixed [subject] and returns true if 
               [subject] is "null" [type].`,
               () => {
                    expect(type(null, "null")).toBe(true);
               });
            
            it(`22. Should accept Mixed [subject] and returns false if 
               [subject] is not "null" [type].`,
               () => {
                    var sample;
                    function Empty() {}
                    Empty.prototype = { constructor: Empty };
                    
                    sample = new Empty();
                    
                    expect(type(sample, "null")).toBe(false);
                    expect(type(new Date(), "null")).toBe(false);
                    expect(type(/test/, "null")).toBe(false);
                    expect(type(function () {}, "null")).toBe(false);
                    expect(type([], "null")).toBe(false);
                    expect(type(undefined, "null")).toBe(false);
               });
            
            it(`23. Should accept Mixed [subject] and returns true if 
               [subject] is "undefined" [type].`,
               () => {
                    expect(type(undefined, "undefined")).toBe(true);
                    expect(type(void(0), "undefined")).toBe(true);
               });
            
            it(`24. Should accept Mixed [subject] and returns false if 
               [subject] is not "undefined" [type].`,
               () => {
                    var sample;
                    function Empty() {}
                    Empty.prototype = { constructor: Empty };
                    
                    sample = new Empty();
                    
                    expect(type(sample, "undefined")).toBe(false);
                    expect(type(new Date(), "undefined")).toBe(false);
                    expect(type(NaN, "undefined")).toBe(false);
                    expect(type(/test/, "undefined")).toBe(false);
                    expect(type(function () {}, "undefined")).toBe(false);
                    expect(type([], "undefined")).toBe(false);
                    expect(type(null, "undefined")).toBe(false);
               });
            
        });