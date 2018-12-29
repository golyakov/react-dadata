"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Утилиты для работы с объектами.
 */
var objectUtils = {
    /**
     * Возвращает карту объектов по их идентификаторам.
     * Принимает на вход массив объектов и идентифицирующее поле.
     * Возвращает карты, ключом в которой является значение идентифицирующего поля,
     *   а значением — исходный объект.
     * Заодно добавляет объектам поле с порядковым номером.
     * @param {Array} objectsArray - массив объектов
     * @param {string} idField - название идентифицирующего поля
     * @param {string} indexField - название поля с порядковым номером
     * @return {Object} карта объектов по их идентификаторам
     */
    indexObjectsById: function (objectsArray, idField, indexField) {
        var result = objectsArray.reduce(function (acc, obj, idx) {
            var key = obj[idField];
            var val = {};
            if (indexField) {
                val[indexField] = idx;
            }
            acc[key] = Object.assign(val, obj);
            return acc;
        }, {});
        return result;
    }
};
exports.objectUtils = objectUtils;
//# sourceMappingURL=object.utils.js.map