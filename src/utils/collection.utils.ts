/**
 * Утилиты для работы с коллекциями.
 */
const collectionUtils = {
  /**
   * Итерирует по элементам массива или полям объекта.
   * Ведёт себя как $.each() - прерывает выполнение, если функция-обработчик возвращает false.
   * @param {Object|Array} obj - массив или объект
   * @param {eachCallback} callback - функция-обработчик
   */
  each<T>(
    obj: T[] | { [key: string]: T },
    callback: (item: T, i: number | string) => void | boolean
  ): void {
    if (Array.isArray(obj)) {
      obj.some((el, idx) => {
        return callback(el, idx) === false;
      });
      return;
    }
    Object.keys(obj).some(key => {
      const value = obj[key];
      return callback(value, key) === false;
    });
  },

  /**
   * Оборачивает переданный объект в массив.
   * Если передан массив, возвращает его копию.
   */
  makeArray<T>(arrayLike: T | T[]): T[] {
    if (Array.isArray(arrayLike)) {
      return Array.prototype.slice.call(arrayLike);
    } else {
      return [arrayLike];
    }
  }
};

export { collectionUtils };
