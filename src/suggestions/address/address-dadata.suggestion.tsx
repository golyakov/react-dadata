import compact = require('lodash.compact');
import isEmpty = require('lodash.isempty');
import { DadataApi } from './../../interfaces/dadata-api';
import { IAddressComponent } from './../../interfaces/address-component';
import { textUtils } from './../../utils/text.utils';
import { collectionUtils } from './../../utils/collection.utils';
import { objectUtils } from './../../utils/object.utils';
import { BaseDadataSuggestion } from './../base-dadata.suggestion';
import { Constraint } from './constraint';

export interface AddressDadataSuggestionProps
  extends BaseDadataSuggestion.Props<DadataApi.AddressSuggestion> {
  // suggestions-jquery
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
  bounds?:
    | 'region'
    | 'region-city'
    | 'city-settlement'
    | 'city-street'
    | 'street'
    | 'city_district'
    | 'house';
}

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
const ADDRESS_COMPONENTS: IAddressComponent[] = [
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

export class AddressDadataSuggestion extends BaseDadataSuggestion<
  DadataApi.AddressSuggestion,
  AddressDadataSuggestionProps,
  BaseDadataSuggestion.State<DadataApi.AddressSuggestion>
> {
  static defaultProps: AddressDadataSuggestionProps = {
    ...BaseDadataSuggestion.defaultProps,
    suggestionType: 'ADDRESS'
  } as AddressDadataSuggestionProps;

  private _componentsUnderCityDistrict: any[] = [];
  private _bounds: {
    from: string | null;
    to: string | null;
    all: string[];
    own: string[];
  } = {
    from: null,
    to: null,
    all: [],
    own: []
  };
  private _dataComponents = ADDRESS_COMPONENTS;
  private _dataComponentsById = objectUtils.indexObjectsById(
    ADDRESS_COMPONENTS,
    'id',
    'index'
  );
  private _constraints: { [key: string]: Constraint } = {};

  constructor(props: AddressDadataSuggestionProps) {
    super(props);

    this._setBoundsOptions();
    this.setupConstraints();

    let _underCityDistrict = false;
    ADDRESS_COMPONENTS.forEach(component => {
      if (_underCityDistrict)
        this._componentsUnderCityDistrict.push(component.id);
      if (component.id === 'city_district') _underCityDistrict = true;
    });
  }

  protected _serviseUrl(): string {
    const { serviceUrl } = this.props;
    return `${serviceUrl}/address`;
  }

  protected _createQuery(): DadataApi.AddressRequest {
    const { constraints, bounds, restrict_value } = this.props;
    const result: DadataApi.AddressRequest = super._createQuery();

    if (constraints) {
      if (Array.isArray(constraints)) {
        result.locations = constraints.map(
          c => c.locations
        ) as DadataApi.ILocationsParams[];
      } else {
        result.locations = constraints.locations;
      }
    }

    if (bounds) {
      const [from_bound, to_bound] = bounds
        .split('-')
        .map(v => ({ value: v })) as DadataApi.AddressRequestBound[];
      result.from_bound = from_bound;
      if (to_bound) {
        result.to_bound = to_bound;
      } else {
        result.to_bound = from_bound;
      }
    }

    if (
      ((typeof restrict_value !== 'undefined' && restrict_value) ||
        typeof restrict_value === 'undefined') &&
      (constraints && Object.keys(constraints).length > 0)
    ) {
      result.restrict_value = true;
    }

    return result;
  }

  // bounds

  protected _setBoundsOptions() {
    const boundsAvailable: string[] = [];
    const newBounds = (this.props.bounds || '').trim().split('-');
    let boundFrom: string | null = newBounds[0];
    let boundTo: string | null = newBounds[newBounds.length - 1];
    const boundsOwn: string[] = [];
    let boundIsOwn;
    const boundsAll: string[] = [];
    let indexTo;

    if (this._dataComponents) {
      this._dataComponents.forEach(component => {
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
      collectionUtils.each(boundsAvailable, bound => {
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
  }

  protected _copyDataComponents(data, components) {
    var result = {},
      dataComponentsById = this._dataComponentsById;

    if (dataComponentsById) {
      components.forEach(component => {
        dataComponentsById[component].fields.forEach(field => {
          if (data[field] != null) {
            result[field] = data[field];
          }
        });
      });
    }

    return result;
  }

  // constraints

  protected addConstraint(constraint) {
    const c = new Constraint(constraint, this._dataComponents);

    if (c.isValid()) {
      this._constraints[c.id] = c;
    }
  }

  protected removeConstraint(id) {
    delete this._constraints[id];
  }

  protected setupConstraints() {
    const { constraints } = this.props;

    if (constraints) {
      Object.keys(this._constraints).forEach(id => {
        this.removeConstraint(id);
      });
      collectionUtils.makeArray(constraints).forEach(constraint => {
        this.addConstraint(constraint);
      });
    }
  }

  /**
   * Pick only fields that absent in restriction
   */
  protected _getUnrestrictedData(data: DadataApi.AddressSuggestion) {
    const restrictedKeys: string[] = [];
    let unrestrictedData = {};
    let maxSpecificity = -1;

    // Find most specific location that could restrict current data
    Object.keys(this._constraints).forEach(key => {
      const constraint = this._constraints[key];
      constraint.locations.forEach(location => {
        if (
          location.containsData(data) &&
          location.specificity > maxSpecificity
        ) {
          maxSpecificity = location.specificity;
        }
      });
    });

    if (maxSpecificity >= 0) {
      // Для городов-регионов нужно также отсечь и город
      if (data.region_kladr_id && data.region_kladr_id === data.city_kladr_id) {
        restrictedKeys.push.apply(
          restrictedKeys,
          this._dataComponentsById['city'].fields
        );
      }

      // Collect all fieldnames from all restricted components
      this._dataComponents.slice(0, maxSpecificity + 1).forEach(component => {
        restrictedKeys.push.apply(restrictedKeys, component.fields);
      });

      Object.keys(data)
        .filter(key => restrictedKeys.indexOf(key) === -1)
        .reduce((acc, key) => {
          acc[key] = data[key];
          return acc;
        });
    } else {
      unrestrictedData = data;
    }

    return unrestrictedData;
  }

  /**
   * Возвращает список слов в запросе,
   * которые не встречаются в подсказке
   */
  protected _findUnusedTokens(tokens, value) {
    return tokens.filter(token => value.indexOf(token) === -1);
  }

  /**
   * Возвращает исторические названия для слов запроса,
   * для которых не найдено совпадения в основном значении подсказки
   */
  protected _getFormattedHistoryValues(
    unusedTokens: string[],
    historyValues: string[]
  ) {
    let formatted = '';
    const values = historyValues.reduce(
      (acc, historyValue) => {
        const finded = unusedTokens.find(token => {
          return historyValue.toLowerCase().indexOf(token) === -1;
        });
        if (finded) {
          acc.push(historyValue);
        }
        return acc;
      },
      [] as string[]
    );

    if (values.length > 0) {
      formatted = ' (бывш. ' + values.join(', ') + ')';
    }

    return formatted;
  }

  protected _formatResult(value, currentValue, suggestion, options) {
    const district = suggestion.data && suggestion.data.city_district_with_type;
    const unformattableTokens = options && options.unformattableTokens;
    const historyValues = suggestion.data && suggestion.data.history_values;
    let tokens;
    let unusedTokens;
    let formattedHistoryValues;

    // добавляем исторические значения
    if (historyValues && historyValues.length > 0) {
      tokens = textUtils.tokenize(currentValue, unformattableTokens);
      unusedTokens = this._findUnusedTokens(tokens, value);
      formattedHistoryValues = this._getFormattedHistoryValues(
        unusedTokens,
        historyValues
      );
      if (formattedHistoryValues) {
        value += formattedHistoryValues;
      }
    }

    // value = that.highlightMatches(value, currentValue, suggestion, options);
    // value = that.wrapFormattedValue(value, suggestion);

    if (
      district &&
      (!this._bounds.own.length || this._bounds.own.indexOf('street') >= 0) &&
      !isEmpty(
        this._copyDataComponents(
          suggestion.data,
          this._componentsUnderCityDistrict
        )
      )
    ) {
      value += district;
    }

    return value;
  }

  protected _composeValue(data, options) {
    let region =
      data.region_with_type ||
      compact([data.region, data.region_type]).join(' ') ||
      data.region_type_full;
    const area =
      data.area_with_type ||
      compact([data.area_type, data.area]).join(' ') ||
      data.area_type_full;
    const city =
      data.city_with_type ||
      compact([data.city_type, data.city]).join(' ') ||
      data.city_type_full;
    const settelement =
      data.settlement_with_type ||
      compact([data.settlement_type, data.settlement]).join(' ') ||
      data.settlement_type_full;
    let cityDistrict =
      data.city_district_with_type ||
      compact([data.city_district_type, data.city_district]).join(' ') ||
      data.city_district_type_full;
    const street =
      data.street_with_type ||
      compact([data.street_type, data.street]).join(' ') ||
      data.street_type_full;
    const house = compact([
      data.house_type,
      data.house,
      data.block_type,
      data.block
    ]).join(' ');
    const flat = compact([data.flat_type, data.flat]).join(' ');
    const postal_box = data.postal_box && 'а/я ' + data.postal_box;
    let result;

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
      } else if (cityDistrict && !data.city_district_fias_id) {
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
  }

  /**
   * Compose suggestion value with respect to constraints
   */
  protected _getValueWithinConstraints(
    suggestion: DadataApi.AddressResponse,
    options = {}
  ) {
    return this._composeValue(
      this._getUnrestrictedData(suggestion.data),
      options
    );
  }

  /**
   * Compose suggestion value with respect to bounds
   */
  protected _getValueWithinBounds(suggestion, options = {}) {
    // для корректного составления адреса нужен city_district_fias_id
    var data = this._copyDataComponents(
      suggestion.data,
      this._bounds.own!.concat(['city_district_fias_id'])
    );

    return this._composeValue(data, options);
  }

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
  }) {
    var formattedValue: string | null = null;

    if (options.hasSameValues) {
      if (this.props.restrict_value) {
        // Can not use unrestricted address,
        // because some components (from constraints) must be omitted
        formattedValue = this._getValueWithinConstraints(options.suggestion);
      } else if (this._bounds.own!.length) {
        // Can not use unrestricted address,
        // because only components from bounds must be included
        formattedValue = this._getValueWithinBounds(options.suggestion);
      } else {
        // Can use full unrestricted address
        formattedValue = options.suggestion.unrestricted_value;
      }
    } else if (options.hasBeenEnriched) {
      if (this.props.restrict_value) {
        formattedValue = this._getValueWithinConstraints(options.suggestion, {
          excludeCityDistrict: true
        });
      }
    }

    return formattedValue;
  }
}
