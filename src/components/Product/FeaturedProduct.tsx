"use client";

import { RootState } from "@/lib/store/store";
import { capitalizeFirstLetter, formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const FeaturedProduct = ({
  randomFeaturedProduct,
  products,
}: {
  randomFeaturedProduct: IProduct;
  products: IProduct[];
}) => {
  const adminSelectedProductId = "";
  const [featuredProduct, setFeaturedProduct] = useState<IProduct>(
    randomFeaturedProduct
  );

  useEffect(() => {
    if (adminSelectedProductId) {
      const selected = products.find(
        (product) => product.slug === adminSelectedProductId
      );

      setFeaturedProduct(selected!);
    }

  }, [products, randomFeaturedProduct, featuredProduct]);

  return (
    <section className="min-w-80 --w-full lg:max-h-80 lg:max-w-md relative md:mx-4 mb-4">
      {randomFeaturedProduct && (
        <>
          <Image
            src={(randomFeaturedProduct ? randomFeaturedProduct.images[0] : "")}
            alt={randomFeaturedProduct.name + randomFeaturedProduct.slug}
            width={850}
            height={200}
            className="!w-full ---!h-72 lg:max-h-80 object-cover rounded-md rounded-tr-md [image-rendering:_pixelated] transition duration-500 group-hover:scale-105"
            onError={() => "/fallbackImg.jpeg"}
          />

          <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-4 rounded-lg">
            <h5 className="text-sm text-lime-700 font-semibold">
              Featured Product
            </h5>
            <h2 className="text-2xl font-extrabold">{capitalizeFirstLetter(randomFeaturedProduct.name)}</h2>
            <p className="text-lg font-semibold mt-2">
              {formatPrice(
                randomFeaturedProduct.price,
                randomFeaturedProduct.currency
              )}
            </p>
            <Link
              href={"product/" + randomFeaturedProduct.slug}
              className="mt-4 px-6 py-3 bg-lime-600 hover:text-white rounded hover:bg-lime-700 transition"
            >
              Shop Now
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

const mapStateToProps = (state: RootState) => ({
  randomFeaturedProduct:
    state.products.allProducts[
      Math.floor(Math.random() * state.products.allProducts.length)
    ],
  products: state.products.allProducts,
});

export default connect(mapStateToProps, {})(FeaturedProduct);
