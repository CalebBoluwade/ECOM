"use client";

import { RootState } from "@/lib/store/store";
import {
  calculateSubtotal,
  formatPrice,
} from "@/lib/utils/index";
// import CartItem from "@/src/components/CartItem";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import WishlistItem from "./WishListItem";

const CartWishList = ({

  wishlist,
  cartTotal,
  currency,
}: {
  wishlist: IProduct[];
  cartTotal: number;
  currency: string;
}) => {
  console.log(wishlist);
  const [cartVAT] = useState<number>(
    Number(process.env.NEXT_PUBLIC_VAT!) || 0.75
  );
  const [VAT, setVAT] = useState<number>(0);

  useEffect(() => {
    setVAT(cartTotal * cartVAT);
  }, [cartTotal, cartVAT]);

  // const { state, setLoading, setData, setError } = useActionState<IProduct>();

  return (
    <div>
      <h2 className="mx-6 font-bold text-lime-600 mt-4 text-3xl">Your Wishlist</h2>

      <div className="relative mx-6 my-5 flex flex-row max-md:flex-col max-md:space-y-5 gap-4 border border-gray-600 px-4 py-5">
        <div className="w-full md:w-3/4">
          {(wishlist ??= []).length >= 1 ? (
            (wishlist ??= []).map((wishlist) => (
              <WishlistItem key={wishlist.slug} cartItem={wishlist} />
            ))
          ) : (
            <div className="flex flex-col max-md:h-72 md:border-r max-md:border-b h-full space-y-5 items-center justify-center">
              <p>No Items in Wishlist</p>

              <Link
                href="/"
                className="inline-block text-sm --text-gray-500 underline underline-offset-4 transition text-lime-600"
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

            <dl className="space-y-5 text-base --text-gray-700">
              <div className="flex justify-between items-center">
                <dt>Subtotal</dt>
                <dd>{formatPrice(cartTotal, currency)}</dd>
              </div>

              <div className="flex justify-between items-center">
                <dt>VAT ({cartVAT * 100}%)</dt>
                <dd>{formatPrice(VAT, currency)}</dd>
              </div>

              <div className="flex justify-between items-center !text-base font-medium">
                <dt>Total</dt>
                <dd>{formatPrice(calculateSubtotal(wishlist, VAT), currency)}</dd>
              </div>
            </dl>
          </section>

          <div className="flex justify-around items-center mt-5">
            <Link
              href="/"
              className="inline-block text-sm --text-gray-500 underline underline-offset-4 transition text-lime-600"
            >
              Continue shopping
            </Link>
{/*
            <button
              type="button"
              disabled={cart.length < 1}
              onClick={() => router.push("cart/checkout")}
              className="block rounded border-gray-700 border px-5 py-3 text-sm text-black --text-gray-100 transition disabled:cursor-not-allowed --hover:bg-gray-600"
            >
              Checkout
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  cartTotal: state.cart.totalPrice,
  currency: state.cart.items.at(0)?.currency ?? "NGN",
  wishlist: state.cart.wishlist,
});

export default connect(mapStateToProps, {})(CartWishList);
