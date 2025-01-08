import mongoose, { Document, Model } from "mongoose";

interface IStoreDocument extends IStore, Document {}

const StoreSchema = new mongoose.Schema<IStoreDocument>(
  {
    name: String,
    address: { type: String, unique: true },
    city: String,
    phone: String,
    hours: String,
    longitude: Number,
    latitude: Number,
  },
  { timestamps: true }
);

const Store: Model<IStoreDocument> =
  mongoose.models.User || mongoose.model<IStoreDocument>("User", StoreSchema);

export default Store;
