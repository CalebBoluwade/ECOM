"use server";

import { cache } from "react";
import dbConnector from "../db/connector";
import Order from "../db/models/Order";

export const ListOrders = cache(
  async (
    filter: Partial<IOrder> = {}
    // limit?: number
  ): Promise<IOrder[]> => {
    await dbConnector();

    const orders = await Order.find(filter).sort({ _id: -1 }).lean();
    // ?.limit(limit!);

    return orders.map((order) => ({
      _id: order.id.toString(),
      totalPrice: order.totalPrice,
      paymentMethod: order.paymentMethod,
      paidAt: order.paidAt,
      paymentResult: order.paymentResult,
      cartItems: order.cartItems,
      VATPrice: order.VATPrice,
      isDelivered: order.isDelivered,
      deliveredAt: order.deliveredAt,
      isPaid: order.isPaid,
    }));
  }
);
