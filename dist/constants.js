"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KEYS;
(function (KEYS) {
    KEYS[KEYS["ENTER"] = 13] = "ENTER";
    KEYS[KEYS["ESC"] = 27] = "ESC";
    KEYS[KEYS["UP"] = 38] = "UP";
    KEYS[KEYS["DOWN"] = 40] = "DOWN";
})(KEYS || (KEYS = {}));
exports.KEYS = KEYS;
var WORD_DELIMITERS = '\\s"\'~\\*\\.,:\\|\\[\\]\\(\\)\\{\\}<>№';
exports.WORD_DELIMITERS = WORD_DELIMITERS;
var WORD_PARTS_DELIMITERS = '\\-\\+\\\\\\?!@#$%^&';
exports.WORD_PARTS_DELIMITERS = WORD_PARTS_DELIMITERS;
//# sourceMappingURL=constants.js.map