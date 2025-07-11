"use server";

import { cache } from "react";
import dbConnector from "../db/connector";
import Brand from "../db/models/Brand";
import seedBrands from "../utils/brands";
import Product from "../db/models/Product";
import mongoose from "mongoose";

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

export const ListBrandProducts = cache(
  async (
    manufacturerId: string
    // filter: Partial<IProduct> = {}
    // limit?: number
  ): Promise<IProduct[]> => {
    await dbConnector();

    console.log(manufacturerId)

    // Build query
    const query = {
      manufacturerId: new mongoose.Types.ObjectId(manufacturerId),
    };

    const products = await Product.find(query)
      // .filter((product) => product.manufacturer.slug === manufacturer.slug.toLowerCase())
      .sort({ _id: -1 })
      // .limit(3)
      .exec();

    return products.map((product) => ({
      name: product.name,
      price: product.price,
      currency: product.currency,
      discountPercentage: product.discountPercentage,
      cartQuantity: product.cartQuantity,
      images: product.images,
      quantity: product.quantity,
      description: product.description,
      categories: product.categories,
      manufacturer: product.manufacturer.toString(),
      isFeatured: product.isFeatured,
      warranty: product.warranty,
      specifications: product.specifications,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reviews: product.reviews.map((r: any) => ({
        user: String(r.user),
        rating: r.rating,
        reviews: r.reviews,
      })),
      slug: product.slug, // Convert ObjectId to string
    })) as IProduct[];
  }
);
