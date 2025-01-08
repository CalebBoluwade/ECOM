"use server";

import { authConfigOptions } from "@/app/api/auth/[[...nextauth]]/options";
import { mailTransporter } from "@/src/nodemailer";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { type SendMailOptions } from "nodemailer";
import dbConnector from "../db/connector";
import Order from "../db/models/Order";

export default async function Checkout(
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
  },
  totalAmount: number,
  cart: IProduct[],
  VATPrice: number
) {
  try {
    const session = await getServerSession(authConfigOptions);

    if (!session?.user)
      return NextResponse.json({
        status: 401,
        statusText: "No Active Session",
      });

    await dbConnector();

    const newOrder = new Order({
      userId: formData.email,
      name: session.user.firstName + " " + session.user.lastName,
      cartItems: cart.flatMap((c) => ({ ...c, id: c.slug })),
      totalPrice: totalAmount,
      address: formData.address,
      paymentMethod: "CheckOut",
      paymentResult: { status: "Completed", email: formData.email },
      VATPrice,
    });
    await newOrder.save();

    const mailConfig: SendMailOptions = {
      to: session.user.email!,
      subject: "E - Commerce Store Checkout",
      html: "<b></b>",
      attachments: [{}],
    };

    mailTransporter.sendMail(mailConfig, (err, info) => {
      if (err) return console.error(err);

      console.log(info.response);
    });
  } catch (error) {
    const failedOrder = new Order({
      userId: formData.email,
      cartItems: cart,
      totalPrice: totalAmount,
      address: formData.address,
      paymentMethod: "CheckOut",
      paymentResult: {
        status: error instanceof Error ? error.message : "Unknown error",
        email: formData.email,
      },
      VATPrice,
    });
    await failedOrder.save();
  } finally {
  }
}
