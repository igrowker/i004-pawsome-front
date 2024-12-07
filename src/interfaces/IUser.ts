import { IRefuge } from "./IRefugee";

export interface IUser {
  name: string;
  refugee: IRefuge;
  password: string;
  email: string;
  created_at?: Date;
  role: "user" | "refugee" | "admin";
  isActive: boolean;
  isVolunteer: boolean;
}
