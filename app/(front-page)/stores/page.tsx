"use client";

import dynamic from "next/dynamic";

import React from "react";

const StoreLocator = dynamic(() => import("@/src/components/StoreLocator"), {
  ssr: false,
});

export default function Product() {
  return <StoreLocator />;
}
