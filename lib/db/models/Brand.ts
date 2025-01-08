import mongoose, { Document, Model } from "mongoose";

export interface IBrandDocument extends IBrand, Document {}

const ProductSchema = new mongoose.Schema<IBrandDocument>(
  {
    name: { type: String, required: true, unique: true },
    // categories: [{ type: String, required: true }],
    image: { type: String, required: true },
    slug: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Brand: Model<IBrandDocument> =
  mongoose.models.Brand ||
  mongoose.model<IBrandDocument>("Brand", ProductSchema);

export default Brand;
