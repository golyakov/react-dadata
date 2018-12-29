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
var base_dadata_suggestion_1 = require("./../base-dadata.suggestion");
var NameDadataSuggestion = /** @class */ (function (_super) {
    __extends(NameDadataSuggestion, _super);
    function NameDadataSuggestion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NameDadataSuggestion.prototype._serviseUrl = function () {
        var serviceUrl = this.props.serviceUrl;
        return serviceUrl + "/fio";
    };
    NameDadataSuggestion.prototype._createQuery = function () {
        var params = this.props.params;
        var result = _super.prototype._createQuery.call(this);
        if (params && params.parts) {
            result.parts = params.parts;
        }
        if (params && params.gender) {
            result.gender = params.gender;
        }
        return result;
    };
    NameDadataSuggestion.defaultProps = __assign({}, base_dadata_suggestion_1.BaseDadataSuggestion.defaultProps, { suggestionType: 'NAME' });
    return NameDadataSuggestion;
}(base_dadata_suggestion_1.BaseDadataSuggestion));
exports.NameDadataSuggestion = NameDadataSuggestion;
//# sourceMappingURL=name-dadata.suggestion.js.map