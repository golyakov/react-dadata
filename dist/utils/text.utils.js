"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var compact = require("lodash.compact");
var difference = require("lodash.difference");
var constants_1 = require("./../constants");
var WORD_SPLITTER = new RegExp('[' + constants_1.WORD_DELIMITERS + ']+', 'g');
var WORD_PARTS_SPLITTER = new RegExp('[' + constants_1.WORD_PARTS_DELIMITERS + ']+', 'g');
/**
 * Утилиты для работы с текстом.
 */
var textUtils = {
    /**
     * Приводит слово к нижнему регистру и заменяет ё → е
     * @param  {string} token
     * @returns string
     */
    formatToken: function (token) {
        return token && token.toLowerCase().replace(/[ёЁ]/g, 'е');
    },
    /**
     * Возвращает список слов из строки.
     * При этом первыми по порядку идут «предпочтительные» слова
     * (те, что не входят в список «нежелательных»).
     * Составные слова тоже разбивает на части.
     * @param {string} value - строка
     * @param {Array} unformattableTokens - «нежелательные» слова
     * @return {Array} Массив атомарных слов
     */
    tokenize: function (value, unformattableTokens) {
        var tokens = compact(textUtils.formatToken(value).split(WORD_SPLITTER));
        // Move unformattableTokens to the end.
        // This will help to apply them only if no other tokens match
        var preferredTokens = difference(tokens, unformattableTokens);
        var otherTokens = difference(tokens, preferredTokens);
        tokens = textUtils.withSubTokens(preferredTokens.concat(otherTokens));
        return tokens;
    },
    /**
     * Разбивает составные слова на части
     * и дописывает их к исходному массиву.
     * @param {Array} tokens - слова
     * @return {Array} Массив атомарных слов
     */
    withSubTokens: function (tokens) {
        var result = [];
        tokens.forEach(function (token) {
            var subtokens = token.split(WORD_PARTS_SPLITTER);
            result.push(token);
            if (subtokens.length > 1) {
                result = result.concat(compact(subtokens));
            }
        });
        return result;
    }
};
exports.textUtils = textUtils;
//# sourceMappingURL=text.utils.js.map