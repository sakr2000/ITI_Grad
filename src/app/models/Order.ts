export interface Product {
    name: string;
    quantity: number;
    productWeight: number;
    orderId?: number; 
  }
  
  export interface Order {
    clientName: string;
    clientNumber: string;
    clientNumber2?: string;
    email: string;
    cost: number;
    isForVillage: boolean;
    note?: string;
    weight: number;
    villageOrStreet: string;
    branchID: number;
    governID: number;
    cityID:number;
    typeOfPaymentID: number;
    typeOfChargeID: number;
    orderStatusID: number;
    typeOfReceiptID:number;
    productList: Product[];
  }
  