import { DadataApi } from './../../interfaces/dadata-api';
import { IAddressComponent } from './../../interfaces/address-component';
/**
 * @param {Object} data  fields
 * @param {Suggestions} instance
 * @constructor
 */
export declare class ConstraintLocation {
    dataComponents: IAddressComponent[];
    specificity: number;
    significantKladr: string;
    private _fields;
    constructor(data: any, dataComponents: IAddressComponent[]);
    getFields(): {
        [key: string]: any;
    };
    isValid(): boolean;
    containsData(data: DadataApi.AddressSuggestion): boolean;
    /**
     * Возвращает КЛАДР-код, обрезанный до последнего непустого уровня
     * 50 000 040 000 00 → 50 000 040
     * @param kladr_id
     * @returns {string}
     */
    private _getSignificantKladrId;
    /**
     * Возвращает specificity для КЛАДР
     * Описание ниже, в getFiasSpecificity
     * @param kladr_id
     * @returns {number}
     */
    private getKladrSpecificity;
}
