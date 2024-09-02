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
