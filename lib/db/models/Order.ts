import mongoose, { Document, Model } from "mongoose";

interface IOrderDocument extends IOrder, Document {}

const OrderSchema = new mongoose.Schema<IOrderDocument>(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    cartItems: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        // category: { type: String, required: true },
        image: [{ type: String, required: true }],
        price: { type: Number, required: true },
        discountPercentage: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 0 },
        cartQuantity: { type: Number, required: true, default: 1 },
        manufacturer: {
          name: { type: String, required: true },
          image: { type: String, required: false },
        },
      },
    ],
    paymentMethod: { type: String, required: true },
    paymentResult: {
      status: { type: String, default: "Pending" },
      email: { type: String, required: true },
    },
    VATPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    isDelivered: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);
const Order: Model<IOrderDocument> =
  mongoose.models.Order || mongoose.model<IOrderDocument>("Order", OrderSchema);

export default Order;
