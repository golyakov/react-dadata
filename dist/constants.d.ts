declare enum KEYS {
    ENTER = 13,
    ESC = 27,
    UP = 38,
    DOWN = 40
}
declare const WORD_DELIMITERS = "\\s\"'~\\*\\.,:\\|\\[\\]\\(\\)\\{\\}<>\u2116";
declare const WORD_PARTS_DELIMITERS = "\\-\\+\\\\\\?!@#$%^&";
export { KEYS, WORD_DELIMITERS, WORD_PARTS_DELIMITERS };
