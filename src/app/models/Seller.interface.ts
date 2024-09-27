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

export interface GetSeller {
  id: string;
  name: string;
  email: string;
  phone: string;
  branchID: number;
  storeName: string;
  pickUp: number;
  valueOfRejectedOrder: number;
  branchName: string;
  governor: string;
  city: string;
}
