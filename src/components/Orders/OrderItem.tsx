import { RootState } from "@/lib/store/store";
import Image from "next/image";
import React from "react";
import { connect } from "react-redux";
// import { useStaticFunctions } from "../hooks/antd";
import {
  calculateItemPrice,
  capitalizeFirstLetter,
  formatPrice,
} from "@/lib/utils";

interface orderItemProps
  extends Pick<
    DispatchProps,
    "addToCart" | "removeFromWishlist"
  > {
  orderItem: IProduct;
}

const OrderItem: React.FC<orderItemProps> = ({
  orderItem,
}) => {
  // const { message } = useStaticFunctions();
  return (
    <li key={orderItem.slug} className="flex items-center gap-4 p-3 border-b">
      <Image
        src={orderItem.images[0]}
        width={125}
        height={125}
        alt="orderItemImage"
        className="size-24 rounded object-fit"
      />

      <div>
        {orderItem.discountPercentage ? (
          <span className="bg-lime-700 text-white space-y-1 px-2 py-1 rounded-md">
            {orderItem.discountPercentage}% Off
          </span>
        ) : null}

        <h3 className="text-sm my-1 text-gray-900">
          {capitalizeFirstLetter(orderItem.name)}
        </h3>

        <dl className="mt-0.5 space-y-px text-[12px] text-gray-600">
          <div>
            <dt className="inline">Quantity Available:</dt>
            <dd className="inline">{orderItem.quantity}</dd>
          </div>

          <div>
            <dt className="inline">Manufacturer:</dt>
            <dd className="inline">
              {capitalizeFirstLetter(orderItem.manufacturer.name)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-1 max-md:flex-col items-center justify-end gap-2">
        {orderItem.discountPercentage ? (
          <p className="text-gray-400 line-through">
            {formatPrice(orderItem.price, orderItem.currency)}
          </p>
        ) : null}

        <div className="text-gray-900 text-right inline-flex flex-col gap-1">
          <p>
            {formatPrice(
              calculateItemPrice(orderItem.price, orderItem.discountPercentage),
              orderItem.currency
            )}
          </p>

          <p>
            {formatPrice(
              calculateItemPrice(orderItem.price, orderItem.discountPercentage) *
                orderItem.cartQuantity,
              orderItem.currency
            )}
          </p>
        </div>

      </div>
    </li>
  );
};

const mapStateToProps = (state: RootState) => ({
  orderItems: state.cart.items,
});

export default connect(mapStateToProps, null)(OrderItem);
