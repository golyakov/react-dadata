import compact = require('lodash.compact');
import difference = require('lodash.difference');
import { WORD_DELIMITERS, WORD_PARTS_DELIMITERS } from './../constants';

const WORD_SPLITTER = new RegExp('[' + WORD_DELIMITERS + ']+', 'g');
const WORD_PARTS_SPLITTER = new RegExp('[' + WORD_PARTS_DELIMITERS + ']+', 'g');

/**
 * Утилиты для работы с текстом.
 */
const textUtils = {
  /**
   * Приводит слово к нижнему регистру и заменяет ё → е
   * @param  {string} token
   * @returns string
   */
  formatToken(token: string): string {
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
  tokenize(value: string, unformattableTokens: string[]): string[] {
    let tokens = compact(textUtils.formatToken(value).split(WORD_SPLITTER));
    // Move unformattableTokens to the end.
    // This will help to apply them only if no other tokens match
    const preferredTokens = difference(tokens, unformattableTokens);
    const otherTokens = difference(tokens, preferredTokens);
    tokens = textUtils.withSubTokens(preferredTokens.concat(otherTokens));
    return tokens;
  },

  /**
   * Разбивает составные слова на части
   * и дописывает их к исходному массиву.
   * @param {Array} tokens - слова
   * @return {Array} Массив атомарных слов
   */
  withSubTokens(tokens: string[]): string[] {
    let result: string[] = [];
    tokens.forEach(token => {
      const subtokens = token.split(WORD_PARTS_SPLITTER);
      result.push(token);
      if (subtokens.length > 1) {
        result = result.concat(compact(subtokens));
      }
    });
    return result;
  }
};

export { textUtils };
