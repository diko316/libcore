'use strict';

import { contains } from '../../object';

describe(`Inspects property exists in an object using contains(subject:Mixed,
                                            property:String|Number) method`,
    () =>  {
        var subject;
        
        beforeEach(() =>  {
            subject = {
                id: "myId1",
                name: "diko",
                property: "myProperty",
                0: 'testItem',
                length: 1
            };
        });
        
        it(`1. Should not accept non-Native Javascript Object [subject]`,
            () => {
                expect(() => contains(null, 'toString')).toThrow();
                expect(() => contains(undefined, 'valueOf')).toThrow();
            });
        
        it(`2. Should accept any Native Javascript Object [subject]`,
            () => {
                expect(() => contains(['item1'], '0')).
                                not.toThrow();
                expect(() => contains(subject, 'len')).
                                not.toThrow();
                expect(() => contains(new Date(), 'x')).
                                not.toThrow();
                expect(() => contains(1, 'valueOf')).
                                not.toThrow();
                expect(() => contains(/regex/, 'source')).
                                not.toThrow();
            });
        
        it(`3. Should not accept non-String or 
           non-Number [property] parameter.`,
            () => {
                expect(() => contains(subject, null)).
                                toThrow();
                expect(() => contains(subject, undefined)).
                                toThrow();
                expect(() => contains(subject, new Date())).
                                toThrow();
                expect(() => contains(subject, /test/)).
                                toThrow();
                
            });
        
        it(`4. Should accept String or Number [property] parameter.`,
            () => {
                expect(() => contains(subject, 0)).
                                not.toThrow();
                expect(() => contains(subject, 'valueOf')).
                                not.toThrow();
                expect(() => contains(subject, 'toString')).
                                not.toThrow();
                expect(() => contains(subject, 'id')).
                                not.toThrow();
            });
        
        it(`5. Should return true if [property] in [subject] exists 
           and is an updated property.`,
           () => {
                expect(contains(subject, 'id')).toBe(true);
                expect(contains(subject, 'name')).toBe(true);
                expect(contains(subject, 'property')).toBe(true);
                expect(contains(subject, 0)).toBe(true);
                expect(contains(subject, 'length')).toBe(true);
           });
        
        it(`6. Should return false if [property] in [subject] do not exists
           or not an updated property.`,
           () => {
                expect(contains(subject, 'valueOf')).toBe(false);
                expect(contains(subject, 'toString')).toBe(false);
                expect(contains(subject, 'bogus')).toBe(false);
                expect(contains(subject, 1)).toBe(false);
                expect(contains(subject, 'invalid')).toBe(false);
           });
    });