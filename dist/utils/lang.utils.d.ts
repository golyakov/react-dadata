/**
 * Утилиты для работы с типами.
 */
declare const langUtils: {
    /**
     * Проверяет, является ли аргумент «обычным» объектом
     * (не undefiend, не null, не DOM-элемент)
     */
    isPlainObject(obj: any): boolean;
};
export { langUtils };
