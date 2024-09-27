export interface GetAgent {
  id: string;
  name: string;
  email: string;
  phone: string;
  branch: string;
  thePrecentageOfCompanyFromOffer: number;
  govern: string;
  typeOfOffer: string;
  address: string;
}

export interface AddAgent {
  name: string;
  email: string;
  phone: number;
  branchID: number;
  password: string;
  governID: number;
  address: string;
  typeOfOfferID: number;
  thePrecentageOfCompanyFromOffer: number;
}
