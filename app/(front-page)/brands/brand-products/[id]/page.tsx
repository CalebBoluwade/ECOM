"use client";

import { fetchBrandProducts } from "@/lib/store/actions/Brands";
import { RootState, useAppDispatch } from "@/lib/store/store";
import Products from "@/src/components/Product/Products";
import { notFound } from "next/navigation";
import React, { Usable, useEffect } from "react";
import { connect } from "react-redux";

function BrandProducts({
  params,
  products,
}: {
  params: Usable<{ id: string }>;
  products: IProduct[];
}) {
  const dispatch = useAppDispatch();
  const { id } = React.use(params);

  console.log(id)

  const decodedString = decodeURIComponent(id).replace(/[^a-zA-Z0-9=&]/g, "");

  if (!decodedString) {
    notFound();
  }

  useEffect(() => {
    dispatch(fetchBrandProducts(decodedString));
  }, [dispatch, decodedString]);

  return <Products products={products} displayAllProducts />;
}

const mapStateToProps = (state: RootState) => ({
  products: state.products.filteredProducts,
});

export default connect(mapStateToProps, {})(BrandProducts);
