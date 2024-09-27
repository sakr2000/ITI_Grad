export interface GetEmployee {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  branchName: string;
  fieldJobName: string;
  status: boolean;
}

export interface AddEmployee {
  name: string;
  email: string;
  phone: string;
  branchID: number;
  fieldJobID: number;
  status: boolean;
  password: string;
  govern: string;
  city: string;
}
