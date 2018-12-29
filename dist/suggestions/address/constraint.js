"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uniqueId = require("lodash.uniqueid");
var collection_utils_1 = require("./../../utils/collection.utils");
var constraint_location_1 = require("./constraint-location");
/**
 * @param {Object} data
 * @param {Object|Array} data.locations
 * @param {string} [data.label]
 * @param {boolean} [data.deletable]
 * @param {Suggestions} [instance]
 * @constructor
 */
var Constraint = /** @class */ (function () {
    function Constraint(data, dataComponents) {
        this.id = uniqueId('c');
        var locationsArray = collection_utils_1.collectionUtils.makeArray(data && (data.locations || data.restrictions));
        this.locations = locationsArray.map(function (data) { return new constraint_location_1.ConstraintLocation(data, dataComponents); });
        this.locations = this.locations.filter(function (location) { return location.isValid(); });
    }
    Constraint.prototype.isValid = function () {
        return this.locations.length > 0;
    };
    Constraint.prototype.getFields = function () {
        return this.locations.map(function (location) { return location.getFields(); });
    };
    return Constraint;
}());
exports.Constraint = Constraint;
//# sourceMappingURL=constraint.js.map