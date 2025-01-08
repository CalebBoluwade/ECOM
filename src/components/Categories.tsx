"use client";

import React from "react";
import Products from "./Product/Products";
import { ChevronRight } from "lucide-react";
import { RootState } from "@/lib/store/store";
import { connect } from "react-redux";
import { capitalizeFirstLetter } from "@/lib/utils";

const Categories = ({
  categoryTitle,
  displayAllProducts,
  products,
}: {
  categoryTitle: string;
  displayAllProducts: boolean;
  products: IProduct[];
}) => {
  const filterCategories = categoryTitle.split(",");
  const filteredProducts = products.filter((product) =>
    filterCategories.some((category) => {
      // console.log(product.categories, category, filterCategories);
      return product.categories.includes(category);
    })
  );

  // console.log(categoryTitle, filterCategories, filteredProducts);

  return (filteredProducts ?? []).length >= 1 ? (
    <section className="w-full my-1 py-2">
      <header>
        <h2 className="font-bold text-lime-400 text-3xl">
          {capitalizeFirstLetter(categoryTitle)}
        </h2>
      </header>

      <div className="mt-8 block lg:hidden">
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-lime-600"
          onClick={() => {}}
        >
          <span className="text-sm font-medium"> Filters & Sorting </span>

          <ChevronRight strokeWidth={0.5} />
        </button>
      </div>

      <Products
        products={filteredProducts ?? []}
        displayAllProducts={displayAllProducts}
        displayItems={5}
      />
    </section>
  ) : (
    <span></span>
  );
};

const mapStateToProps = (state: RootState) => ({
  products: state.products.allProducts,
});

export default connect(mapStateToProps)(Categories);
