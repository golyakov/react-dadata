/**
 * Утилиты для работы с типами.
 */
const langUtils = {
  /**
   * Проверяет, является ли аргумент «обычным» объектом
   * (не undefiend, не null, не DOM-элемент)
   */
  isPlainObject(obj): boolean {
    if (
      obj === undefined ||
      typeof obj !== 'object' ||
      obj === null ||
      obj.nodeType ||
      obj === obj.window
    ) {
      return false;
    }
    if (
      obj.constructor &&
      !Object.prototype.hasOwnProperty.call(
        obj.constructor.prototype,
        'isPrototypeOf'
      )
    ) {
      return false;
    }
    return true;
  }
};

export { langUtils };
