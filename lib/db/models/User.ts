import mongoose, { Document, Model } from "mongoose";

interface IUserDocument extends IUser, Document {}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    name: String,
    email: { type: String, unique: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User: Model<IUserDocument> =
  mongoose.model<IUserDocument>("User", userSchema) || mongoose.models.User<typeof userSchema>;

export default User;
