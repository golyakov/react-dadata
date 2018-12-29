"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var intersection = require("lodash.intersection");
var isEmpty = require("lodash.isempty");
var padEnd = require("lodash.padend");
var collection_utils_1 = require("./../../utils/collection.utils");
var lang_utils_1 = require("./../../utils/lang.utils");
var fiasParamNames = [
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
var ConstraintLocation = /** @class */ (function () {
    function ConstraintLocation(data, dataComponents) {
        var _this = this;
        this.specificity = -1;
        this._fields = {};
        this.dataComponents = dataComponents;
        if (lang_utils_1.langUtils.isPlainObject(data) && dataComponents) {
            this._fields = dataComponents.reduce(function (acc, component) {
                var fieldName = component.id;
                if (component.forLocations && data[fieldName]) {
                    acc[fieldName] = data[fieldName];
                }
                return acc;
            }, {});
        }
        var fieldNames = Object.keys(this._fields);
        var fiasFieldNames = intersection(fieldNames, fiasParamNames);
        if (fiasFieldNames.length) {
            var fiasFields = fiasFieldNames.reduce(function (acc, fiasFieldName) {
                acc[fiasFieldName] = _this._fields[fiasFieldName];
                return acc;
            }, {});
            this._fields = fiasFields;
        }
        else if (this._fields.kladr_id) {
            this._fields = { kladr_id: this._fields.kladr_id };
            this.significantKladr = this._getSignificantKladrId(this._fields.kladr_id);
            this.specificity = this.getKladrSpecificity(this.significantKladr);
        }
    }
    ConstraintLocation.prototype.getFields = function () {
        return this._fields;
    };
    ConstraintLocation.prototype.isValid = function () {
        return !isEmpty(this._fields);
    };
    ConstraintLocation.prototype.containsData = function (data) {
        var result = true;
        if (this._fields.kladr_id) {
            return (!!data.kladr_id && data.kladr_id.indexOf(this.significantKladr) === 0);
        }
        else {
            collection_utils_1.collectionUtils.each(this._fields, function (value, fieldName) {
                return (result =
                    !!data[fieldName] &&
                        data[fieldName].toLowerCase() === value.toLowerCase());
            });
            return result;
        }
    };
    /**
     * Возвращает КЛАДР-код, обрезанный до последнего непустого уровня
     * 50 000 040 000 00 → 50 000 040
     * @param kladr_id
     * @returns {string}
     */
    ConstraintLocation.prototype._getSignificantKladrId = function (kladr_id) {
        var significantKladrId = kladr_id.replace(/^(\d{2})(\d*?)(0+)$/g, '$1$2');
        var length = significantKladrId.length;
        var significantLength = -1;
        if (length <= 2) {
            significantLength = 2;
        }
        else if (length > 2 && length <= 5) {
            significantLength = 5;
        }
        else if (length > 5 && length <= 8) {
            significantLength = 8;
        }
        else if (length > 8 && length <= 11) {
            significantLength = 11;
        }
        else if (length > 11 && length <= 15) {
            significantLength = 15;
        }
        else if (length > 15) {
            significantLength = 19;
        }
        return padEnd(significantKladrId, significantLength, '0');
    };
    /**
     * Возвращает specificity для КЛАДР
     * Описание ниже, в getFiasSpecificity
     * @param kladr_id
     * @returns {number}
     */
    ConstraintLocation.prototype.getKladrSpecificity = function (kladr_id) {
        var specificity = -1;
        var kladrLength = kladr_id.length;
        this.dataComponents.forEach(function (component, i) {
            if (component.kladrFormat &&
                kladrLength === component.kladrFormat.digits) {
                specificity = i;
            }
        });
        return specificity;
    };
    return ConstraintLocation;
}());
exports.ConstraintLocation = ConstraintLocation;
//# sourceMappingURL=constraint-location.js.map