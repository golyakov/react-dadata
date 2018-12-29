import { IAddressComponent } from './../../interfaces/address-component';
import { ConstraintLocation } from './constraint-location';
/**
 * @param {Object} data
 * @param {Object|Array} data.locations
 * @param {string} [data.label]
 * @param {boolean} [data.deletable]
 * @param {Suggestions} [instance]
 * @constructor
 */
export declare class Constraint {
    id: string;
    locations: ConstraintLocation[];
    constructor(data: any, dataComponents: IAddressComponent[]);
    isValid(): boolean;
    getFields(): {
        [key: string]: any;
    }[];
}
