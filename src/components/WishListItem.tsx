import {
  addItem,
  removeFromWishlist,
  // addToWishlist,
  // deleteItem,
  // removeItem,
} from "@/lib/store/slices/cartSlice";
import { RootState } from "@/lib/store/store";
import Image from "next/image";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { useStaticFunctions } from "../hooks/antd";
import {
  calculateItemPrice,
  capitalizeFirstLetter,
  formatPrice,
} from "@/lib/utils/index";
import { Trash2 } from "lucide-react";

interface CartItemProps
  extends Pick<
    DispatchProps,
    "addToCart" | "removeFromWishlist"
  > {
  cartItem: IProduct;
}

const WishListItem: React.FC<CartItemProps> = ({
  cartItem,
  addToCart,
  removeFromWishlist,
}) => {
  const { message } = useStaticFunctions();
  return (
    <li key={cartItem.slug} className="flex items-center gap-4 p-3 border-b">
      <Image
        src={cartItem.images[0]}
        width={125}
        height={125}
        alt="cartItemImage"
        className="size-24 rounded object-fit"
      />

      <div>
        {cartItem.discountPercentage ? (
          <span className="bg-lime-700 text-white space-y-1 px-2 py-1 rounded-md">
            {cartItem.discountPercentage}% Off
          </span>
        ) : null}

        <h3 className="text-sm my-1 text-gray-900">
          {capitalizeFirstLetter(cartItem.name)}
        </h3>

        <dl className="mt-0.5 space-y-px text-[12px] text-gray-600">
          <div>
            <dt className="inline">Quantity Available:</dt>
            <dd className="inline">{cartItem.quantity}</dd>
          </div>

          <div>
            <dt className="inline">Manufacturer:</dt>
            <dd className="inline">
              {capitalizeFirstLetter(cartItem.manufacturer)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-1 max-md:flex-col items-center justify-end gap-2">
        {cartItem.discountPercentage ? (
          <p className="text-gray-400 line-through">
            {formatPrice(cartItem.price, cartItem.currency)}
          </p>
        ) : null}

        <div className="text-gray-900 text-right inline-flex flex-col gap-1">
          <p>
            {formatPrice(
              calculateItemPrice(cartItem.price, cartItem.discountPercentage),
              cartItem.currency
            )}
          </p>

          <p>
            {formatPrice(
              calculateItemPrice(cartItem.price, cartItem.discountPercentage) *
                cartItem.cartQuantity,
              cartItem.currency
            )}
          </p>
        </div>

        <button
          type="button"
          className="text-gray-600 transition hover:text-red-600"
          onClick={() => removeFromWishlist(cartItem)}
        >
          <span className="sr-only">Remove item</span>

          <Trash2 size={16} />
        </button>

        <button
          type="button"
          className="block w-48 rounded bg-lime-600 px-4 py-3 text-sm font-medium transition hover:scale-105"
          title="addToCart"
          onClick={() => {
            addToCart({
              product: cartItem,
              cartQuantity: 1,
            });

            message.success("Added to Cart!");
          }}
        >
          Add to Cart
        </button>
      </div>
    </li>
  );
};

const mapStateToProps = (state: RootState) => ({
  cartItems: state.cart.items,
  totalPrice: state.cart.totalPrice,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addToCart: (product: IAddToCart) =>
    dispatch(
      addItem({ product: product.product, cartQuantity: product.cartQuantity })
    ),
  removeFromWishlist: (product: IProduct) => dispatch(removeFromWishlist(product)),
  deleteItemFromWishlist: (product: IProduct) => dispatch(removeFromWishlist(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WishListItem);
