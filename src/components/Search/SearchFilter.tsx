"use client";

import Link from "next/link";
import React from "react";
import { connect } from "react-redux";
import { RootState } from "@/lib/store/store";
import { capitalizeFirstLetter } from "@/lib/utils/index";

const SearchFilter = ({
  // products,
  distinctCategories,
}: {
  products: IProduct[];
  distinctCategories: string[];
}) => {
  console.debug(distinctCategories);
  return (
    <div className="max-md:hidden --space-y-4 lg:block">
      <div className="my-3 w-[225px] max-lg:hidden h-auto divide-y divide-gray-200">
        {(distinctCategories ??= []).map((category, index) => (
          <div
            className={`hover:text-black/55 text-white transition-colors p-2 text-lg bg-lime-600 ${
              index === 0 ? "rounded-t-lg" : ""
            } ${index === distinctCategories.length - 1 ? "rounded-b-lg" : ""}`}
            key={index + 1}
          >
            <Link
            className="decoration-0"
              href={{
                pathname: `/categories/${category}`,
                // query: { category: category },
              }}
            >
              {capitalizeFirstLetter(category)}
            </Link>
          </div>
        ))}

        {distinctCategories.length > 5 && (
          <div>
            <Link
              href={"/categories/"}
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:text-lime-600"
            >
              More...
            </Link>
          </div>
        )}
      </div>
      {/*
      <div>
        <label
          htmlFor="SortBy"
          className="block text-xs font-medium text-gray-700"
        >
          Sort By
        </label>

        <select
          id="SortBy"
          className="mt-1 w-[225px]rounded border-gray-300 text-sm"
        >
          <option>Sort By</option>
          <option value="Title, DESC">Title, DESC</option>
          <option value="Title, ASC">Title, ASC</option>
          <option value="Price, DESC">Price, DESC</option>
          <option value="Price, ASC">Price, ASC</option>
        </select>
      </div> */}

      <div>
        <p className="block text-xs font-medium text-gray-700">Filters</p>

        <div className="mt-1 flex flex-wrap gap-4">
        <details className="overflow-hidden rounded border border-gray-300 flex-1">
        <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
              <span className="text-sm font-medium"> Availability </span>

              <span className="transition group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </summary>

            <div className="border-t border-gray-200 bg-white">
              <header className="flex items-center justify-between p-4">
                <span className="text-sm text-gray-700"> 0 Selected </span>

                <button
                  type="button"
                  className="text-sm text-gray-900 underline underline-offset-4"
                >
                  Reset
                </button>
              </header>

              <ul className="space-y-1 border-t border-gray-200 p-4">
                <li>
                  <label
                    htmlFor="FilterInStock"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterInStock"
                      className="size-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      In Stock (5+)
                    </span>
                  </label>
                </li>

                <li>
                  <label
                    htmlFor="FilterPreOrder"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterPreOrder"
                      className="size-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      Rating
                    </span>
                  </label>
                </li>

                <li>
                  <label
                    htmlFor="FilterOutOfStock"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterOutOfStock"
                      className="size-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      Out of Stock (10+)
                    </span>
                  </label>
                </li>
              </ul>
            </div>
          </details>

          <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
              <span className="text-sm font-medium"> Price </span>

              <span className="transition group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </summary>

            <div className="border-t border-gray-200 bg-white">
              <header className="flex items-center justify-between p-4">
                <span className="text-sm text-gray-700">
                  The highest price is $600
                </span>

                <button
                  type="button"
                  className="text-sm text-gray-900 underline underline-offset-4"
                >
                  Reset
                </button>
              </header>

              <div className="border-t border-gray-200 p-4">
                <div className="flex flex-col justify-between gap-4">
                  <label
                    htmlFor="FilterPriceFrom"
                    className="flex items-center gap-2"
                  >
                    <span className="text-sm text-gray-600">NGN</span>

                    <input
                      type="number"
                      id="FilterPriceFrom"
                      placeholder="From"
                      className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    />
                  </label>

                  <label
                    htmlFor="FilterPriceTo"
                    className="flex items-center gap-2"
                  >
                    <span className="text-sm text-gray-600">NGN</span>

                    <input
                      type="number"
                      id="FilterPriceTo"
                      placeholder="To"
                      className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    />
                  </label>
                </div>
              </div>
            </div>
          </details>

          <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
              <span className="text-sm font-medium"> Colors </span>

              <span className="transition group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </summary>

            <div className="border-t border-gray-200 bg-white">
              <header className="flex items-center justify-between p-4">
                <span className="text-sm text-gray-700"> 0 Selected </span>

                <button
                  type="button"
                  className="text-sm text-gray-900 underline underline-offset-4"
                >
                  Reset
                </button>
              </header>

              <ul className="space-y-1 border-t border-gray-200 p-4">
                <li>
                  <label
                    htmlFor="FilterRed"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterRed"
                      className="size-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      Red
                    </span>
                  </label>
                </li>

                <li>
                  <label
                    htmlFor="FilterBlue"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterBlue"
                      className="size-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      Blue
                    </span>
                  </label>
                </li>

                <li>
                  <label
                    htmlFor="FilterGreen"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterGreen"
                      className="size-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      Green
                    </span>
                  </label>
                </li>

                <li>
                  <label
                    htmlFor="FilterOrange"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterOrange"
                      className="size-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      Orange
                    </span>
                  </label>
                </li>

                <li>
                  <label
                    htmlFor="FilterPurple"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterPurple"
                      className="size-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      Purple
                    </span>
                  </label>
                </li>

                <li>
                  <label
                    htmlFor="FilterTeal"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterTeal"
                      className="size-5 rounded border-gray-300"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      Teal
                    </span>
                  </label>
                </li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  products: state.products.allProducts,
  distinctCategories: state.products.filters.categories,
});

export default connect(mapStateToProps, {})(SearchFilter);
