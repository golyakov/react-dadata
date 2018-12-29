/**
 * Утилиты для работы с текстом.
 */
declare const textUtils: {
    /**
     * Приводит слово к нижнему регистру и заменяет ё → е
     * @param  {string} token
     * @returns string
     */
    formatToken(token: string): string;
    /**
     * Возвращает список слов из строки.
     * При этом первыми по порядку идут «предпочтительные» слова
     * (те, что не входят в список «нежелательных»).
     * Составные слова тоже разбивает на части.
     * @param {string} value - строка
     * @param {Array} unformattableTokens - «нежелательные» слова
     * @return {Array} Массив атомарных слов
     */
    tokenize(value: string, unformattableTokens: string[]): string[];
    /**
     * Разбивает составные слова на части
     * и дописывает их к исходному массиву.
     * @param {Array} tokens - слова
     * @return {Array} Массив атомарных слов
     */
    withSubTokens(tokens: string[]): string[];
};
export { textUtils };
