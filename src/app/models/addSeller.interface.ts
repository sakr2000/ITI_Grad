export interface AddSeller {
  name: string;
  email: string;
  phone: number;
  branchID: number;
  password: string;
  govern: string;
  city: string;
  storeName: string;
  pickUp: number;
  address: string;
  valueOfRejectedOrder: number;
  citySellers: {
    cityId: number;
    specialCharge: number;
  }[];
}
