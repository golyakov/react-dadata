"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var compact = require("lodash.compact");
var isEmpty = require("lodash.isempty");
var text_utils_1 = require("./../../utils/text.utils");
var collection_utils_1 = require("./../../utils/collection.utils");
var object_utils_1 = require("./../../utils/object.utils");
var base_dadata_suggestion_1 = require("./../base-dadata.suggestion");
var constraint_1 = require("./constraint");
/**
 * Компоненты адреса
 * @type {*[]}
 * id {String} Наименование типа
 * fields {Array of Strings}
 * forBounds {Boolean} может использоваться в ограничениях
 * forLocations {Boolean}
 * kladrFormat {Object}
 * fiasType {String} Наименование соответствующего ФИАС типа
 */
var ADDRESS_COMPONENTS = [
    {
        id: 'kladr_id',
        fields: ['kladr_id'],
        forBounds: false,
        forLocations: true
    },
    {
        id: 'postal_code',
        fields: ['postal_code'],
        forBounds: false,
        forLocations: true
    },
    {
        id: 'country',
        fields: ['country'],
        forBounds: false,
        forLocations: true
    },
    {
        id: 'region_fias_id',
        fields: ['region_fias_id'],
        forBounds: false,
        forLocations: true
    },
    {
        id: 'region_type_full',
        fields: ['region_type_full'],
        forBounds: false,
        forLocations: true,
        kladrFormat: { digits: 2, zeros: 11 },
        fiasType: 'region_fias_id'
    },
    {
        id: 'region',
        fields: ['region', 'region_type', 'region_type_full', 'region_with_type'],
        forBounds: true,
        forLocations: true,
        kladrFormat: { digits: 2, zeros: 11 },
        fiasType: 'region_fias_id'
    },
    {
        id: 'area_fias_id',
        fields: ['area_fias_id'],
        forBounds: false,
        forLocations: true
    },
    {
        id: 'area_type_full',
        fields: ['area_type_full'],
        forBounds: false,
        forLocations: true,
        kladrFormat: { digits: 5, zeros: 8 },
        fiasType: 'area_fias_id'
    },
    {
        id: 'area',
        fields: ['area', 'area_type', 'area_type_full', 'area_with_type'],
        forBounds: true,
        forLocations: true,
        kladrFormat: { digits: 5, zeros: 8 },
        fiasType: 'area_fias_id'
    },
    {
        id: 'city_fias_id',
        fields: ['city_fias_id'],
        forBounds: false,
        forLocations: true
    },
    {
        id: 'city_type_full',
        fields: ['city_type_full'],
        forBounds: false,
        forLocations: true,
        kladrFormat: { digits: 8, zeros: 5 },
        fiasType: 'city_fias_id'
    },
    {
        id: 'city',
        fields: ['city', 'city_type', 'city_type_full', 'city_with_type'],
        forBounds: true,
        forLocations: true,
        kladrFormat: { digits: 8, zeros: 5 },
        fiasType: 'city_fias_id'
    },
    {
        id: 'city_district_fias_id',
        fields: ['city_district_fias_id'],
        forBounds: false,
        forLocations: true
    },
    {
        id: 'city_district_type_full',
        fields: ['city_district_type_full'],
        forBounds: false,
        forLocations: true,
        kladrFormat: { digits: 11, zeros: 2 },
        fiasType: 'city_district_fias_id'
    },
    {
        id: 'city_district',
        fields: [
            'city_district',
            'city_district_type',
            'city_district_type_full',
            'city_district_with_type'
        ],
        forBounds: true,
        forLocations: true,
        kladrFormat: { digits: 11, zeros: 2 },
        fiasType: 'city_district_fias_id'
    },
    {
        id: 'settlement_fias_id',
        fields: ['settlement_fias_id'],
        forBounds: false,
        forLocations: true
    },
    {
        id: 'settlement_type_full',
        fields: ['settlement_type_full'],
        forBounds: false,
        forLocations: true,
        kladrFormat: { digits: 11, zeros: 2 },
        fiasType: 'settlement_fias_id'
    },
    {
        id: 'settlement',
        fields: [
            'settlement',
            'settlement_type',
            'settlement_type_full',
            'settlement_with_type'
        ],
        forBounds: true,
        forLocations: true,
        kladrFormat: { digits: 11, zeros: 2 },
        fiasType: 'settlement_fias_id'
    },
    {
        id: 'street_fias_id',
        fields: ['street_fias_id'],
        forBounds: false,
        forLocations: true
    },
    {
        id: 'street_type_full',
        fields: ['street_type_full'],
        forBounds: false,
        forLocations: true,
        kladrFormat: { digits: 15, zeros: 2 },
        fiasType: 'street_fias_id'
    },
    {
        id: 'street',
        fields: ['street', 'street_type', 'street_type_full', 'street_with_type'],
        forBounds: true,
        forLocations: true,
        kladrFormat: { digits: 15, zeros: 2 },
        fiasType: 'street_fias_id'
    },
    {
        id: 'house',
        fields: ['house', 'house_type', 'house_type_full', 'block', 'block_type'],
        forBounds: true,
        forLocations: false,
        kladrFormat: { digits: 19 }
    }
];
var AddressDadataSuggestion = /** @class */ (function (_super) {
    __extends(AddressDadataSuggestion, _super);
    function AddressDadataSuggestion(props) {
        var _this = _super.call(this, props) || this;
        _this._componentsUnderCityDistrict = [];
        _this._bounds = {
            from: null,
            to: null,
            all: [],
            own: []
        };
        _this._dataComponents = ADDRESS_COMPONENTS;
        _this._dataComponentsById = object_utils_1.objectUtils.indexObjectsById(ADDRESS_COMPONENTS, 'id', 'index');
        _this._constraints = {};
        _this._setBoundsOptions();
        _this.setupConstraints();
        var _underCityDistrict = false;
        ADDRESS_COMPONENTS.forEach(function (component) {
            if (_underCityDistrict)
                _this._componentsUnderCityDistrict.push(component.id);
            if (component.id === 'city_district')
                _underCityDistrict = true;
        });
        return _this;
    }
    AddressDadataSuggestion.prototype._serviseUrl = function () {
        var serviceUrl = this.props.serviceUrl;
        return serviceUrl + "/address";
    };
    AddressDadataSuggestion.prototype._createQuery = function () {
        var _a = this.props, constraints = _a.constraints, bounds = _a.bounds, restrict_value = _a.restrict_value;
        var result = _super.prototype._createQuery.call(this);
        if (constraints) {
            if (Array.isArray(constraints)) {
                result.locations = constraints.map(function (c) { return c.locations; });
            }
            else {
                result.locations = constraints.locations;
            }
        }
        if (bounds) {
            var _b = bounds
                .split('-')
                .map(function (v) { return ({ value: v }); }), from_bound = _b[0], to_bound = _b[1];
            result.from_bound = from_bound;
            if (to_bound) {
                result.to_bound = to_bound;
            }
            else {
                result.to_bound = from_bound;
            }
        }
        if (((typeof restrict_value !== 'undefined' && restrict_value) ||
            typeof restrict_value === 'undefined') &&
            (constraints && Object.keys(constraints).length > 0)) {
            result.restrict_value = true;
        }
        return result;
    };
    // bounds
    AddressDadataSuggestion.prototype._setBoundsOptions = function () {
        var boundsAvailable = [];
        var newBounds = (this.props.bounds || '').trim().split('-');
        var boundFrom = newBounds[0];
        var boundTo = newBounds[newBounds.length - 1];
        var boundsOwn = [];
        var boundIsOwn;
        var boundsAll = [];
        var indexTo;
        if (this._dataComponents) {
            this._dataComponents.forEach(function (component) {
                if (component.forBounds) {
                    boundsAvailable.push(component.id);
                }
            });
        }
        if (boundsAvailable.indexOf(boundFrom) === -1) {
            boundFrom = null;
        }
        indexTo = boundsAvailable.indexOf(boundTo);
        if (indexTo === -1 || indexTo === boundsAvailable.length - 1) {
            boundTo = null;
        }
        if (boundFrom || boundTo) {
            boundIsOwn = !boundFrom;
            collection_utils_1.collectionUtils.each(boundsAvailable, function (bound) {
                if (bound == boundFrom) {
                    boundIsOwn = true;
                }
                boundsAll.push(bound);
                if (boundIsOwn) {
                    boundsOwn.push(bound);
                }
                if (bound == boundTo) {
                    return false;
                }
            });
        }
        this._bounds.from = boundFrom;
        this._bounds.to = boundTo;
        this._bounds.all = boundsAll;
        this._bounds.own = boundsOwn;
    };
    AddressDadataSuggestion.prototype._copyDataComponents = function (data, components) {
        var result = {}, dataComponentsById = this._dataComponentsById;
        if (dataComponentsById) {
            components.forEach(function (component) {
                dataComponentsById[component].fields.forEach(function (field) {
                    if (data[field] != null) {
                        result[field] = data[field];
                    }
                });
            });
        }
        return result;
    };
    // constraints
    AddressDadataSuggestion.prototype.addConstraint = function (constraint) {
        var c = new constraint_1.Constraint(constraint, this._dataComponents);
        if (c.isValid()) {
            this._constraints[c.id] = c;
        }
    };
    AddressDadataSuggestion.prototype.removeConstraint = function (id) {
        delete this._constraints[id];
    };
    AddressDadataSuggestion.prototype.setupConstraints = function () {
        var _this = this;
        var constraints = this.props.constraints;
        if (constraints) {
            Object.keys(this._constraints).forEach(function (id) {
                _this.removeConstraint(id);
            });
            collection_utils_1.collectionUtils.makeArray(constraints).forEach(function (constraint) {
                _this.addConstraint(constraint);
            });
        }
    };
    /**
     * Pick only fields that absent in restriction
     */
    AddressDadataSuggestion.prototype._getUnrestrictedData = function (data) {
        var _this = this;
        var restrictedKeys = [];
        var unrestrictedData = {};
        var maxSpecificity = -1;
        // Find most specific location that could restrict current data
        Object.keys(this._constraints).forEach(function (key) {
            var constraint = _this._constraints[key];
            constraint.locations.forEach(function (location) {
                if (location.containsData(data) &&
                    location.specificity > maxSpecificity) {
                    maxSpecificity = location.specificity;
                }
            });
        });
        if (maxSpecificity >= 0) {
            // Для городов-регионов нужно также отсечь и город
            if (data.region_kladr_id && data.region_kladr_id === data.city_kladr_id) {
                restrictedKeys.push.apply(restrictedKeys, this._dataComponentsById['city'].fields);
            }
            // Collect all fieldnames from all restricted components
            this._dataComponents.slice(0, maxSpecificity + 1).forEach(function (component) {
                restrictedKeys.push.apply(restrictedKeys, component.fields);
            });
            Object.keys(data)
                .filter(function (key) { return restrictedKeys.indexOf(key) === -1; })
                .reduce(function (acc, key) {
                acc[key] = data[key];
                return acc;
            });
        }
        else {
            unrestrictedData = data;
        }
        return unrestrictedData;
    };
    /**
     * Возвращает список слов в запросе,
     * которые не встречаются в подсказке
     */
    AddressDadataSuggestion.prototype._findUnusedTokens = function (tokens, value) {
        return tokens.filter(function (token) { return value.indexOf(token) === -1; });
    };
    /**
     * Возвращает исторические названия для слов запроса,
     * для которых не найдено совпадения в основном значении подсказки
     */
    AddressDadataSuggestion.prototype._getFormattedHistoryValues = function (unusedTokens, historyValues) {
        var formatted = '';
        var values = historyValues.reduce(function (acc, historyValue) {
            var finded = unusedTokens.find(function (token) {
                return historyValue.toLowerCase().indexOf(token) === -1;
            });
            if (finded) {
                acc.push(historyValue);
            }
            return acc;
        }, []);
        if (values.length > 0) {
            formatted = ' (бывш. ' + values.join(', ') + ')';
        }
        return formatted;
    };
    AddressDadataSuggestion.prototype._formatResult = function (value, currentValue, suggestion, options) {
        var district = suggestion.data && suggestion.data.city_district_with_type;
        var unformattableTokens = options && options.unformattableTokens;
        var historyValues = suggestion.data && suggestion.data.history_values;
        var tokens;
        var unusedTokens;
        var formattedHistoryValues;
        // добавляем исторические значения
        if (historyValues && historyValues.length > 0) {
            tokens = text_utils_1.textUtils.tokenize(currentValue, unformattableTokens);
            unusedTokens = this._findUnusedTokens(tokens, value);
            formattedHistoryValues = this._getFormattedHistoryValues(unusedTokens, historyValues);
            if (formattedHistoryValues) {
                value += formattedHistoryValues;
            }
        }
        // value = that.highlightMatches(value, currentValue, suggestion, options);
        // value = that.wrapFormattedValue(value, suggestion);
        if (district &&
            (!this._bounds.own.length || this._bounds.own.indexOf('street') >= 0) &&
            !isEmpty(this._copyDataComponents(suggestion.data, this._componentsUnderCityDistrict))) {
            value += district;
        }
        return value;
    };
    AddressDadataSuggestion.prototype._composeValue = function (data, options) {
        var region = data.region_with_type ||
            compact([data.region, data.region_type]).join(' ') ||
            data.region_type_full;
        var area = data.area_with_type ||
            compact([data.area_type, data.area]).join(' ') ||
            data.area_type_full;
        var city = data.city_with_type ||
            compact([data.city_type, data.city]).join(' ') ||
            data.city_type_full;
        var settelement = data.settlement_with_type ||
            compact([data.settlement_type, data.settlement]).join(' ') ||
            data.settlement_type_full;
        var cityDistrict = data.city_district_with_type ||
            compact([data.city_district_type, data.city_district]).join(' ') ||
            data.city_district_type_full;
        var street = data.street_with_type ||
            compact([data.street_type, data.street]).join(' ') ||
            data.street_type_full;
        var house = compact([
            data.house_type,
            data.house,
            data.block_type,
            data.block
        ]).join(' ');
        var flat = compact([data.flat_type, data.flat]).join(' ');
        var postal_box = data.postal_box && 'а/я ' + data.postal_box;
        var result;
        // если регион совпадает с городом
        // например г Москва, г Москва
        // то не показываем регион
        if (region === city) {
            region = '';
        }
        // иногда не показываем район
        if (!(options && options.saveCityDistrict)) {
            if (options && options.excludeCityDistrict) {
                // если район явно запрещен
                cityDistrict = '';
            }
            else if (cityDistrict && !data.city_district_fias_id) {
                // если район взят из ОКАТО (у него пустой city_district_fias_id)
                cityDistrict = '';
            }
        }
        result = compact([
            region,
            area,
            city,
            cityDistrict,
            settelement,
            street,
            house,
            flat,
            postal_box
        ]).join(', ');
        return result;
    };
    /**
     * Compose suggestion value with respect to constraints
     */
    AddressDadataSuggestion.prototype._getValueWithinConstraints = function (suggestion, options) {
        if (options === void 0) { options = {}; }
        return this._composeValue(this._getUnrestrictedData(suggestion.data), options);
    };
    /**
     * Compose suggestion value with respect to bounds
     */
    AddressDadataSuggestion.prototype._getValueWithinBounds = function (suggestion, options) {
        if (options === void 0) { options = {}; }
        // для корректного составления адреса нужен city_district_fias_id
        var data = this._copyDataComponents(suggestion.data, this._bounds.own.concat(['city_district_fias_id']));
        return this._composeValue(data, options);
    };
    /**
     * @param instance
     * @param options
     * @param options.suggestion
     * @param options.hasSameValues
     * @param options.hasBeenEnreached
     */
    AddressDadataSuggestion.prototype._getTypeSuggestionValue = function (options) {
        var formattedValue = null;
        if (options.hasSameValues) {
            if (this.props.restrict_value) {
                // Can not use unrestricted address,
                // because some components (from constraints) must be omitted
                formattedValue = this._getValueWithinConstraints(options.suggestion);
            }
            else if (this._bounds.own.length) {
                // Can not use unrestricted address,
                // because only components from bounds must be included
                formattedValue = this._getValueWithinBounds(options.suggestion);
            }
            else {
                // Can use full unrestricted address
                formattedValue = options.suggestion.unrestricted_value;
            }
        }
        else if (options.hasBeenEnriched) {
            if (this.props.restrict_value) {
                formattedValue = this._getValueWithinConstraints(options.suggestion, {
                    excludeCityDistrict: true
                });
            }
        }
        return formattedValue;
    };
    AddressDadataSuggestion.defaultProps = __assign({}, base_dadata_suggestion_1.BaseDadataSuggestion.defaultProps, { suggestionType: 'ADDRESS' });
    return AddressDadataSuggestion;
}(base_dadata_suggestion_1.BaseDadataSuggestion));
exports.AddressDadataSuggestion = AddressDadataSuggestion;
//# sourceMappingURL=address-dadata.suggestion.js.map