export interface IAddressComponent {
  id: string;
  fields: string[];
  forBounds: boolean;
  forLocations: boolean;
  kladrFormat?: { digits: number; zeros?: number };
  fiasType?: string;
}
