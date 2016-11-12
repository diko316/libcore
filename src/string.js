'use strict';

var HALF_BYTE = 0x80,
    SIX_BITS = 0x3f,
    ONE_BYTE = 0xff,
    fromCharCode = String.fromCharCode,
    BASE64_MAP =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    BASE64_EXCESS_REMOVE_RE = /[^a-zA-Z0-9\+\/]/;

function base64Encode(str) {
    var map = BASE64_MAP,
        buffer = [],
        bl = 0,
        c = -1,
        excess = false,
        pad = map.charAt(64);
    var l, total, code, flag, end, chr;
    
    // decode to ascii
    str = utf16ToUtf8(str);
    l = total = str.length;
    
    for (; l--;) {
        code = str.charCodeAt(++c);
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

function base64Decode(str) {
    var map = BASE64_MAP,
        oneByte = ONE_BYTE,
        buffer = [],
        bl = 0,
        c = -1,
        code2str = fromCharCode;
    var l, code, excess, chr, flag;
    
    str = str.replace(BASE64_EXCESS_REMOVE_RE, '');
    l = str.length;
    
    for (; l--;) {
        code = map.indexOf(str.charAt(++c));
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
    
    return utf8ToUtf16(buffer.join(""));
    
}


function utf16ToUtf8(str) {
    var half = HALF_BYTE,
        sixBits = SIX_BITS,
        code2char = fromCharCode,
        utf8 = [],
        ul = 0,
        c = -1,
        l = str.length;
    var code;
    
    for (; l--;) {
        code = str.charCodeAt(++c);
        
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
                      | (str.charCodeAt(++c) & 0x3ff));
            
            utf8[ul++] = code2char(0xf0 | (code >> 18));
            utf8[ul++] = code2char(half | ((code >> 12) & sixBits));
            utf8[ul++] = code2char(half | ((code >> 6) & sixBits));
            utf8[ul++] = code2char(half | (code >> sixBits));
            
        }
    }
    
    return utf8.join('');
}

function utf8ToUtf16(str) {
    var half = HALF_BYTE,
        sixBits = SIX_BITS,
        code2char = fromCharCode,
        utf16 = [],
        M = Math,
        min = M.min,
        max = M.max,
        ul = 0,
        l = str.length,
        c = -1;
        
    var code, whatsLeft;
    
    for (; l--;) {
        code = str.charCodeAt(++c);
        
        if (code < half) {
            utf16[ul++] = code2char(code);
        }
        else if (code > 0xbf && code < 0xe0) {
            utf16[ul++] = code2char((code & 0x1f) << 6 |
                                    str.charCodeAt(c + 1) & sixBits);
            whatsLeft = max(min(l - 1, 1), 0);
            c += whatsLeft;
            l -= whatsLeft;
            
        }
        else if (code > 0xdf && code < 0xf0) {
            utf16[ul++] = code2char((code & 0x0f) << 12 |
                                    (str.charCodeAt(c + 1) & sixBits) << 6 |
                                    str.charCodeAt(c + 2) & sixBits);
            
            whatsLeft = max(min(l - 2, 2), 0);
            c += whatsLeft;
            l -= whatsLeft;
            
        }
        else {
            
            code = ((code & 0x07) << 18 |
                    (str.charCodeAt(c + 1) & sixBits) << 12 |
                    (str.charCodeAt(c + 2) & sixBits) << 6 |
                    str.charCodeAt(c + 3) & sixBits) - 0x010000;
            
            utf16[ul++] = code2char(code >> 10 | 0xd800,
                                    code & 0x03ff | 0xdc00);
            
            whatsLeft = max(min(l - 3, 3), 0);
            c += whatsLeft;
            l -= whatsLeft;
            
        }
    }
    
    return utf16.join('');
}

function parseJsonPath(path) {
    var dimensions = [],
        dl = 0,
        buffer = [],
        bl = dl,
        TRUE = true,
        FALSE = false,
        started = FALSE,
        merge = FALSE;
        
    var c, l, item, last;

    for (c = -1, l = path.length; l--;) {
        item = path.charAt(++c);
        last = !l;
        
        if (item === '[') {
            if (started) {
                break;
            }
            started = TRUE;
            // has first buffer
            if (bl) {
                merge = TRUE;
            }
        }
        else if (item === ']') {
            // failed! return failed
            if (!started) {
                break;
            }
            started = FALSE;
            merge = TRUE;
        }
        else {
            buffer[bl++] = item;
            if (last) {
                merge = TRUE;
            }
        }
        
        if (merge) {
            dimensions[dl++] = buffer.join("");
            buffer.length = bl = 0;
            merge = FALSE;
        }
        
        // ended but parse failed
        if (last) {
            if (started || dl < 1) {
                break;
            }
            return dimensions;
        }
    }
    
    return null;
}



module.exports = {
    "encode64": base64Encode,
    "decode64": base64Decode,
    "utf2bin": utf16ToUtf8,
    "bin2utf": utf8ToUtf16,
    "jsonPath": parseJsonPath
};