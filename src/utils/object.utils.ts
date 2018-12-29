/**
 * Утилиты для работы с объектами.
 */
const objectUtils = {
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
  indexObjectsById<T>(
    objectsArray: T[],
    idField: string,
    indexField: string
  ): { [key: string]: T } {
    const result = objectsArray.reduce((acc, obj, idx) => {
      const key = obj[idField];
      const val = {};
      if (indexField) {
        val[indexField] = idx;
      }
      acc[key] = Object.assign(val, obj);
      return acc;
    }, {});
    return result;
  }
};

export { objectUtils };
