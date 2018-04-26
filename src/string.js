'use strict';


import {
    string,
    number
} from "./type.js";

var HALF_BYTE = 0x80,
    SIX_BITS = 0x3f,
    ONE_BYTE = 0xff,
    fromCharCode = String.fromCharCode,
    BASE64_MAP =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    NOT_BASE64_RE = /[^a-zA-Z0-9\+\/\=]/g,
    BASE64_EXCESS_REMOVE_RE = /[^a-zA-Z0-9\+\/]/,
    CAMEL_RE = /[^a-z]+[a-z]/ig,
    UNCAMEL_RE = /\-*[A-Z]/g,
    TRIM_RE = /^\s+|\s+$/g,
    INVALID_SUBJECT = 'Invalid [subject] parameter.';

function applyCamelize(all) {
    return all.charAt(all.length - 1).toUpperCase();
}

function applyUncamelize(all) {
    return '-' + all.charAt(all.length -1).toLowerCase();
}


export function camelize(subject) {
    return subject.replace(CAMEL_RE, applyCamelize);
}
    
export function uncamelize(subject) {
    return subject.replace(UNCAMEL_RE, applyUncamelize);
}
    

export function utf2bin(subject) {
    var half = HALF_BYTE,
        sixBits = SIX_BITS,
        code2char = fromCharCode,
        utf8 = [],
        ul = 0;
    var code, c, l;
    
    if (!string(subject, true)) {
        throw new Error(INVALID_SUBJECT);
    }
    
    for (c = -1, l = subject.length; l--;) {
        code = subject.charCodeAt(++c);
        
        if (code < half) {
            utf8[ul++] = code2char(code);
        }
        else if (code < 0x800) {
            utf8[ul++] = code2char(0xc0 | (code >> 6));
            utf8[ul++] = code2char(half | (code & sixBits));
        }
        else if (code < 0xd800 || code > 0xdfff) {
            utf8[ul++] = code2char(0xe0 | (code >> 12));
            utf8[ul++] = code2char(half | ((code >> 6) & sixBits));
            utf8[ul++] = code2char(half | (code  & sixBits));
        }
        else {
            l--;
            code = 0x10000 + (((code & 0x3ff)<<10)
                        | (subject.charCodeAt(++c) & 0x3ff));
            
            utf8[ul++] = code2char(0xf0 | (code >> 18));
            utf8[ul++] = code2char(half | ((code >> 12) & sixBits));
            utf8[ul++] = code2char(half | ((code >> 6) & sixBits));
            utf8[ul++] = code2char(half | (code >> sixBits));
            
        }
    }
    
    return utf8.join('');
}


// based from https://gist.github.com/weishuaiwang/4221687
export function bin2utf(subject) {
    var code2char = fromCharCode;
    var utf16, ul, c, l, code;
    
    if (!string(subject, true)) {
        throw new Error(INVALID_SUBJECT);
    }
    
    utf16 = [];
    ul = 0;
    for (c = -1, l = subject.length; l--;) {
        code = subject.charCodeAt(++c);
        switch (code >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
            // 0xxxxxxx
            utf16[ul++] = subject.charAt(c);
            break;
        case 12:
        case 13:
            // 110x xxxx 10xx xxxx
            l--;
            utf16[ul++] = code2char(((code & 0x1F) << 6) |
                                    (subject.charCodeAt(++c) & 0x3F));
            break;
        case 14:
            // 1110 xxxx10xx xxxx10xx xxxx
            utf16[ul++] = code2char(((code & 0x0F) << 12) |
                                    ((subject.charCodeAt(++c) & 0x3F) << 6) |
                                    ((subject.charCodeAt(++c) & 0x3F) << 0));
            l -= 2;
            break;
        }
    }
    
    return utf16.join("");
}

export function encode64(subject) {
    var map = BASE64_MAP,
        buffer = [],
        bl = 0,
        c = -1,
        excess = false,
        pad = map.charAt(64);
    var l, total, code, flag, end, chr;
    
    if (!string(subject, true)) {
        throw new Error(INVALID_SUBJECT);
    }

    // decode to ascii
    subject = utf2bin(subject);
    l = total = subject.length;
    
    for (; l--;) {
        code = subject.charCodeAt(++c);
        flag = c % 3;
        
        switch (flag) {
        case 0:
            chr = map.charAt((code & 0xfc) >> 2);
            excess = (code & 0x03) << 4;
            break;
        case 1:
            chr = map.charAt(excess | (code & 0xf0) >> 4);
            excess = (code & 0x0f) << 2;
            break;
        case 2:
            chr = map.charAt(excess | (code & 0xc0) >> 6);
            excess = code & 0x3f;
        }
        buffer[bl++] = chr;
        
        end = !l;
        if ((end || flag === 2)) {
            buffer[bl++] = map.charAt(excess);
        }
        
        if (!l) {
            l = bl % 4;
            for (l = l && 4 - l; l--;) {
                buffer[bl++] = pad;
            }
            break;
        }
    }
    
    return buffer.join('');
    
}

export function decode64(subject) {
    var map = BASE64_MAP,
        oneByte = ONE_BYTE,
        buffer = [],
        bl = 0,
        c = -1,
        code2str = fromCharCode;
    var l, code, excess, chr, flag;
    
    if (!string(subject, true) || NOT_BASE64_RE.test(subject)) {
        throw new Error(INVALID_SUBJECT);
    }
    
    subject = subject.replace(BASE64_EXCESS_REMOVE_RE, '');
    l = subject.length;
    
    for (; l--;) {
        code = map.indexOf(subject.charAt(++c));
        flag = c % 4;
        
        switch (flag) {
        case 0:
            chr = 0;
            break;
        case 1:
            chr = ((excess << 2) | (code >> 4)) & oneByte;
            break;
        case 2:
            chr = ((excess << 4) | (code >> 2)) & oneByte;
            break;
        case 3:
            chr = ((excess << 6) | code) & oneByte;
        }
        
        excess = code;
        
        if (!l && flag < 3 && chr < 64) {
            break;
        }

        if (flag) {
            buffer[bl++] = code2str(chr);
        }
    }
    
    return bin2utf(buffer.join(""));
}

export function trim(subject) {
    if (!string(subject, true)) {
        throw new Error(INVALID_SUBJECT);
    }

    return subject ? subject.replace(TRIM_RE, "") : subject;
}
