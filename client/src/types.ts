export interface User {
  iduser: number;
  name: string;
  email: string;
  balance: number;
}
export interface AlertFormType {
  message: string;
  color: "green" | "red";
  show: boolean;
}
export interface TransactionType {
  amount: number;
  idtransactions: number;
  receiver: number;
  receiverName: string;
  sender: number;
  senderName: string;
  transaction_date: string;
}
