import Image from "next/image";
import Link from "next/link";
import React from "react";
import { calculateItemPrice, capitalizeFirstLetter, formatPrice } from "../../../lib/utils";
import { Heart, ShoppingCart } from "lucide-react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  addItem,
  addToWishlist,
  removeFromWishlist,
} from "@/lib/store/slices/cartSlice";
import { useStaticFunctions } from "@/src/hooks/antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ProductProps
  extends Omit<DispatchProps, "removeFromCart" | "deleteItemFromCart"> {
  products: IProduct[];
  displayItems?: number;
  displayAllProducts: boolean;
}

const Products: React.FC<ProductProps> = ({
  products,
  displayItems,
  displayAllProducts,
  addToCart,
  addToWishlist,
}) => {
  const startIndex = 0;
  const endIndex = !displayAllProducts
    ? displayItems
      ? displayItems - 1
      : 5 - 1
    : products.length;

  const { message } = useStaticFunctions();
  const { data: session } = useSession();
  const router = useRouter();

  return (products ??= []).length >= 1 ? (
    <div
      className={`my-4 place-items-center gap-4 ${
        products.length <= 3
          ? "flex flex-wrap"
          : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
      }`}
    >
      {(products ?? []).slice(startIndex, endIndex).map((prd, _) => (
        <div
          key={_}
          className="--w-48 max-md:w-36 min-w-44 w-full max-w-48 relative shadow-2xl rounded-md border"
        >
          <Link href={"product/" + prd.slug}>
            <Image
              src={prd.images[0] ?? null}
              alt={prd.name + prd.slug}
              width={385}
              height={400}
              className="!w-48 max-md:w-36 !h-32 p-2 object-cover rounded-tl-md rounded-tr-md [image-rendering:_pixelated] transition duration-500 group-hover:scale-105"
            />
          </Link>

          <div className="h-24 w-full flex flex-col justify-between px-2 py-3 rounded-br-md rounded-bl-md">
            <h3 className="text-md text-center text-gray-700 group-hover:underline group-hover:underline-offset-4">
              {capitalizeFirstLetter(prd.name)}
            </h3>

            <div className="relative ml-2">
              <div className="mt-2 inline-flex text-center flex-col">
                {prd.discountPercentage ? (
                  <span className="text-gray-400 text-center line-through">
                    {formatPrice(prd.price, prd.currency)}
                  </span>
                ) : null}

                <p className="tracking-wider text-base text-gray-900">
                  {formatPrice(
                    calculateItemPrice(prd.price, prd.discountPercentage),
                    prd.currency
                  )}
                </p>
              </div>

              <button
                title="Add To Cart"
                onClick={() => {
                  addToCart({ product: prd, cartQuantity: 1 });
                  message.success("Added to Cart!");
                }}
                className="absolute right-1 bottom-1 text-lime-950 hover:text-lime-700"
                type="button"
              >
                <ShoppingCart size={21} strokeWidth={2} />
              </button>
            </div>

            <button
              title="Add To WishList"
              className={`absolute right-2 top-2 z-10 rounded-full hover:bg-white p-1 text-gray-900 transition hover:text-red-900/75 ${
                // addedToWishlist ? "bg-red-900/75" : ""
                true
              }`}
              type="button"
              onClick={() => {
                if (!session) {
                  router.push("/auth");
                  message.info("Please log in");
                  return;
                }

                message.success("Added to Wishlist!");
                addToWishlist(prd);
              }}
            >
              <Heart size={21} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="my-4 w-full flex flex-col h-72 --h-full text-gray-600/75">
      <p className="w-full">No Product to Display</p>

      {/* <Link
            href="/"
            className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
          >
            Continue shopping
          </Link> */}
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addToCart: (product: IAddToCart) =>
    dispatch(
      addItem({ product: product.product, cartQuantity: product.cartQuantity })
    ),
  addToWishlist: (product: IProduct) => dispatch(addToWishlist(product)),
  removeFromWishlist: (product: IProduct) =>
    dispatch(removeFromWishlist(product)),
});

export default connect(null, mapDispatchToProps)(Products);
