export interface addGovern {
  name: string;
  cities: {
    name: string;
    normalCharge: number;
    pickUpCharge: number;
    specialChargeForSeller: number;
  }[];
}
