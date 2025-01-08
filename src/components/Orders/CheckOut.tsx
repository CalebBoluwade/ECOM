"use client";

import { RootState } from "@/lib/store/store";
import {
  calculateSubtotal,
  calculateTotalDiscount,
  formatPrice,
} from "@/lib/utils";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import CheckOutItem from "./CheckOutItem";
import { useRouter } from "next/navigation";
import { Info, MapPin, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Checkout from "@/lib/actions/checkout";
import { useStaticFunctions } from "@/src/hooks/antd";

const CheckOutFinal = ({
  cart,
  currency,
  cartTotal,
}: {
  cart: IProduct[];
  cartTotal: number;
  currency: string;
}) => {
  const router = useRouter();
  const [cartVAT] = useState<number>(
    Number(process.env.NEXT_PUBLIC_VAT!) || 0.75
  );
  const [VAT, setVAT] = useState<number>(0);
  const { status } = useSession();
  const { message } = useStaticFunctions();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status !== "authenticated") {
      message.error("User is not logged in");

      return;
    }
    // Implement checkout logic
    console.log("Checkout submitted", formData);

    try {
      const x = await Checkout(formData, cartTotal, cart, VAT);

      console.log(x);
      router.push("/cart/checkout/success");
    } catch (error) {
      console.debug(error);
      // router.push("/cart/checkout/failure");
    }
  };

  useEffect(() => {
    setVAT(cartTotal * cartVAT);
  }, [cartTotal, cartVAT]);
  return (
    <div>
      <h2 className="mx-6 font-bold text-gray-900 text-3xl">
        Check Out [Purchase Summary]
      </h2>

      <div className="relative mx-6 my-5 flex flex-row max-md:flex-col max-md:space-y-5 gap-4 border border-gray-600 px-4 py-5">
        <div className="w-full md:w-3/4">
          {(cart ??= []).length >= 1 ? (
            (cart ??= []).map((cartItem) => (
              <CheckOutItem key={cartItem.slug} checkOutItem={cartItem} />
            ))
          ) : (
            <div className="flex flex-col max-md:h-72 md:border-r max-md:border-b h-full space-y-5 items-center justify-center text-gray-100">
              <p>No Items To Check Out</p>

              <Link
                href="/"
                className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
              >
                Continue shopping
              </Link>
            </div>
          )}
        </div>
        {/* </div> */}

        <div className="relative w-full p-1 md:w-1/4 text-center">
          <section>
            <h2>Purchase Summary</h2>

            <dl className="space-y-5 text-base text-gray-700">
              <div className="flex justify-between items-center">
                <dt>Subtotal</dt>
                <dd>{formatPrice(calculateSubtotal(cart, VAT), currency)}</dd>
              </div>

              <div className="flex justify-between items-center text-sm">
                <dt>
                  Total Discount <p className="text-gray-400 text-xs">(Item)</p>
                </dt>
                <dd>-{calculateTotalDiscount(cart)}</dd>
              </div>

              <div className="flex justify-between items-center">
                <dt>VAT ({cartVAT * 100}%)</dt>
                <dd>{formatPrice(VAT, currency)}</dd>
              </div>

              <div className="flex justify-between items-center !text-base font-medium">
                <dt>Total</dt>
                <dd>{formatPrice(calculateSubtotal(cart, VAT), currency)}</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>

      <div className="relative mx-6 my-5 max-md:space-y-5 gap-4 border border-gray-600 px-4 py-5">
        <h2 className="inline-flex gap-2 items-center mx-6 font-bold text-gray-900 text-2xl">
          <User className="text-lime-600" />
          Account Information
        </h2>

        <form
          onSubmit={(fg) => handleSubmit(fg)}
          className="mt-4 px-6 space-y-6"
        >
          {/* Personal Information */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                  disabled={cart.length < 1}
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  disabled={cart.length < 1}
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                disabled={cart.length < 1}
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <MapPin className="mr-3 text-lime-600" />
              Shipping Address
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Street Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="Address"
                required
                disabled={cart.length < 1}
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  required
                  value={formData.city}
                  disabled={cart.length < 1}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <p className="inline-flex gap-2 items-center">
            <Info />
            Your personal data will be used strictly to process your order,
            support your experience throughout this website, and for other
            purposes described in our privacy policy.
          </p>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={cart.length < 1}
              className="w-full b rounded-md hover:bg-lime-700  duration-300 items-center justify-center block border-gray-700 border px-5 py-3 text-sm text-gray-100 transition disabled:cursor-not-allowed"
            >
              Complete Order
            </button>
          </div>
        </form>
      </div>

      {/* <div className="flex justify-around items-center mt-5">
        <button
          type="button"
          disabled={cart.length < 1}
          onClick={() => router.push("/checkout")}
          className="block rounded border-gray-700 border px-5 py-3 text-sm text-gray-100 transition disabled:cursor-not-allowed hover:bg-gray-600"
        >
          Complete Order
        </button>
      </div> */}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  currency: state.cart.items.at(0)?.currency || "NGN",
  cart: state.cart.items,
  cartTotal: state.cart.totalPrice,
});

export default connect(mapStateToProps, {})(CheckOutFinal);
