export interface AddSeller {
  name: string;
  email: string;
  phone: number;
  branchID: number;
  password: string;
  storeName: string;
  storeCityId: number;
  pickUp: number;
  address: string;
  valueOfRejectedOrder: number;
  citySellers: {
    cityId: number;
    specialCharge: number;
  }[];
}
