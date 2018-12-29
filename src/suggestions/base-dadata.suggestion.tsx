import isFunction = require('lodash.isfunction');
import memoize = require('lodash.memoize');
import * as React from 'react';
import Highlighter = require('react-highlight-words');
import { KEYS } from './../constants';
import { DadataApi } from './../interfaces/dadata-api';

export namespace BaseDadataSuggestion {
  export type SuggestionType = 'ADDRESS' | 'NAME';

  export interface Props<T> extends React.InputHTMLAttributes<string> {
    /**
     * "http://ВАШ_СЕРВЕР:ПОРТ/suggestions/api/4_1/rs",
     */
    serviceUrl?: string;
    /**
     * ВАШ API-КЛЮЧ
     */
    token: string;
    /**
     * ADDRESS/NAME
     */
    suggestionType?: SuggestionType;
    /**
     * Неописанный параметр
     */
    params?: any;
    /**
     * Количество возвращаемых подсказок (по умолчанию — 5)
     */
    count?: number;

    // dadata
    autoload?: boolean;
    onChangeValue?: (suggestion: DadataApi.Response<T>) => void;
    // autocomplete?: string;
    validate?: (value: string) => void;

    /**
     * Вызывается перед показом выпадающего списка. this привязано к input-элементу
     * @param container
     */
    beforeRender?: (container) => void;
    /**
     * Форматирование подсказки перед ее отображением в списке.
     * @param value
     * @param currentValue
     * @param suggestion
     * @param options
     */
    formatResult?: (value, currentValue, suggestion, options) => string;
    /**
     * Возвращает строку для вставки в поле ввода при выборе подсказки
     * @param suggestion
     */
    formatSelected?: (suggestion: DadataApi.Response<T>) => void;
    /**
     * Вызывается при изменении значения input-элемента, после выбора варианта из списка.
     * this привязано к input-элементу.
     * @param suggestion
     */
    onInvalidateSelection?: (suggestion) => void;
    /**
     * Вызывается перед началом ajax-запроса к серверу. Здесь можно модифицировать запрос.
     * this привязано к input-элементу.
     * @param query
     */
    onSearchStart?: (query) => void;
    /**
     * Вызывается при получении ответа от сервера. В suggestions передается массив полученных подсказок.
     * this привязано к input-элементу.
     * @param query
     * @param suggestions
     */
    onSearchComplete?: (query, suggestions) => void;
    /**
     * Вызывается, если сервер вернул ошибку.
     * this привязано к input-элементу.
     * @param query
     * @param jqXHR
     * @param textStatus
     * @param errorThrown
     */
    onSearchError?: (query, jqXHR, textStatus, errorThrown) => void;
    /**
     * Вызывается, пользователь нажал ENTER или input-элемент потерял фокус, а подходящей подсказки нет.
     * this привязано к input-элементу.
     * @param query
     */
    onSelectNothing?: (query: string) => void;
  }

  export interface State<T> {
    value: string;
    inputQuery: string;
    inputFocused: boolean;
    suggestions: DadataApi.Response<T>[];
    suggestionIndex: number;
    suggestionsVisible: boolean;
    isValid: boolean;
  }
}

export class BaseDadataSuggestion<
  T,
  TProps extends BaseDadataSuggestion.Props<T>,
  TState extends BaseDadataSuggestion.State<T>
> extends React.PureComponent<TProps, TState> {
  static defaultProps: BaseDadataSuggestion.Props<any> = {
    autoComplete: 'off',
    serviceUrl: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest',
    count: 10,
    onSelectNothing: query => {}
  } as BaseDadataSuggestion.Props<any>;

  /**
   * HTML-input
   */
  protected _textInput!: HTMLInputElement | null;

  /**
   * XMLHttpRequest instance
   */
  protected _xhr!: XMLHttpRequest;

  constructor(props: TProps) {
    super(props);

    this.state = {
      value: this.props.value ? this.props.value : '',
      inputQuery: this.props.value ? this.props.value : '',
      inputFocused: false,
      suggestions: [] as DadataApi.Response<T>[],
      suggestionIndex: -1,
      suggestionsVisible: true,
      isValid: false
    } as TState;

    this._onInputFocus = this._onInputFocus.bind(this);
    this._onInputBlur = this._onInputBlur.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
    this._onKeyPress = this._onKeyPress.bind(this);
    this._onSuggestionClick = memoize(this._onSuggestionClick.bind(this));
    this._setCursorToEnd = this._setCursorToEnd.bind(this);
  }

  componentDidMount() {
    if (this.props.autoload && this.state.value) {
      this._fetchSuggestions();
    }
  }

  render() {
    const {
      className = '',
      serviceUrl,
      token,
      // constraints,
      // bounds,
      count,
      onSelectNothing,
      suggestionType,
      onChangeValue,
      ...inputProps
    } = this.props;

    const html = [
      <input
        {...inputProps}
        key="input"
        className={`react-dadata__input${className ? ` ${className}` : ''}`}
        type="text"
        value={this.state.value}
        ref={input => {
          this._textInput = input;
        }}
        onChange={this._onInputChange}
        onKeyPress={this._onKeyPress}
        onKeyDown={this._onKeyPress}
        onFocus={this._onInputFocus}
        onBlur={this._onInputBlur}
      />
    ];

    if (
      this.state.inputFocused &&
      this.state.suggestionsVisible &&
      this.state.suggestions &&
      this.state.suggestions.length > 0
    ) {
      html.push(
        <div key="suggestion" className="react-dadata__container">
          <div className="react-dadata__suggestions">
            <div className="react-dadata__suggestion-note">
              Выберите вариант или продолжите ввод
            </div>
            {this.state.suggestions.map((suggestion, index) => {
              let suggestionClass = 'react-dadata__suggestion';
              if (index == this.state.suggestionIndex) {
                suggestionClass += ' react-dadata__suggestion--current';
              }
              return (
                <div
                  key={index}
                  onMouseDown={this._onSuggestionClick(index)}
                  className={suggestionClass}
                >
                  <Highlighter
                    highlightClassName="react-dadata--highlighted"
                    autoEscape={true}
                    searchWords={this._getHighlightWords()}
                    textToHighlight={this._formatSuggestion(suggestion)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return html;
  }

  protected _serviseUrl(): string {
    throw new Error('Not implemented');
  }

  protected _onInputFocus() {
    this.setState({ inputFocused: true }, () => {
      if (this._textInput && this._textInput.value) {
        if (this.state.suggestions.length == 0) {
          this._fetchSuggestions();
        }
        setTimeout(() => this._setCursorToEnd(this._textInput!), 100);
      }
    });
  }

  protected _onInputBlur() {
    this.setState({ inputFocused: false }, () => {
      if (
        this._textInput &&
        this._textInput.value &&
        this.state.suggestions.length === 0
      ) {
        this._fetchSuggestions();
      } else {
        this._onSelectNothing();
      }
    });
  }

  protected _onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    this.setState(
      { value: value, inputQuery: value, suggestionsVisible: true },
      () => {
        if (this.props.validate) {
          this.props.validate(value);
        }
        this._fetchSuggestions();
      }
    );
  }

  protected _onKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    switch (event.which) {
      case KEYS.DOWN:
        event.preventDefault();
        if (this.state.suggestionIndex < this.state.suggestions.length) {
          const newSuggestionIndex = this.state.suggestionIndex + 1;
          const newInputQuery = this.state.suggestions[newSuggestionIndex]
            .value;
          this.setState({
            suggestionIndex: newSuggestionIndex,
            value: newInputQuery
          });
        }
        break;
      case KEYS.UP:
        event.preventDefault();
        if (this.state.suggestionIndex >= 0) {
          const newSuggestionIndex = this.state.suggestionIndex - 1;
          const newInputQuery =
            newSuggestionIndex == -1
              ? this.state.inputQuery
              : this.state.suggestions[newSuggestionIndex].value;
          this.setState({
            suggestionIndex: newSuggestionIndex,
            value: newInputQuery
          });
        }
        break;
      case KEYS.ENTER:
        event.preventDefault();
        if (this.state.suggestionIndex >= 0) {
          this._selectSuggestion(this.state.suggestionIndex);
        } else {
          this._onSelectNothing();
        }
        break;
      case KEYS.ESC:
        event.preventDefault();
        this.setState({
          suggestionsVisible: false
        });
        this._onSelectNothing();
        break;
      default:
        break;
    }
  }

  protected _createQuery(): DadataApi.BaseRequest {
    const { count } = this.props;
    const { value: query } = this.state;

    return { query, count };
  }

  protected _fetchSuggestions() {
    if (this._xhr) {
      this._xhr.abort();
    }
    this._xhr = new XMLHttpRequest();
    this._xhr.open('POST', this._serviseUrl());
    this._xhr.setRequestHeader('Accept', 'application/json');
    this._xhr.setRequestHeader('Authorization', `Token ${this.props.token}`);
    this._xhr.setRequestHeader('Content-Type', 'application/json');
    this._xhr.send(JSON.stringify(this._createQuery()));

    this._xhr.onreadystatechange = () => {
      if (this._xhr.readyState !== 4) {
        return;
      }

      if (this._xhr.status === 200) {
        const responseJson = JSON.parse(this._xhr.response);
        if (responseJson && responseJson.suggestions) {
          this.setState({
            suggestions: responseJson.suggestions,
            suggestionIndex: -1
          });
        }
      }
    };
  }

  protected _onSelectNothing() {
    const { onSelectNothing } = this.props;

    if (isFunction(onSelectNothing)) {
      onSelectNothing(this._textInput!.value);
    }
  }

  protected _onSuggestionClick(index: number) {
    return (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      this._selectSuggestion(index);
    };
  }

  protected _getTypeSuggestionValue(options: {
    suggestion: DadataApi.Response<T>;
    hasSameValues?: boolean;
    hasBeenEnriched?: boolean;
  }): string | null {
    return options.suggestion.value;
  }

  /**
   * Gets string to set as input value
   *
   * @param suggestion
   * @param {Object} [selectionOptions]
   * @param {boolean} selectionOptions.hasBeenEnriched
   * @param {boolean} selectionOptions.hasSameValues
   * @return {string}
   */
  protected _getSuggestionValue(
    suggestion: DadataApi.Response<T>,
    selectionOptions: { hasBeenEnriched?: boolean; hasSameValues?: boolean }
  ): string {
    const { formatSelected } = this.props;
    const { hasSameValues, hasBeenEnriched } = selectionOptions;
    let formattedValue: string | null = null;
    let typeFormattedValue: string | null = null;

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
  }

  protected _selectSuggestion(index: number) {
    const { onChangeValue, onChange } = this.props;
    const { suggestions } = this.state;
    const suggestion = suggestions[index];

    if (suggestions.length >= index - 1) {
      const query = this._getSuggestionValue(suggestion, {
        hasSameValues: this._hasSameValues(suggestion),
        hasBeenEnriched: !!suggestion
      });
      this.setState(
        {
          value: query,
          suggestionsVisible: false,
          inputQuery: query
        },
        () => {
          this._fetchSuggestions();
          setTimeout(() => this._setCursorToEnd(this._textInput!), 100);
        }
      );

      if (isFunction(onChange)) {
        onChange(query);
      }
      if (isFunction(onChangeValue)) {
        onChangeValue(suggestion);
      }
    } else {
      this._onSelectNothing();
    }
  }

  protected _setCursorToEnd(element: HTMLInputElement) {
    const valueLength = element.value.length;
    if (element.selectionStart || element.selectionStart === 0) {
      // Firefox/Chrome
      element.selectionStart = valueLength;
      element.selectionEnd = valueLength;
      element.focus();
    }
  }

  protected _getHighlightWords = (): Array<string> => {
    const { inputQuery } = this.state;
    const wordsToPass = [
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
      .filter(word => wordsToPass.indexOf(word) < 0);
  };

  protected _formatSuggestion(suggestion: DadataApi.Response<any>): string {
    const { formatResult } = this.props;

    if (isFunction(formatResult)) {
      return formatResult(suggestion.value, this.state.value, suggestion, {});
    }

    return this._formatResult(
      suggestion.value,
      this.state.value,
      suggestion,
      {}
    );
  }

  protected _formatResult(value, currentValue, suggestion, options) {
    return suggestion.value;
  }

  // other

  protected _hasSameValues(suggestion) {
    return this.state.suggestions.some(
      anotherSuggestion =>
        anotherSuggestion.value === suggestion.value &&
        anotherSuggestion !== suggestion
    );
  }
}
