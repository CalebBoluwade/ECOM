"use client";

import { fetchSingleProduct } from "@/lib/store/actions/Products";
import { useAppDispatch } from "@/lib/store/store";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import React, { Usable, useEffect } from "react";

const ProductCard = dynamic(
  () => import("@/src/components/Product/ProductCard"),
  { ssr: false }
);

// export async function generateMetadata({
//   params,
// }: {
//   params: Usable<{ id: string }>;
// }): Promise<Metadata> {
//   const product = products[0];

//   if (!product) return { title: "Product not found!" };

//   return {
//     title: product.name,
//     description: product.description,
//   };
// }

export default function ProductDetailsPage({
  params,
}: {
  params: Usable<{ id: string }>;
}) {
  const dispatch = useAppDispatch();
  const { id } = React.use(params);

  const decodedString = decodeURIComponent(id).replace(/[^a-zA-Z0-9=&]/g, '');

  if (!decodedString) {
    notFound();
  }

  useEffect(() => {
    dispatch(fetchSingleProduct(decodedString));
  }, [dispatch, decodedString]);

  return <ProductCard />;
}
