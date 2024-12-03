export interface IUser {
  name: string;
  refugee: string;
  password: string;
  email: string;
  created_at?: Date;
  role: "user" | "refugee" | "admin";
  isActive: boolean;
  isVolunteer: boolean;
}
