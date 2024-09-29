export interface Product {
  id?: number;
  name: string;
  quantity: number;
  productWeight: number;
  orderId?: number;
}
export interface updateOrder {
  id: number;
  clientName: string;
  clientNumber: string;
  clientNumber2: string;
  email: string;
  cost: number;
  isForVillage: boolean;
  note: string;
  weight: number;
  villageOrStreet: string;
  branchID: number;
  sellerID: string;
  typeOfPaymentID: number;
  typeOfChargeID: number;
  orderStatusID: number;
  typeOfReceiptID: number;
  products: Product[];
}
export interface addOrder {
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
  cityID: number;
  typeOfPaymentID: number;
  typeOfChargeID: number;
  orderStatusID: number;
  sellerID: string;
  typeOfReceiptID: number;
  productList: Product[];
}
export interface GetOrder {
  id: number;
  clientName: string;
  clientNumber: string;
  clientNumber2: string;
  email: string;
  cost: number;
  isForVillage: boolean;
  note: string;
  weight: number;
  villageOrStreet: string;
  branchID: number;
  governName: string;
  cityName: string;
  sellerID: string;
  typeOfPaymentID: number;
  typeOfChargeID: number;
  orderStatusID: number;
  orderStatusName: string;
  typeOfReceiptID: number;
  date: string;
  chargeCost: number;
  rejected: boolean;
  reasonForRjected: string;
  products: Product[];
}

export interface OrderStatus {
  id: number;
  name: string;
}
export interface GetOrderForReport {
  orderID: number;
  orderStatusName: string;
  sellerName: string;
  clientName: string;
  phoneNumber: string;
  clientGover: string;
  clientCity: string;
  orderCost: number;
  amountRecive: number;
  chargeCost: number;
  paidCharge: number;
  companyAmount: number;
  orderDate: string;
}

export const statusTranslations: { [key: string]: string } = {
  New: 'جديد',
  Wating: 'قيد الانتظار',
  AssignedToAgent: 'تم التسليم للمندوب',
  Canceled: ' تم الإلغاء من قبل العميل',
  Delivered: 'تم التسليم',
  PartiallyDelivered: 'تم التسليم جزئيًا',
  Postponed: 'تم التأجيل',
  Rejected: 'مرفوض',
  RejectedWithoutPayment: 'مرفوض بدون دفع',
  RejectedWithPayment: 'تم الرفض مع الدفع',
  RejectWithPartialPayment: 'رفض مع سداد جزء',
  UnReachable: 'لا يمكن الوصول',
};
