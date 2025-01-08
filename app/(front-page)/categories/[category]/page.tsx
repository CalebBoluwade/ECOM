import Categories from "@/src/components/Categories";
import React, { Suspense } from "react";

export default async function CategoryByIdPage({
  params = { category: "Tech" },
}: {
  params: { category: string };
}) {
  const { category } = params;
  const decodedString = decodeURIComponent(category).replace(
    /[^a-zA-Z0-9=&]/g,
    ""
  );

  return (
    <Suspense>
      <div className="p-5">
        <Categories categoryTitle={decodedString} displayAllProducts />
      </div>
    </Suspense>
  );
}
