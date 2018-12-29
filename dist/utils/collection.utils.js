"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Утилиты для работы с коллекциями.
 */
var collectionUtils = {
    /**
     * Итерирует по элементам массива или полям объекта.
     * Ведёт себя как $.each() - прерывает выполнение, если функция-обработчик возвращает false.
     * @param {Object|Array} obj - массив или объект
     * @param {eachCallback} callback - функция-обработчик
     */
    each: function (obj, callback) {
        if (Array.isArray(obj)) {
            obj.some(function (el, idx) {
                return callback(el, idx) === false;
            });
            return;
        }
        Object.keys(obj).some(function (key) {
            var value = obj[key];
            return callback(value, key) === false;
        });
    },
    /**
     * Оборачивает переданный объект в массив.
     * Если передан массив, возвращает его копию.
     */
    makeArray: function (arrayLike) {
        if (Array.isArray(arrayLike)) {
            return Array.prototype.slice.call(arrayLike);
        }
        else {
            return [arrayLike];
        }
    }
};
exports.collectionUtils = collectionUtils;
//# sourceMappingURL=collection.utils.js.map