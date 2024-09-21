import { Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  role: string;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

export type { IUser };
