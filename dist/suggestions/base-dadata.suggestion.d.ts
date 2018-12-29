import * as React from 'react';
import { DadataApi } from './../interfaces/dadata-api';
export declare namespace BaseDadataSuggestion {
    type SuggestionType = 'ADDRESS' | 'NAME';
    interface Props<T> extends React.InputHTMLAttributes<string> {
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
        autoload?: boolean;
        onChangeValue?: (suggestion: DadataApi.Response<T>) => void;
        validate?: (value: string) => void;
        /**
         * Вызывается перед показом выпадающего списка. this привязано к input-элементу
         * @param container
         */
        beforeRender?: (container: any) => void;
        /**
         * Форматирование подсказки перед ее отображением в списке.
         * @param value
         * @param currentValue
         * @param suggestion
         * @param options
         */
        formatResult?: (value: any, currentValue: any, suggestion: any, options: any) => string;
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
        onInvalidateSelection?: (suggestion: any) => void;
        /**
         * Вызывается перед началом ajax-запроса к серверу. Здесь можно модифицировать запрос.
         * this привязано к input-элементу.
         * @param query
         */
        onSearchStart?: (query: any) => void;
        /**
         * Вызывается при получении ответа от сервера. В suggestions передается массив полученных подсказок.
         * this привязано к input-элементу.
         * @param query
         * @param suggestions
         */
        onSearchComplete?: (query: any, suggestions: any) => void;
        /**
         * Вызывается, если сервер вернул ошибку.
         * this привязано к input-элементу.
         * @param query
         * @param jqXHR
         * @param textStatus
         * @param errorThrown
         */
        onSearchError?: (query: any, jqXHR: any, textStatus: any, errorThrown: any) => void;
        /**
         * Вызывается, пользователь нажал ENTER или input-элемент потерял фокус, а подходящей подсказки нет.
         * this привязано к input-элементу.
         * @param query
         */
        onSelectNothing?: (query: string) => void;
    }
    interface State<T> {
        value: string;
        inputQuery: string;
        inputFocused: boolean;
        suggestions: DadataApi.Response<T>[];
        suggestionIndex: number;
        suggestionsVisible: boolean;
        isValid: boolean;
    }
}
export declare class BaseDadataSuggestion<T, TProps extends BaseDadataSuggestion.Props<T>, TState extends BaseDadataSuggestion.State<T>> extends React.PureComponent<TProps, TState> {
    static defaultProps: BaseDadataSuggestion.Props<any>;
    /**
     * HTML-input
     */
    protected _textInput: HTMLInputElement | null;
    /**
     * XMLHttpRequest instance
     */
    protected _xhr: XMLHttpRequest;
    constructor(props: TProps);
    componentDidMount(): void;
    render(): JSX.Element[];
    protected _serviseUrl(): string;
    protected _onInputFocus(): void;
    protected _onInputBlur(): void;
    protected _onInputChange(event: React.ChangeEvent<HTMLInputElement>): void;
    protected _onKeyPress(event: React.KeyboardEvent<HTMLInputElement>): void;
    protected _createQuery(): DadataApi.BaseRequest;
    protected _fetchSuggestions(): void;
    protected _onSelectNothing(): void;
    protected _onSuggestionClick(index: number): (event: React.MouseEvent<HTMLDivElement>) => void;
    protected _getTypeSuggestionValue(options: {
        suggestion: DadataApi.Response<T>;
        hasSameValues?: boolean;
        hasBeenEnriched?: boolean;
    }): string | null;
    /**
     * Gets string to set as input value
     *
     * @param suggestion
     * @param {Object} [selectionOptions]
     * @param {boolean} selectionOptions.hasBeenEnriched
     * @param {boolean} selectionOptions.hasSameValues
     * @return {string}
     */
    protected _getSuggestionValue(suggestion: DadataApi.Response<T>, selectionOptions: {
        hasBeenEnriched?: boolean;
        hasSameValues?: boolean;
    }): string;
    protected _selectSuggestion(index: number): void;
    protected _setCursorToEnd(element: HTMLInputElement): void;
    protected _getHighlightWords: () => string[];
    protected _formatSuggestion(suggestion: DadataApi.Response<any>): string;
    protected _formatResult(value: any, currentValue: any, suggestion: any, options: any): any;
    protected _hasSameValues(suggestion: any): boolean;
}
