"use server";

import { cache } from "react";
import dbConnector from "../db/connector";
import Brand from "../db/models/Brand";
import seedBrands from "../utils/brands";

export async function seedBrandData() {
  try {
    await dbConnector();

    const brands = await Brand.insertMany(seedBrands);

    return brands.map((brand) => ({
      name: brand.name,
      image: brand.image,
      // description: product.description,
      slug: brand.id.toString(), // Convert ObjectId to string
    })) as IBrand[];
  } catch (error) {
    console.debug(error);
  }
}

export const ListBrands = cache(
  async (
    filter: Partial<IBrand> = {}
    // limit?: number
  ): Promise<IBrand[]> => {
    await dbConnector();

    const brands = await Brand.find(filter).sort({ name: 1 }).lean();
    // ?.limit(limit!);

    return brands.map((brand) => ({
      name: brand.name,
      image: brand.image,
      // description: product.description,
      slug: brand._id.toString(), // Convert ObjectId to string
    })) as IBrand[];
  }
);
