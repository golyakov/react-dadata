import { DadataApi } from './../../interfaces/dadata-api';
import { BaseDadataSuggestion } from './../base-dadata.suggestion';

export interface NameDadataSuggestionProps
  extends BaseDadataSuggestion.Props<DadataApi.NameSuggestion> {}

export class NameDadataSuggestion extends BaseDadataSuggestion<
  DadataApi.NameSuggestion,
  NameDadataSuggestionProps,
  BaseDadataSuggestion.State<DadataApi.NameSuggestion>
> {
  static defaultProps: NameDadataSuggestionProps = {
    ...BaseDadataSuggestion.defaultProps,
    suggestionType: 'NAME'
  } as NameDadataSuggestionProps;

  protected _serviseUrl(): string {
    const { serviceUrl } = this.props;
    return `${serviceUrl}/fio`;
  }

  protected _createQuery(): DadataApi.NameRequest {
    const { params } = this.props;
    const result: DadataApi.NameRequest = super._createQuery();

    if (params && params.parts) {
      result.parts = params.parts;
    }
    if (params && params.gender) {
      result.gender = params.gender;
    }

    return result;
  }
}
