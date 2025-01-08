"use server";

import { cache } from "react";
import dbConnector from "../db/connector";
import Product from "../db/models/Product";
import products from "../utils/products";
import mongoose from "mongoose";

// export const revalidate = 3600;

export async function seedProductData() {
  await dbConnector();

  const product = await Product.insertMany(products);

  return product.map((product) => ({
    name: product.name,
    price: product.price,
    currency: product.currency,
    discountPercentage: product.discountPercentage,
    cartQuantity: product.cartQuantity,
    images: product.images,
    quantity: product.quantity,
    description: product.description,
    categories: product.categories,
    manufacturer: {
      name: product.manufacturer.name,
      slug: "",
      image: product.manufacturer.image,
    },
    isFeatured: product.isFeatured,
    specifications: product.specifications,
    warranty: product.warranty,
    reviews: product.reviews,
    slug: product._id, // Convert ObjectId to string
  })) as IProduct[];
}

export const getProductById = cache(async (productId: string) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) return null;

  await dbConnector();

  const product = await Product.findOne({ _id: productId }).lean();

  if (!product) return null;

  return {
    name: product.name,
    price: product.price,
    currency: product.currency,
    discountPercentage: product.discountPercentage,
    cartQuantity: product.cartQuantity,
    images: product.images,
    quantity: product.quantity,
    description: product.description,
    categories: product.categories,
    manufacturer: {
      name: product.manufacturer.name,
      image: product.manufacturer.image,
    },
    isFeatured: product.isFeatured,
    warranty: product.warranty,
    reviews: product.reviews,
    slug: product._id.toString(), // Convert ObjectId to string
  } as IProduct;
});

export const listFeaturedProducts = cache(
  async (filter: Partial<IProduct> = {}): Promise<IProduct[]> => {
    await dbConnector();

    const products = await Product.find(filter)
      .sort({ _id: -1 })
      .limit(3)
      .lean();

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
      manufacturer: {
        name: product.manufacturer.name,
        image: product.manufacturer.image,
      },
      isFeatured: product.isFeatured,
      warranty: product.warranty,
      specifications: product.specifications,
      reviews: product.reviews.flatMap((r) => ({
        user: String(r.user),
        rating: r.rating,
        reviews: r.reviews,
      })),
      slug: product._id.toString(), // Convert ObjectId to string
    })) as IProduct[];
  }
);

export const ListProducts = cache(async (
  filter: Partial<IProduct> = {}
  // limit?: number
): Promise<IProduct[]> => {
  await dbConnector();

  const products = await Product.find(filter).sort({ _id: -1 }).lean();
  // ?.limit(limit!);

  return products.map((product) => ({
    _id: product._id.toString(),
    name: product.name,
    price: product.price,
    currency: product.currency,
    discountPercentage: product.discountPercentage,
    cartQuantity: product.cartQuantity,
    images: product.images,
    quantity: product.quantity,
    description: product.description,
    categories: product.categories,
    manufacturer: {
      name: product.manufacturer.name,
      image: product.manufacturer.image,
      slug: ""
    },
    isFeatured: product.isFeatured,
    warranty: product.warranty,
    specifications: product.specifications,
    reviews: product.reviews.flatMap((r) => ({
      user: String(r.user),
      rating: r.rating,
      reviews: r.reviews,
    })),
    slug: product._id.toString(), // Convert ObjectId to string
  }));
});

export async function CreateProduct(p: IProduct): Promise<IProduct> {
  const newProduct = new Product(p);

  const product = (await newProduct.save()).toJSON();

  return {
    name: product.name,
    price: product.price,
    currency: product.currency,
    discountPercentage: product.discountPercentage,
    cartQuantity: product.cartQuantity,
    images: product.images,
    quantity: product.quantity,
    description: product.description,
    categories: product.categories,
    manufacturer: {
      name: product.manufacturer.name,
      image: product.manufacturer.image,
    },
    specifications: product.specifications,
    isFeatured: product.isFeatured,
    warranty: product.warranty,
    reviews: product.reviews,
    slug: product._id.toString(), // Convert ObjectId to string
  } as IProduct;
}

export const EditProduct = async (product: IProduct) => {
  try {
    await Product.findByIdAndUpdate(product.slug, product, { new: true });

    return { success: true, message: "successful" };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    return { success: false, message: "unknown error!" };
  }
};

export const DeleteProduct = async (slug: string) =>
  await Product.findByIdAndDelete(slug);

export const FilterProduct = async (lowerPrice: number, upperPrice: number) => {
  const aggregation = await Product.aggregate([
    { $match: { price: { $gte: lowerPrice, $lte: upperPrice } } },
  ]);

  console.debug(aggregation);
};

export const DistinctCategories = async () => {
  const distinctCategoriesAggregation = await Product.aggregate<{
    _id: string;
  }>([
    { $unwind: "$categories" }, // Unwind the categories array
    { $group: { _id: "$categories" } }, // Group by category
    { $sort: { _id: 1 } }, // Optional: Sort alphabetically
  ]).exec();

  const distinctCategories = distinctCategoriesAggregation.map(
    (category) => category._id
  );

  return distinctCategories;
};
