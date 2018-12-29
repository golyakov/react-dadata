import { DadataApi } from './../../interfaces/dadata-api';
import { BaseDadataSuggestion } from './../base-dadata.suggestion';
export interface AddressDadataSuggestionProps extends BaseDadataSuggestion.Props<DadataApi.AddressSuggestion> {
    /**
     * Что показывать в правом углу текстового поля подсказок:
     * по умолчанию — индикатор загрузки в десктопной версии и крестик очистки в мобильной;
     * - spinner — индикатор загрузки;
     * - clear — крестик очистки;
     * - none — ничего не показывать.
     * Обратите внимание, значение нужно передавать как строку (например, addon: "clear").
     */
    addon?: string;
    /**
     * Всегда выбирать первую подсказку, если пользователь явно не выбрал другую.
     */
    autoSelectFirst?: boolean;
    /**
     * Поясняющий текст, который показывается в выпадающем списке над подсказками.
     */
    hint?: string | boolean;
    /**
     * Запрещает автоматическое исправление текста при вводе (по умолчанию оно включено)
     */
    triggerSelectOnSpace?: boolean;
    triggerSelectOnBlur?: boolean;
    /**
     * Принудительное ограничение области поиска
     */
    constraints?: DadataApi.IConstraintsParams | DadataApi.IConstraintsParams[];
    restrict_value?: boolean;
    /**
     * Геолокация
     */
    geoLocation?: boolean | DadataApi.IGeoLocationParams;
    /**
     * Гранулярные подсказки по адресу
     */
    bounds?: 'region' | 'region-city' | 'city-settlement' | 'city-street' | 'street' | 'city_district' | 'house';
}
export declare class AddressDadataSuggestion extends BaseDadataSuggestion<DadataApi.AddressSuggestion, AddressDadataSuggestionProps, BaseDadataSuggestion.State<DadataApi.AddressSuggestion>> {
    static defaultProps: AddressDadataSuggestionProps;
    private _componentsUnderCityDistrict;
    private _bounds;
    private _dataComponents;
    private _dataComponentsById;
    private _constraints;
    constructor(props: AddressDadataSuggestionProps);
    protected _serviseUrl(): string;
    protected _createQuery(): DadataApi.AddressRequest;
    protected _setBoundsOptions(): void;
    protected _copyDataComponents(data: any, components: any): {};
    protected addConstraint(constraint: any): void;
    protected removeConstraint(id: any): void;
    protected setupConstraints(): void;
    /**
     * Pick only fields that absent in restriction
     */
    protected _getUnrestrictedData(data: DadataApi.AddressSuggestion): {};
    /**
     * Возвращает список слов в запросе,
     * которые не встречаются в подсказке
     */
    protected _findUnusedTokens(tokens: any, value: any): any;
    /**
     * Возвращает исторические названия для слов запроса,
     * для которых не найдено совпадения в основном значении подсказки
     */
    protected _getFormattedHistoryValues(unusedTokens: string[], historyValues: string[]): string;
    protected _formatResult(value: any, currentValue: any, suggestion: any, options: any): any;
    protected _composeValue(data: any, options: any): any;
    /**
     * Compose suggestion value with respect to constraints
     */
    protected _getValueWithinConstraints(suggestion: DadataApi.AddressResponse, options?: {}): any;
    /**
     * Compose suggestion value with respect to bounds
     */
    protected _getValueWithinBounds(suggestion: any, options?: {}): any;
    /**
     * @param instance
     * @param options
     * @param options.suggestion
     * @param options.hasSameValues
     * @param options.hasBeenEnreached
     */
    protected _getTypeSuggestionValue(options: {
        suggestion: DadataApi.AddressResponse;
        hasSameValues?: boolean;
        hasBeenEnriched?: boolean;
    }): string | null;
}
