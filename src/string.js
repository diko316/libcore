'use strict';

function base64Encode(str) {
    var c, l, code;
    
    // decode to ascii
    str = utf8Decode(str);
    
    for (c = -1, l = str.length; l--;) {
        code = str.charCodeAt(++c);
        console.log(str.charAt(c), ' = ', code);
    }
    
    
}

function base64Decode(str) {
    
}


//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/geral/utf-8 [v1.0]
//UTF8 = {
//	encode: function(s){
//		for(var c, i = -1, l = (s = s.split("")).length, o = String.fromCharCode; ++i < l;
//			s[i] = (c = s[i].charCodeAt(0)) >= 127 ? o(0xc0 | (c >>> 6)) + o(0x80 | (c & 0x3f)) : s[i]
//		);
//		return s.join("");
//	},
//	decode: function(s){
//		for(var a, b, i = -1, l = (s = s.split("")).length, o = String.fromCharCode, c = "charCodeAt"; ++i < l;
//			((a = s[i][c](0)) & 0x80) &&
//			(s[i] = (a & 0xfc) == 0xc0 && ((b = s[i + 1][c](0)) & 0xc0) == 0x80 ?
//			o(((a & 0x03) << 6) + (b & 0x3f)) : o(128), s[++i] = "")
//		);
//		return s.join("");
//	}
//};
function utf8Encode(str){
    var c = -1,
        l = str.length,
        first = 0xc0,
        second = 0x80,
        pad = 0x3f,
        fromCharCode = String.fromCharCode,
        glue = "";
    var code;
    
    str = str.split(glue);
    
    for (c = -1; l--;) {
        code = str[++c].charCodeAt(0);
        if (code > 128) {
            str[c] = fromCharCode(first | (code >>> 6)) +
                    fromCharCode(second | (code & pad));
        }
    }
    return str.join(glue);
}

function utf8Decode(s){
    for(var a, b, i = -1, l = (s = s.split("")).length, o = String.fromCharCode, c = "charCodeAt"; ++i < l;
        ((a = s[i][c](0)) & 0x80) &&
        (s[i] = (a & 0xfc) == 0xc0 && ((b = s[i + 1][c](0)) & 0xc0) == 0x80 ?
        o(((a & 0x03) << 6) + (b & 0x3f)) : o(128), s[++i] = "")
    );
    return s.join("");
}


//function utf8Encode(str) {
//    var G = global;
//    return G.unescape(G.encodeURIComponent(str));
//}
//
//function utf8Decode(str) {
//    var G = global;
//    return G.decodeURIComponent(G.escape(str));
//}

global.base64 = base64Encode;

module.exports = {
    "encode64": base64Encode,
    "decode64": base64Decode,
    "encodeU8": utf8Encode,
    "decodeU8": utf8Decode
};