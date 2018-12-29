"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Утилиты для работы с типами.
 */
var langUtils = {
    /**
     * Проверяет, является ли аргумент «обычным» объектом
     * (не undefiend, не null, не DOM-элемент)
     */
    isPlainObject: function (obj) {
        if (obj === undefined ||
            typeof obj !== 'object' ||
            obj === null ||
            obj.nodeType ||
            obj === obj.window) {
            return false;
        }
        if (obj.constructor &&
            !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
            return false;
        }
        return true;
    }
};
exports.langUtils = langUtils;
//# sourceMappingURL=lang.utils.js.map