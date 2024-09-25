import mongoose, { Schema } from "mongoose";
import { IEntertainment, IImageType, ITrendingType } from "types";

const imageTypeSchema = new Schema<IImageType>({
  small: { type: String, required: true },
  medium: { type: String, required: true },
  large: { type: String, required: true },
});

const trendingTypeSchema = new Schema<ITrendingType>({
  small: { type: String, required: true },
  large: { type: String, required: true },
});

const entertainmentSchema = new Schema<IEntertainment>({
  title: { type: String, required: true },
  thumbnail: {
    trending: trendingTypeSchema,
    regular: { type: imageTypeSchema, required: true },
  },
  year: { type: Number, required: true },
  category: { type: String, enum: ["Movie", "TV Series"], required: true },
  rating: { type: String, enum: ["PG", "E", "18+"], required: true },
  isBookmarked: { type: Boolean, required: true, default: false },
  isTrending: { type: Boolean, required: true, default: false },
});

const Entertainment = mongoose.model<IEntertainment>(
  "Entertainment",
  entertainmentSchema
);
export default Entertainment;
