export interface Govern {
  name: string;
  cities: {
    name: string;
    normalCharge: number;
    pickUpCharge: number;
    specialChargeForSeller: number;
  }[];
}
