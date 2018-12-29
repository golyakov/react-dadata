import uniqueId = require('lodash.uniqueid');
import { IAddressComponent } from './../../interfaces/address-component';
import { collectionUtils } from './../../utils/collection.utils';
import { ConstraintLocation } from './constraint-location';

/**
 * @param {Object} data
 * @param {Object|Array} data.locations
 * @param {string} [data.label]
 * @param {boolean} [data.deletable]
 * @param {Suggestions} [instance]
 * @constructor
 */
export class Constraint {
  id: string;
  locations: ConstraintLocation[];

  constructor(data, dataComponents: IAddressComponent[]) {
    this.id = uniqueId('c');

    const locationsArray = collectionUtils.makeArray(
      data && (data.locations || data.restrictions)
    );
    this.locations = locationsArray.map(
      data => new ConstraintLocation(data, dataComponents)
    );

    this.locations = this.locations.filter(location => location.isValid());
  }

  isValid() {
    return this.locations.length > 0;
  }

  getFields() {
    return this.locations.map(location => location.getFields());
  }
}
