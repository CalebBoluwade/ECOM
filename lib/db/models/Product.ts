import mongoose, { Document, Model } from "mongoose";

export interface IProductDocument extends IProduct, Document {}

const ProductSchema = new mongoose.Schema<IProductDocument>(
  {
    name: { type: String, required: true },
    categories: [{ type: String, required: true }],
    images: [{ type: String, required: true }],
    price: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 0 },
    cartQuantity: { type: Number, required: true, default: 1 },
    manufacturer: {
      name: { type: String, required: true },
      image: { type: String, required: false },
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        reviews: { type: String, required: true },
      },
    ],
    isFeatured: { type: Boolean, required: true, default: false },
    specifications: [{ type: String, required: true }],
    warranty: { type: String, required: true },
    description: { type: String, required: true },
    currency: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProductDocument> =
  mongoose.models.Product ||
  mongoose.model<IProductDocument>("Product", ProductSchema);

export default Product;
