import { addItem, deleteItem, removeItem } from "@/lib/store/slices/cartSlice";
import { RootState } from "@/lib/store/store";
import Image from "next/image";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux"; 
import { calculateItemPrice, formatPrice } from "@/lib/utils";

interface CartItemProps
  extends Pick<
    DispatchProps,
    "addToCart" | "removeFromCart" | "deleteItemFromCart"
  > {
  checkOutItem: IProduct;
}

const CheckOutItem: React.FC<CartItemProps> = ({ checkOutItem }) => {
  return (
    <li key={checkOutItem.slug} className="flex items-center gap-4 p-3 border-b">
      <Image
        src={checkOutItem.images[0]}
        width={125}
        height={125}
        alt="checkOutItemImage"
        className="size-24 rounded object-fit"
      />

      <div>
        {checkOutItem.discountPercentage ? (
          <span className="bg-lime-700 space-y-1 p-1 rounded-md">
            {checkOutItem.discountPercentage}% Off
          </span>
        ) : null}

        <h3 className="text-sm my-1 text-gray-900">{checkOutItem.name}</h3>

        <dl className="mt-0.5 space-y-px text-[12px] text-gray-600">
          <div>
            <dt className="inline">Quantity Available:</dt>
            <dd className="inline">{checkOutItem.quantity}</dd>
          </div>

          <div>
            <dt className="inline">Manufacturer:</dt>
            <dd className="inline">{checkOutItem.manufacturer.name}</dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
        {checkOutItem.discountPercentage ? (
          <p className="text-gray-400 line-through">
            {formatPrice(checkOutItem.price, checkOutItem.currency)}
          </p>
        ) : null}

        <div className="text-gray-900 text-right inline-flex flex-col gap-1">
          <p>
            {formatPrice(
              calculateItemPrice(
                checkOutItem.price,
                checkOutItem.discountPercentage
              ),
              checkOutItem.currency
            )}
          </p>

          <p>
            {formatPrice(
              calculateItemPrice(
                checkOutItem.price,
                checkOutItem.discountPercentage
              ) * checkOutItem.cartQuantity,
              checkOutItem.currency
            )}
          </p>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutItem);
