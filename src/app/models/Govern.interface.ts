export interface GetGovern {
  id: number;
  name: string;
  status: boolean;
  cities: { id: number; name: string }[];
}

export interface addGovern {
  name: string;
  cities: {
    name: string;
    normalCharge: number;
    pickUpCharge: number;
    specialChargeForSeller: number;
  }[];
}
