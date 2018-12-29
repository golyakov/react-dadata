import { DadataApi } from './../../interfaces/dadata-api';
import { BaseDadataSuggestion } from './../base-dadata.suggestion';
export interface NameDadataSuggestionProps extends BaseDadataSuggestion.Props<DadataApi.NameSuggestion> {
}
export declare class NameDadataSuggestion extends BaseDadataSuggestion<DadataApi.NameSuggestion, NameDadataSuggestionProps, BaseDadataSuggestion.State<DadataApi.NameSuggestion>> {
    static defaultProps: NameDadataSuggestionProps;
    protected _serviseUrl(): string;
    protected _createQuery(): DadataApi.NameRequest;
}
