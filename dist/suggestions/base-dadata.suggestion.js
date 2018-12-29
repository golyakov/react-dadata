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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var isFunction = require("lodash.isfunction");
var memoize = require("lodash.memoize");
var React = require("react");
var Highlighter = require("react-highlight-words");
var constants_1 = require("./../constants");
var BaseDadataSuggestion = /** @class */ (function (_super) {
    __extends(BaseDadataSuggestion, _super);
    function BaseDadataSuggestion(props) {
        var _this = _super.call(this, props) || this;
        _this._getHighlightWords = function () {
            var inputQuery = _this.state.inputQuery;
            var wordsToPass = [
                'г',
                'респ',
                'ул',
                'р-н',
                'село',
                'деревня',
                'поселок',
                'пр-д',
                'пл',
                'к',
                'кв',
                'обл',
                'д'
            ];
            return inputQuery
                .replace(',', '')
                .split(' ')
                .filter(function (word) { return wordsToPass.indexOf(word) < 0; });
        };
        _this.state = {
            value: _this.props.value ? _this.props.value : '',
            inputQuery: _this.props.value ? _this.props.value : '',
            inputFocused: false,
            suggestions: [],
            suggestionIndex: -1,
            suggestionsVisible: true,
            isValid: false
        };
        _this._onInputFocus = _this._onInputFocus.bind(_this);
        _this._onInputBlur = _this._onInputBlur.bind(_this);
        _this._onInputChange = _this._onInputChange.bind(_this);
        _this._onKeyPress = _this._onKeyPress.bind(_this);
        _this._onSuggestionClick = memoize(_this._onSuggestionClick.bind(_this));
        _this._setCursorToEnd = _this._setCursorToEnd.bind(_this);
        return _this;
    }
    BaseDadataSuggestion.prototype.componentDidMount = function () {
        if (this.props.autoload && this.state.value) {
            this._fetchSuggestions();
        }
    };
    BaseDadataSuggestion.prototype.render = function () {
        var _this = this;
        var _a = this.props, _b = _a.className, className = _b === void 0 ? '' : _b, serviceUrl = _a.serviceUrl, token = _a.token, 
        // constraints,
        // bounds,
        count = _a.count, onSelectNothing = _a.onSelectNothing, suggestionType = _a.suggestionType, onChangeValue = _a.onChangeValue, inputProps = __rest(_a, ["className", "serviceUrl", "token", "count", "onSelectNothing", "suggestionType", "onChangeValue"]);
        var html = [
            React.createElement("input", __assign({}, inputProps, { key: "input", className: "react-dadata__input" + (className ? " " + className : ''), type: "text", value: this.state.value, ref: function (input) {
                    _this._textInput = input;
                }, onChange: this._onInputChange, onKeyPress: this._onKeyPress, onKeyDown: this._onKeyPress, onFocus: this._onInputFocus, onBlur: this._onInputBlur }))
        ];
        if (this.state.inputFocused &&
            this.state.suggestionsVisible &&
            this.state.suggestions &&
            this.state.suggestions.length > 0) {
            html.push(React.createElement("div", { key: "suggestion", className: "react-dadata__container" },
                React.createElement("div", { className: "react-dadata__suggestions" },
                    React.createElement("div", { className: "react-dadata__suggestion-note" }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0430\u0440\u0438\u0430\u043D\u0442 \u0438\u043B\u0438 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u0435 \u0432\u0432\u043E\u0434"),
                    this.state.suggestions.map(function (suggestion, index) {
                        var suggestionClass = 'react-dadata__suggestion';
                        if (index == _this.state.suggestionIndex) {
                            suggestionClass += ' react-dadata__suggestion--current';
                        }
                        return (React.createElement("div", { key: index, onMouseDown: _this._onSuggestionClick(index), className: suggestionClass },
                            React.createElement(Highlighter, { highlightClassName: "react-dadata--highlighted", autoEscape: true, searchWords: _this._getHighlightWords(), textToHighlight: _this._formatSuggestion(suggestion) })));
                    }))));
        }
        return html;
    };
    BaseDadataSuggestion.prototype._serviseUrl = function () {
        throw new Error('Not implemented');
    };
    BaseDadataSuggestion.prototype._onInputFocus = function () {
        var _this = this;
        this.setState({ inputFocused: true }, function () {
            if (_this._textInput && _this._textInput.value) {
                if (_this.state.suggestions.length == 0) {
                    _this._fetchSuggestions();
                }
                setTimeout(function () { return _this._setCursorToEnd(_this._textInput); }, 100);
            }
        });
    };
    BaseDadataSuggestion.prototype._onInputBlur = function () {
        var _this = this;
        this.setState({ inputFocused: false }, function () {
            if (_this._textInput &&
                _this._textInput.value &&
                _this.state.suggestions.length === 0) {
                _this._fetchSuggestions();
            }
            else {
                _this._onSelectNothing();
            }
        });
    };
    BaseDadataSuggestion.prototype._onInputChange = function (event) {
        var _this = this;
        var value = event.target.value;
        this.setState({ value: value, inputQuery: value, suggestionsVisible: true }, function () {
            if (_this.props.validate) {
                _this.props.validate(value);
            }
            _this._fetchSuggestions();
        });
    };
    BaseDadataSuggestion.prototype._onKeyPress = function (event) {
        switch (event.which) {
            case constants_1.KEYS.DOWN:
                event.preventDefault();
                if (this.state.suggestionIndex < this.state.suggestions.length) {
                    var newSuggestionIndex = this.state.suggestionIndex + 1;
                    var newInputQuery = this.state.suggestions[newSuggestionIndex]
                        .value;
                    this.setState({
                        suggestionIndex: newSuggestionIndex,
                        value: newInputQuery
                    });
                }
                break;
            case constants_1.KEYS.UP:
                event.preventDefault();
                if (this.state.suggestionIndex >= 0) {
                    var newSuggestionIndex = this.state.suggestionIndex - 1;
                    var newInputQuery = newSuggestionIndex == -1
                        ? this.state.inputQuery
                        : this.state.suggestions[newSuggestionIndex].value;
                    this.setState({
                        suggestionIndex: newSuggestionIndex,
                        value: newInputQuery
                    });
                }
                break;
            case constants_1.KEYS.ENTER:
                event.preventDefault();
                if (this.state.suggestionIndex >= 0) {
                    this._selectSuggestion(this.state.suggestionIndex);
                }
                else {
                    this._onSelectNothing();
                }
                break;
            case constants_1.KEYS.ESC:
                event.preventDefault();
                this.setState({
                    suggestionsVisible: false
                });
                this._onSelectNothing();
                break;
            default:
                break;
        }
    };
    BaseDadataSuggestion.prototype._createQuery = function () {
        var count = this.props.count;
        var query = this.state.value;
        return { query: query, count: count };
    };
    BaseDadataSuggestion.prototype._fetchSuggestions = function () {
        var _this = this;
        if (this._xhr) {
            this._xhr.abort();
        }
        this._xhr = new XMLHttpRequest();
        this._xhr.open('POST', this._serviseUrl());
        this._xhr.setRequestHeader('Accept', 'application/json');
        this._xhr.setRequestHeader('Authorization', "Token " + this.props.token);
        this._xhr.setRequestHeader('Content-Type', 'application/json');
        this._xhr.send(JSON.stringify(this._createQuery()));
        this._xhr.onreadystatechange = function () {
            if (_this._xhr.readyState !== 4) {
                return;
            }
            if (_this._xhr.status === 200) {
                var responseJson = JSON.parse(_this._xhr.response);
                if (responseJson && responseJson.suggestions) {
                    _this.setState({
                        suggestions: responseJson.suggestions,
                        suggestionIndex: -1
                    });
                }
            }
        };
    };
    BaseDadataSuggestion.prototype._onSelectNothing = function () {
        var onSelectNothing = this.props.onSelectNothing;
        if (isFunction(onSelectNothing)) {
            onSelectNothing(this._textInput.value);
        }
    };
    BaseDadataSuggestion.prototype._onSuggestionClick = function (index) {
        var _this = this;
        return function (event) {
            event.stopPropagation();
            _this._selectSuggestion(index);
        };
    };
    BaseDadataSuggestion.prototype._getTypeSuggestionValue = function (options) {
        return options.suggestion.value;
    };
    /**
     * Gets string to set as input value
     *
     * @param suggestion
     * @param {Object} [selectionOptions]
     * @param {boolean} selectionOptions.hasBeenEnriched
     * @param {boolean} selectionOptions.hasSameValues
     * @return {string}
     */
    BaseDadataSuggestion.prototype._getSuggestionValue = function (suggestion, selectionOptions) {
        var formatSelected = this.props.formatSelected;
        var hasSameValues = selectionOptions.hasSameValues, hasBeenEnriched = selectionOptions.hasBeenEnriched;
        var formattedValue = null;
        var typeFormattedValue = null;
        if (isFunction(formatSelected)) {
            formattedValue = formatSelected.call(this, suggestion);
        }
        if (typeof formattedValue !== 'string') {
            formattedValue = suggestion.value;
            if (this._getTypeSuggestionValue) {
                typeFormattedValue = this._getTypeSuggestionValue({
                    suggestion: suggestion,
                    hasSameValues: hasSameValues,
                    hasBeenEnriched: hasBeenEnriched
                });
                if (typeFormattedValue !== null) {
                    formattedValue = typeFormattedValue;
                }
            }
        }
        return formattedValue;
    };
    BaseDadataSuggestion.prototype._selectSuggestion = function (index) {
        var _this = this;
        var _a = this.props, onChangeValue = _a.onChangeValue, onChange = _a.onChange;
        var suggestions = this.state.suggestions;
        var suggestion = suggestions[index];
        if (suggestions.length >= index - 1) {
            var query = this._getSuggestionValue(suggestion, {
                hasSameValues: this._hasSameValues(suggestion),
                hasBeenEnriched: !!suggestion
            });
            this.setState({
                value: query,
                suggestionsVisible: false,
                inputQuery: query
            }, function () {
                _this._fetchSuggestions();
                setTimeout(function () { return _this._setCursorToEnd(_this._textInput); }, 100);
            });
            if (isFunction(onChange)) {
                onChange(query);
            }
            if (isFunction(onChangeValue)) {
                onChangeValue(suggestion);
            }
        }
        else {
            this._onSelectNothing();
        }
    };
    BaseDadataSuggestion.prototype._setCursorToEnd = function (element) {
        var valueLength = element.value.length;
        if (element.selectionStart || element.selectionStart === 0) {
            // Firefox/Chrome
            element.selectionStart = valueLength;
            element.selectionEnd = valueLength;
            element.focus();
        }
    };
    BaseDadataSuggestion.prototype._formatSuggestion = function (suggestion) {
        var formatResult = this.props.formatResult;
        if (isFunction(formatResult)) {
            return formatResult(suggestion.value, this.state.value, suggestion, {});
        }
        return this._formatResult(suggestion.value, this.state.value, suggestion, {});
    };
    BaseDadataSuggestion.prototype._formatResult = function (value, currentValue, suggestion, options) {
        return suggestion.value;
    };
    // other
    BaseDadataSuggestion.prototype._hasSameValues = function (suggestion) {
        return this.state.suggestions.some(function (anotherSuggestion) {
            return anotherSuggestion.value === suggestion.value &&
                anotherSuggestion !== suggestion;
        });
    };
    BaseDadataSuggestion.defaultProps = {
        autoComplete: 'off',
        serviceUrl: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest',
        count: 10,
        onSelectNothing: function (query) { }
    };
    return BaseDadataSuggestion;
}(React.PureComponent));
exports.BaseDadataSuggestion = BaseDadataSuggestion;
//# sourceMappingURL=base-dadata.suggestion.js.map