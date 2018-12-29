import intersection = require('lodash.intersection');
import isEmpty = require('lodash.isempty');
import padEnd = require('lodash.padend');
import { DadataApi } from './../../interfaces/dadata-api';
import { IAddressComponent } from './../../interfaces/address-component';
import { collectionUtils } from './../../utils/collection.utils';
import { langUtils } from './../../utils/lang.utils';

const fiasParamNames = [
  'region_fias_id',
  'area_fias_id',
  'city_fias_id',
  'city_district_fias_id',
  'settlement_fias_id',
  'street_fias_id'
];

/**
 * @param {Object} data  fields
 * @param {Suggestions} instance
 * @constructor
 */
export class ConstraintLocation {
  dataComponents: IAddressComponent[];
  specificity: number = -1;
  significantKladr!: string;
  private _fields: { [key: string]: any } = {};

  constructor(data, dataComponents: IAddressComponent[]) {
    this.dataComponents = dataComponents;

    if (langUtils.isPlainObject(data) && dataComponents) {
      this._fields = dataComponents.reduce((acc, component) => {
        const fieldName = component.id;
        if (component.forLocations && data[fieldName]) {
          acc[fieldName] = data[fieldName];
        }
        return acc;
      }, {});
    }

    const fieldNames = Object.keys(this._fields);
    const fiasFieldNames = intersection(fieldNames, fiasParamNames);
    if (fiasFieldNames.length) {
      const fiasFields = fiasFieldNames.reduce((acc, fiasFieldName) => {
        acc[fiasFieldName] = this._fields[fiasFieldName];
        return acc;
      }, {});
      this._fields = fiasFields;
    } else if (this._fields.kladr_id) {
      this._fields = { kladr_id: this._fields.kladr_id };
      this.significantKladr = this._getSignificantKladrId(
        this._fields.kladr_id
      );
      this.specificity = this.getKladrSpecificity(this.significantKladr);
    }
  }

  getFields() {
    return this._fields;
  }

  isValid() {
    return !isEmpty(this._fields);
  }

  containsData(data: DadataApi.AddressSuggestion) {
    let result = true;

    if (this._fields.kladr_id) {
      return (
        !!data.kladr_id && data.kladr_id.indexOf(this.significantKladr) === 0
      );
    } else {
      collectionUtils.each(this._fields, (value, fieldName) => {
        return (result =
          !!data[fieldName] &&
          data[fieldName].toLowerCase() === value.toLowerCase());
      });

      return result;
    }
  }

  /**
   * Возвращает КЛАДР-код, обрезанный до последнего непустого уровня
   * 50 000 040 000 00 → 50 000 040
   * @param kladr_id
   * @returns {string}
   */
  private _getSignificantKladrId(kladr_id): string {
    const significantKladrId = kladr_id.replace(/^(\d{2})(\d*?)(0+)$/g, '$1$2');
    const length = significantKladrId.length;

    let significantLength = -1;
    if (length <= 2) {
      significantLength = 2;
    } else if (length > 2 && length <= 5) {
      significantLength = 5;
    } else if (length > 5 && length <= 8) {
      significantLength = 8;
    } else if (length > 8 && length <= 11) {
      significantLength = 11;
    } else if (length > 11 && length <= 15) {
      significantLength = 15;
    } else if (length > 15) {
      significantLength = 19;
    }

    return padEnd(significantKladrId, significantLength, '0');
  }

  /**
   * Возвращает specificity для КЛАДР
   * Описание ниже, в getFiasSpecificity
   * @param kladr_id
   * @returns {number}
   */
  private getKladrSpecificity(kladr_id): number {
    let specificity = -1;
    const kladrLength = kladr_id.length;

    this.dataComponents.forEach((component, i: number) => {
      if (
        component.kladrFormat &&
        kladrLength === component.kladrFormat.digits
      ) {
        specificity = i;
      }
    });

    return specificity;
  }
}
