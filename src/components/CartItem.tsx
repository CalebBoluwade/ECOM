import { addItem, deleteItem, removeItem } from "@/lib/store/slices/cartSlice";
import { RootState } from "@/lib/store/store";
import Image from "next/image";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { useStaticFunctions } from "../hooks/antd";
import { calculateItemPrice, capitalizeFirstLetter, formatPrice } from "@/lib/utils";
import { Trash2 } from "lucide-react";

interface CartItemProps
  extends Pick<
    DispatchProps,
    "addToCart" | "removeFromCart" | "deleteItemFromCart"
  > {
  cartItem: IProduct;
}

const CartItem: React.FC<CartItemProps> = ({
  cartItem,
  addToCart,
  removeFromCart,
  deleteItemFromCart,
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

        <h3 className="text-sm my-1 text-gray-900">{capitalizeFirstLetter(cartItem.name)}</h3>

        <dl className="mt-0.5 space-y-px text-[12px] text-gray-600">
          <div>
            <dt className="inline">Quantity Available:</dt>
            <dd className="inline">{cartItem.quantity}</dd>
          </div>

          <div>
            <dt className="inline">Manufacturer:</dt>
            <dd className="inline">{cartItem.manufacturer.name}</dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
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

        <form>
          <label htmlFor="Line1Qty" className="sr-only">
            Quantity
          </label>

          <input
            type="number"
            min={1}
            value={cartItem.cartQuantity}
            id="Line1Qty"
            onChange={(e) => {
              console.log(Number(e.target.value), cartItem.cartQuantity);
              if (Number(e.target.value) > cartItem.quantity) {
                message.error("Maximum No of Product In Stock!");
              } else if (Number(e.target.value) > cartItem.cartQuantity) {
                addToCart({
                  product: cartItem,
                  cartQuantity: 1,
                });
              } else if (Number(e.target.value) >= 0) {
                console.log(Number(e.target.value));
                removeFromCart(cartItem);
              } else {
                console.log("jjjjj");
              }
            }}
            className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          />
        </form>

        <button
          type="button"
          className="text-gray-600 transition hover:text-red-600"
          onClick={() => deleteItemFromCart(cartItem)}
        >
          <span className="sr-only">Remove item</span>

          <Trash2 size={16} />
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
  removeFromCart: (product: IProduct) => dispatch(removeItem(product.slug)),
  deleteItemFromCart: (product: IProduct) => dispatch(deleteItem(product.slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
