/**
 * Утилиты для работы с коллекциями.
 */
declare const collectionUtils: {
    /**
     * Итерирует по элементам массива или полям объекта.
     * Ведёт себя как $.each() - прерывает выполнение, если функция-обработчик возвращает false.
     * @param {Object|Array} obj - массив или объект
     * @param {eachCallback} callback - функция-обработчик
     */
    each<T>(obj: {
        [key: string]: T;
    } | T[], callback: (item: T, i: string | number) => boolean | void): void;
    /**
     * Оборачивает переданный объект в массив.
     * Если передан массив, возвращает его копию.
     */
    makeArray<T>(arrayLike: T | T[]): T[];
};
export { collectionUtils };
