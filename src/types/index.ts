import { Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  role: string;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

interface IImageType {
  small: string;
  medium: string;
  large: string;
}

interface ITrendingType extends Omit<IImageType, "medium"> {}

interface IEntertainment extends Document {
  title: string;
  thumbnail: {
    trending?: ITrendingType;
    regular: IImageType;
  };
  year: number;
  category: "Movie" | "TV Series";
  rating: "PG" | "E" | "18+";
  isBookmarked: boolean;
  isTrending: boolean;
}

export type { IUser, IEntertainment, IImageType, ITrendingType };
