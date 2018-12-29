export declare namespace DadataApi {
    type IGeoLocationParams = {
        /**
         * Код КЛАДР
         */
        kladr_id: boolean;
    };
    type ILocationsParams = {
        kladr_id?: string;
        fias_id?: string;
        postal_code?: string;
        country?: string;
        region?: string;
        area?: string;
        city?: string;
        settlement?: string;
        street?: string;
    };
    type IConstraintsParams = {
        /**
         * "Новосибирск"
         */
        label?: string;
        /**
         * ограничиваем поиск Новосибирском
         */
        locations: ILocationsParams | ILocationsParams[];
        /**
         * даем пользователю возможность снять ограничение
         */
        deletable?: boolean;
    };
    type BaseRequest = {
        /**
         * Запрос, для которого нужно получить подсказки
         */
        query: string;
        /**
         * Количество возвращаемых подсказок (по умолчанию — 10, максимум — 20).
         */
        count?: number;
    };
    type gender = 'UNKNOWN' | 'MALE' | 'FEMALE';
    type NameRequest = BaseRequest & {
        /**
         * Подсказки по части ФИО
         */
        parts?: ('SURNAME' | 'NAME' | 'PATRONYMIC')[];
        /**
         * Пол
         */
        gender?: gender;
    };
    type AddressRequestBound = {
        value: string;
    };
    type AddressRequest = BaseRequest & {
        /**
         * Ограничение области поиска
         */
        locations?: ILocationsParams | ILocationsParams[];
        /**
         * Приоритет города при ранжировании
         */
        locations_boost?: any;
        /**
         * Гранулярные подсказки по адресу
         */
        from_bound?: AddressRequestBound | AddressRequestBound[];
        /**
         * Гранулярные подсказки по адресу
         */
        to_bound?: AddressRequestBound | AddressRequestBound[];
        restrict_value?: boolean;
    };
    interface Response<T> {
        /**
         * Отформатированные данные
         */
        value: string;
        /**
         * Неотформатированные данные
         */
        unrestricted_value: string;
        data: T;
    }
    type NameSuggestion = {
        gender: DadataApi.gender;
        name: string;
        patronymic: string;
        qc: string;
        surname: string;
    };
    type AddressSuggestion = {
        /**
         * Индекс
         */
        postal_code: string;
        /**
         * Страна
         */
        country: string;
        /**
         * Регион с типом
         */
        region_with_type: string;
        /**
         * Тип субъекта (сокращенный)
         */
        region_type: string;
        /**
         * Тип субъекта
         */
        region_type_full: string;
        /**
         * Субъект
         */
        region: string;
        /**
         * Район в регионе с типом
         */
        area_with_type: string;
        /**
         * Тип района (сокращенный)
         */
        area_type: string;
        /**
         * Тип района
         */
        area_type_full: string;
        /**
         * Район
         */
        area: string;
        /**
         * Город с типом
         */
        city_with_type: string;
        /**
         * Тип города (сокращенный)
         */
        city_type: string;
        /**
         * Тип города
         */
        city_type_full: string;
        /**
         * Район города
         */
        city_disctrict: string;
        /**
         * Город
         */
        city: string;
        /**
         * Населенный пункт с типом
         */
        settlement_with_type: string;
        /**
         * Тип населенного пункта (сокращенный)
         */
        settlement_type: string;
        /**
         * Тип населенного пункта
         */
        settlement_type_full: string;
        /**
         * Населенный пункт
         */
        settlement: string;
        /**
         * Улица с типом
         */
        street_with_type: string;
        /**
         * Тип улицы (сокращенный)
         */
        street_type: string;
        /**
         * Тип улицы
         */
        street_type_full: string;
        /**
         * Улица
         */
        street: string;
        /**
         * Тип дома (сокращенный)
         */
        house_type: string;
        /**
         * Тип дома
         */
        house_type_full: string;
        /**
         * Дом
         */
        house: string;
        /**
         * Тип расширения дома (корпус / строение / секция)
         */
        block_type: string;
        /**
         * Расширение дома
         */
        block: string;
        /**
         * Тип квартиры (квартира / офис / комната)
         */
        flat_type: string;
        /**
         * Номер квартиры
         */
        flat: string;
        /**
         * Площадь квартиры (не заполняется)
         */
        flat_area: string;
        /**
         * Абонентский ящик
         */
        postal_box: string;
        /**
         * Код ФИАС
         */
        fias_id: string;
        /**
         * Код КЛАДР
         */
        kladr_id: string;
        /**
         * Код ОКАТО
         */
        okato: string;
        /**
         * Код ОКТМО
         */
        oktmo: string;
        /**
         * Код ИФНС для физических лиц
         */
        tax_office: string;
        /**
         * Код ИФНС для организаций (не заполняется)
         */
        tax_office_legal: string;
        /**
         * Широта
         */
        geo_lat: string;
        /**
         * Долгота
         */
        geo_lon: string;
        /**
         * Код полноты (не заполняется)
         */
        qc_complete: string;
        /**
         * Код проверки дома (не заполняется)
         */
        qc_house: string;
        /**
         * Код качества (не заполняется)
         */
        qc: string;
        /**
         * Код качества геоокоординат
         */
        qc_geo: '0' | '1' | '2' | '3' | '4' | '5';
        /**
         * Нераспознанная часть адреса (не заполняется)
         */
        unparsed_parts: string;
        area_fias_id: string;
        area_kladr_id: string;
        beltway_distance: null;
        beltway_hit: null;
        block_type_full: string;
        capital_marker: '0' | '1' | '2' | '3' | '4';
        city_area: string;
        city_district: string;
        city_district_fias_id: string;
        city_district_kladr_id: string;
        city_district_type: string;
        city_district_type_full: string;
        city_district_with_type: string;
        city_fias_id: string;
        city_kladr_id: string;
        fias_level: string;
        flat_price: null;
        flat_type_full: string;
        history_values: string;
        house_fias_id: string;
        house_kladr_id: string;
        region_fias_id: string;
        region_kladr_id: string;
        settlement_fias_id: string;
        settlement_kladr_id: string;
        source: string;
        square_meter_price: null;
        street_fias_id: string;
        street_kladr_id: string;
        timezone: null;
    };
    interface NameResponse extends Response<NameSuggestion> {
    }
    interface AddressResponse extends Response<AddressSuggestion> {
    }
}
