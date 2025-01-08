import { HeartOutlined } from "@ant-design/icons";
// import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import ProductImageGallery from "./ImageGallery";
import {
  calculateItemPrice,
  capitalizeFirstLetter,
  formatPrice,
} from "@/lib/utils";
import { Tabs } from "antd";
import { useStaticFunctions } from "@/src/hooks/antd";
import { Barcode, UserCircle } from "lucide-react";
import {
  addItem,
  addToWishlist,
  removeFromWishlist,
} from "@/lib/store/slices/cartSlice";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "@/lib/store/store";
import { Rating } from "@fluentui/react-rating";

interface ProductItemProps
  extends Omit<DispatchProps, "removeFromCart" | "deleteItemFromCart"> {
  product: IProduct;
  wishlist: IProduct[];
}

const ProductCard: React.FC<ProductItemProps> = ({
  product,
  addToCart,
  addToWishlist,
  removeFromWishlist,
  wishlist,
}) => {
  const { message } = useStaticFunctions();
  const [productQuantity, setProductQuantity] = useState(1);
  const [addedToWishlist, setAddedToWishlist] = useState(false);

  useEffect(() => {
    setAddedToWishlist(
      wishlist.find((w) => w.slug === product.slug) ? true : false
    );
  }, [wishlist, product]);

  const onChange = (key: string) => {
    console.log(`Selected tab: ${key}`);
  };

  return product ? (
    <div
      key={product.slug}
      className="m-2 group relative space-y-3 block"
    >
      <button
        type="button"
        onClick={() => {
          if (addedToWishlist) {
            removeFromWishlist(product);
            message.warning("Removed from Wishlist");
          } else {
            addToWishlist(product);
            message.success("Added to Wishlist");
          }

          setAddedToWishlist(!addedToWishlist);
        }}
        className={`absolute w-8 right-3 top-3 z-10 rounded-full p-1 text-gray-900 transition hover:text-red-900/75 ${
          addedToWishlist ? "bg-red-900/75" : ""
        }`}
      >
        <span className="sr-only">Wishlist</span>

        <HeartOutlined size={16} />
      </button>

      <div className="flex flex-col gap-3 space-y-3 md:flex-row max-md:rounded-t-md rounded-md border border-gray-100">
        <ProductImageGallery images={product.images} />

        <div className="lg:w-1/2 relative p-6">
          <h3 className="mt-1.5 text-2xl font-lg text-gray-900">
            {capitalizeFirstLetter(product.name)}
          </h3>

          {product.discountPercentage ? (
            <sub className="bg-lime-700 text-white p-2 rounded-sm">
              {product.discountPercentage}% Off
            </sub>
          ) : null}

          <Rating
            // value={product.reviews}
            // onClick={(e) => console.log(e)}
            className="mt-2"
            color="marigold"
            onRateChange={(e) => console.log(e)}
          />

          <div className="border flex items-center rounded gap-5 mt-4 p-3">
            <Barcode size={21} strokeWidth={1.5} />

            <div>
              <h4>Product Warranty</h4>

              <p className="mt-1.5 line-clamp-3 text-gray-700">
                {product.warranty}
              </p>
            </div>
          </div>

          <form className="mt-4 flex flex-col gap-4">
            <label htmlFor="itemQuantity" className="flex items-center gap-2">
              <p className="mt-1.5 text-lg text-gray-700">
                {formatPrice(
                  calculateItemPrice(
                    product.price * productQuantity,
                    product.discountPercentage
                  ),
                  product.currency
                )}

                {/* {formatPrice(
              calculateItemPrice(product.price, product.discountPercentage),
              product.currency
            )} */}

                <span>
                  {product.discountPercentage ? (
                    <span className="text-gray-400 text-sm ml-2 line-through">
                      {formatPrice(product.price, product.currency)}
                    </span>
                  ) : null}
                </span>
              </p>

              <input
                type="number"
                id="itemQuantity"
                placeholder="Quantity"
                value={productQuantity}
                onChange={(e) => setProductQuantity(Number(e.target.value))}
                className="w-28 rounded-md border-gray-200 shadow-sm sm:text-sm"
              />

<p className="text-neutral-600">
            {product.quantity < 3
              ? product.quantity === 0
                ? "Out of Stock"
                : "Low Stock"
              : "In Stock"}
          </p>

            </label>

            <button
              type="button"
              className="block w-full rounded bg-gray-200 px-4 py-3 text-sm font-medium transition hover:scale-105"
              title="addToCart"
              onClick={() => {
                addToCart({ product: product, cartQuantity: productQuantity });
                message.success("Added to Cart!");
              }}
            >
              Add to Cart
            </button>

            <button
              type="button"
              className="block w-full rounded bg-lime-700 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
            >
              Buy Now
            </button>
          </form>
        </div>
      </div>

      <Tabs
        className="mt-5"
        defaultActiveKey="1"
        onChange={(key) => onChange(key)}
        items={[
          {
            key: "1",
            label: "Product Description",
            children: (
              <p className="mt-1.5 line-clamp-3 text-gray-700">
                Description: {product.description}
                <br />
                Manufacturer: {capitalizeFirstLetter(product.manufacturer.name)}
              </p>
            ),
          },
          {
            key: "2",
            label: "Specification",
            children: <>Content of Tab 2</>,
          },
          {
            key: "3",
            label: "Reviews",
            children: (
              <>
                {product.reviews.map((prodReview, _) => (
                  <div key={_} className="p-4 flex items-center gap-4 my-3">
                    <UserCircle />

                    <span>
                      <Rating
                        value={prodReview.rating}
                        color="marigold"
                        onRateChange={(e) => console.log(e)}
                      />

                      <p className="">{prodReview.reviews}</p>
                    </span>
                  </div>
                ))}
              </>
            ),
          },
        ]}
        // onChange={onChange}
      />
    </div>
  ) : (<>Coming Soon</>);
};

const mapStateToProps = (state: RootState) => ({
  product: state.products.productInView,
  wishlist: state.cart.wishlist,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addToCart: (product: IAddToCart) =>
    dispatch(
      addItem({ product: product.product, cartQuantity: product.cartQuantity })
    ),
  // removeFromCart: (product: IProduct) => dispatch(removeItem(product.slug)),
  addToWishlist: (product: IProduct) => dispatch(addToWishlist(product)),
  removeFromWishlist: (product: IProduct) =>
    dispatch(removeFromWishlist(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
