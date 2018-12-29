import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import './../src/react-dadata.css';
import {
  DadataApi,
  NameDadataSuggestion,
  AddressDadataSuggestion
} from './../src';

export class Example extends React.PureComponent<
  { token: string },
  { address: DadataApi.AddressSuggestion }
> {
  constructor(props) {
    super(props);

    this.state = {
      address: {
        region: '',
        region_type: '',
        region_with_type: '',
        city_type: '',
        city: '',
        city_with_type: '',
        street_type: '',
        street: '',
        street_with_type: '',
        house_type: '',
        house: '',
        flat_type: '',
        flat: '',
        geo_lat: '0',
        geo_lon: '0'
      } as DadataApi.AddressSuggestion
    };
  }

  _onChangeSuggestion = (propName: string) => {
    return (suggestion: DadataApi.AddressResponse) => {
      const { data } = suggestion;
      this.setState({
        address: { ...this.state.address, [propName]: data[propName] }
      });
    };
  };

  _onChange = (propName: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
        address: { ...this.state.address, [propName]: e.target.value }
      });
    };
  };

  render() {
    return (
      <div className="example">
        <h1>react-dadata demo</h1>
        <h2>Подсказки по ФИО</h2>
        <fieldset>
          <legend>Подсказки по ФИО</legend>
          <div>
            <NameDadataSuggestion token={this.props.token} />
          </div>
        </fieldset>
        <GranularNameSuggestions token={this.props.token} />
        <h2>Подсказки по адресу</h2>
        <fieldset>
          <legend>Подсказки по адресу</legend>
          <div>
            <AddressDadataSuggestion token={this.props.token} />
          </div>
        </fieldset>
        <GranularAddressSuggestions token={this.props.token} />
      </div>
    );
  }
}

export class GranularAddressSuggestions extends React.Component<
  { token: string },
  { suggestion: DadataApi.AddressSuggestion }
> {
  constructor(props) {
    super(props);

    this.state = {
      suggestion: {
        region: '',
        region_type: '',
        region_with_type: '',
        city_type: '',
        city: '',
        city_with_type: '',
        street_type: '',
        street: '',
        street_with_type: '',
        house_type: '',
        house: '',
        flat_type: '',
        flat: '',
        geo_lat: '0',
        geo_lon: '0'
      } as DadataApi.AddressSuggestion
    };
  }

  render() {
    const { suggestion } = this.state;

    return (
      <fieldset>
        <legend>Гранулярные подсказки</legend>
        <label htmlFor="city">Регион</label>
        <AddressDadataSuggestion
          id="region"
          token={this.props.token}
          value={suggestion.region_with_type}
          bounds="region"
          onChangeValue={this._onChangeSuggestion('region')}
        />
        <label htmlFor="city">Город</label>
        <AddressDadataSuggestion
          id="city"
          token={this.props.token}
          value={suggestion.city_with_type}
          constraints={
            {
              locations: {
                region: suggestion.region
              },
              label: false
            } as any
          }
          bounds="city-settlement"
          onChangeValue={this._onChangeSuggestion('city')}
        />
        <label htmlFor="streetWithType">Улица</label>
        <AddressDadataSuggestion
          id="streetWithType"
          token={this.props.token}
          value={suggestion.street_with_type}
          constraints={{ locations: { city: suggestion.city } }}
          bounds="street"
          onChangeValue={this._onChangeSuggestion('street')}
        />
        <label htmlFor="house">Дом</label>
        <AddressDadataSuggestion
          id="house"
          token={this.props.token}
          value={suggestion.house}
          constraints={{
            locations: { city: suggestion.city, street: suggestion.street }
          }}
          bounds="house"
          onChangeValue={this._onChangeSuggestion('house')}
        />
        <label htmlFor="flat">Кв./офис</label>
        <input
          className="react-dadata__input"
          id="flat"
          type="text"
          value={suggestion.flat}
          onChange={this._onChange('flat')}
        />

        <label>region</label>
        <input
          className="react-dadata__input"
          type="text"
          readOnly
          value={suggestion.region}
        />
        <label>region_type</label>
        <input
          className="react-dadata__input"
          type="text"
          readOnly
          value={suggestion.region_type}
        />
        <label>region_with_type</label>
        <input
          className="react-dadata__input"
          type="text"
          readOnly
          value={suggestion.region_with_type}
        />
        <label>city_type</label>
        <input
          className="react-dadata__input"
          type="text"
          readOnly
          value={suggestion.city_type}
        />
        <label>city</label>
        <input
          className="react-dadata__input"
          type="text"
          readOnly
          value={suggestion.city}
        />
        <label>street_type</label>
        <input
          className="react-dadata__input"
          type="text"
          readOnly
          value={suggestion.street_type}
        />
        <label>street</label>
        <input
          className="react-dadata__input"
          type="text"
          readOnly
          value={suggestion.street}
        />
        <label>house_type</label>
        <input
          className="react-dadata__input"
          type="text"
          readOnly
          value={suggestion.house_type}
        />
        <label>flat_type</label>
        <input
          className="react-dadata__input"
          type="text"
          readOnly
          value={suggestion.flat_type}
        />
        <label>latitude</label>
        <input
          className="react-dadata__input"
          type="text"
          readOnly
          value={suggestion.geo_lat}
        />
        <label>longitude</label>
        <input
          className="react-dadata__input"
          type="text"
          readOnly
          value={suggestion.geo_lon}
        />
      </fieldset>
    );
  }

  _onChange = (propName: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
        suggestion: { ...this.state.suggestion, [propName]: e.target.value }
      });
    };
  };

  _onChangeSuggestion = (propName: string) => {
    return (suggestion: DadataApi.AddressResponse) => {
      const { data } = suggestion;
      const s = {} as DadataApi.AddressSuggestion;

      const fieldType = `${propName}_type`;
      if (data[fieldType]) {
        s[fieldType] = data[fieldType];
      }
      const fieldWithType = `${propName}_with_type`;
      if (data[fieldWithType]) {
        s[fieldWithType] = data[fieldWithType];
      }
      s.geo_lat = data.geo_lat;
      s.geo_lon = data.geo_lon;

      this.setState({
        suggestion: {
          ...this.state.suggestion,
          ...s,
          [propName]: data[propName]
        }
      });
    };
  };
}

export class GranularNameSuggestions extends React.PureComponent<
  { token: string },
  { suggestion: DadataApi.NameSuggestion }
> {
  private surname!: NameDadataSuggestion | null;
  private name!: NameDadataSuggestion | null;
  private patronymic!: NameDadataSuggestion | null;

  constructor(props) {
    super(props);

    this.state = {
      suggestion: {
        surname: '',
        name: '',
        patronymic: '',
        gender: 'UNKNOWN'
      } as DadataApi.NameSuggestion
    };
  }

  render() {
    const { suggestion } = this.state;

    return (
      <fieldset>
        <legend>Гранулярные подсказки</legend>
        <label htmlFor="surname">Фамилия</label>
        <NameDadataSuggestion
          id="surname"
          token={this.props.token}
          params={{
            gender: suggestion.gender,
            parts: ['SURNAME']
          }}
          value={suggestion.surname}
          ref={ref => (this.surname = ref)}
          onChangeValue={this._onChangeSuggestion('surname')}
          onSelectNothing={this._onSelectNothing('surname')}
        />
        <label htmlFor="name">Имя</label>
        <NameDadataSuggestion
          id="name"
          token={this.props.token}
          params={{
            gender: suggestion.gender,
            parts: ['NAME']
          }}
          value={suggestion.name}
          ref={ref => (this.name = ref)}
          onChangeValue={this._onChangeSuggestion('name')}
          onSelectNothing={this._onSelectNothing('name')}
        />
        <label htmlFor="patronymic">Отчество</label>
        <NameDadataSuggestion
          id="patronymic"
          token={this.props.token}
          params={{
            gender: suggestion.gender,
            parts: ['PATRONYMIC']
          }}
          value={suggestion.patronymic}
          ref={ref => (this.patronymic = ref)}
          onChangeValue={this._onChangeSuggestion('patronymic')}
          onSelectNothing={this._onSelectNothing('patronymic')}
        />
      </fieldset>
    );
  }

  private _onChangeSuggestion = (propName: string) => (
    suggestion: DadataApi.NameResponse
  ) => {
    const { data } = suggestion;
    this.setState({
      suggestion: {
        ...this.state.suggestion,
        gender: data.gender,
        [propName]: data[propName]
      }
    });
  };

  private _onSelectNothing = (propName: string) => (query: string) => {
    const suggestion = { ...this.state.suggestion };

    suggestion[propName] = query;

    if (!suggestion.surname && !suggestion.name && !suggestion.patronymic) {
      suggestion.gender = 'UNKNOWN';
    }

    this._onChangeSuggestion(propName)({
      data: suggestion
    } as DadataApi.NameResponse);
  };
}

const token = process.env.API_KEY;

const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Component token={token} />
    </AppContainer>,
    document.getElementById('example')
  );

render(Example);

if ((module as any).hot) {
  (module as any).hot.accept('./example.js', () => render(Example));
}
