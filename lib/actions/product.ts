/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cache } from "react";
import products from "../utils/products";
import { v4 as uuidv4 } from "uuid";
import dbConnector from "../db/connector";



// Helper function to parse product data
function parseProduct(product: any): IProduct {
  return {
    ...product,
    images: JSON.parse(product.images),
    categories: JSON.parse(product.categories),
    specifications: JSON.parse(product.specifications),
    reviews: JSON.parse(product.reviews),
    isFeatured: Boolean(product.isFeatured),
    slug: product.id,
    createdAt: new Date(product.createdAt * 1000),
    updatedAt: new Date(product.updatedAt * 1000),
  };
}

export async function seedProductData() {
  const db = await dbConnector();
  const insert = await db.prepare(`
    INSERT INTO products (
      id, name, price, currency, discountPercentage, cartQuantity,
      images, quantity, description, categories, manufacturer,
      isFeatured, specifications, warranty, reviews, createdAt, updatedAt
    ) VALUES (
      @id, @name, @price, @currency, @discountPercentage, @cartQuantity,
      @images, @quantity, @description, @categories, @manufacturer,
      @isFeatured, @specifications, @warranty, @reviews, @createdAt, @updatedAt
    )
  `);

  const transaction = await db.transaction(async () => {
    // Clear existing data
    (await db.prepare("DELETE FROM products")).run();

    // Insert new products
    const now = Math.floor(Date.now() / 1000);
    for (const product of products) {
      insert.run({
        id: uuidv4(),
        name: product.name,
        price: product.price,
        currency: product.currency,
        discountPercentage: product.discountPercentage,
        cartQuantity: product.cartQuantity,
        images: JSON.stringify(product.images),
        quantity: product.quantity,
        description: product.description,
        categories: JSON.stringify(product.categories),
        manufacturer: product.manufacturer,
        isFeatured: product.isFeatured ? 1 : 0,
        specifications: JSON.stringify(product.specifications),
        warranty: product.warranty,
        reviews: JSON.stringify(product.reviews),
        createdAt: now,
        updatedAt: now,
      });
    }
  });

  transaction();

  // Return all products
  const stmt = await db.prepare("SELECT * FROM products");
  return (await stmt.all()).map(parseProduct);
}

export const getProductById = cache(async (productId: string) => {
  const db = await dbConnector();
  const stmt = await db.prepare("SELECT * FROM products WHERE id = ?");
  const product = await stmt.get(productId);
  return product ? parseProduct(product) : null;
});

export const listFeaturedProducts = cache(
  async (filter: Partial<IProduct> = {}): Promise<IProduct[]> => {
    const db = await dbConnector();

    let query = "SELECT * FROM products WHERE isFeatured = 1";
    const params: any[] = [];

    if (filter.manufacturer) {
      query += " AND manufacturer = ?";
      params.push(filter.manufacturer);
    }

    query += " ORDER BY createdAt DESC LIMIT 3";

    const stmt = await db.prepare(query);
    return (await stmt.all(...params)).map(parseProduct);
  }
);

export const ListProducts = cache(
  async (filter: Partial<IProduct> = {}): Promise<IProduct[]> => {
    const db = await dbConnector();

    let query = "SELECT * FROM products";
    const conditions: string[] = [];
    const params: any[] = [];

    for (const [key, value] of Object.entries(filter)) {
      if (value !== undefined) {
        if (key === "categories") {
          // Special handling for categories array search
          conditions.push("categories LIKE ?");
          params.push(`%"${value.toString()}"%`);
        } else {
          conditions.push(`${key} = ?`);
          params.push(value);
        }
      }
    }

    if (conditions.length) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY createdAt DESC";

    const stmt = await db.prepare(query);
    return (await stmt.all(...params)).map(parseProduct);
  }
);

export async function CreateProduct(p: IProduct): Promise<IProduct> {
  const db = await dbConnector();
  const id = uuidv4();
  const now = Math.floor(Date.now() / 1000);

  const stmt = await db.prepare(`
    INSERT INTO products (
      id, name, price, currency, discountPercentage, cartQuantity,
      images, quantity, description, categories, manufacturer,
      isFeatured, specifications, warranty, reviews, createdAt, updatedAt
    ) VALUES (
      @id, @name, @price, @currency, @discountPercentage, @cartQuantity,
      @images, @quantity, @description, @categories, @manufacturer,
      @isFeatured, @specifications, @warranty, @reviews, @createdAt, @updatedAt
    )
  `);

  await stmt.run({
    id,
    name: p.name,
    price: p.price,
    currency: p.currency,
    discountPercentage: p.discountPercentage,
    cartQuantity: p.cartQuantity,
    images: JSON.stringify(p.images),
    quantity: p.quantity,
    description: p.description,
    categories: JSON.stringify(p.categories),
    manufacturer: p.manufacturer,
    isFeatured: p.isFeatured ? 1 : 0,
    specifications: JSON.stringify(p.specifications),
    warranty: p.warranty,
    reviews: JSON.stringify(p.reviews),
    createdAt: now,
    updatedAt: now,
  });

  return {
    ...p,
    id,
    slug: id,
    createdAt: new Date(now * 1000),
    updatedAt: new Date(now * 1000),
  } as IProduct;
}

export const EditProduct = async (product: IProduct) => {
  try {
    const db = await dbConnector();
    const now = Math.floor(Date.now() / 1000);

    const stmt = await db.prepare(`
      UPDATE products SET
        name = @name,
        price = @price,
        currency = @currency,
        discountPercentage = @discountPercentage,
        cartQuantity = @cartQuantity,
        images = @images,
        quantity = @quantity,
        description = @description,
        categories = @categories,
        manufacturer = @manufacturer,
        isFeatured = @isFeatured,
        specifications = @specifications,
        warranty = @warranty,
        reviews = @reviews,
        updatedAt = @updatedAt
      WHERE id = @id
    `);

    const result = await stmt.run({
      id: product.slug,
      name: product.name,
      price: product.price,
      currency: product.currency,
      discountPercentage: product.discountPercentage,
      cartQuantity: product.cartQuantity,
      images: JSON.stringify(product.images),
      quantity: product.quantity,
      description: product.description,
      categories: JSON.stringify(product.categories),
      manufacturer: product.manufacturer,
      isFeatured: product.isFeatured ? 1 : 0,
      specifications: JSON.stringify(product.specifications),
      warranty: product.warranty,
      reviews: JSON.stringify(product.reviews),
      updatedAt: now,
    });

    return {
      success: result.changes! > 0,
      message: result.changes! > 0 ? "successful" : "no changes made",
    };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "unknown error!" };
  }
};

export const DeleteProduct = async (slug: string) => {
  const db = await dbConnector();
  const stmt = await db.prepare("DELETE FROM products WHERE id = ?");
  const result = await stmt.run(slug);
  return result.changes! > 0;
};

export const FilterProduct = async (lowerPrice: number, upperPrice: number) => {
  const db = await dbConnector();
  const stmt = await db.prepare(`
    SELECT * FROM products
    WHERE price BETWEEN ? AND ?
    ORDER BY price
  `);
  const results = await stmt.all(lowerPrice, upperPrice);
  console.debug(results);
  return results.map(parseProduct);
};

export const searchProducts = async ({
  searchTerm = "",
  category = "",
  minPrice = 0,
  maxPrice = Infinity,
  inStock,
  page = 1,
  limit = 10,
}: {
  searchTerm: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  inStock: boolean;
  page: number;
  limit: number;
}) => {
  const db = await dbConnector();

  let query = `
    SELECT * FROM products
    WHERE (name LIKE @searchTerm OR description LIKE @searchTerm)
    AND price >= @minPrice
  `;

  const params: any = {
    searchTerm: `%${searchTerm}%`,
    minPrice,
  };

  if (maxPrice !== Infinity) {
    query += " AND price <= @maxPrice";
    params.maxPrice = maxPrice;
  }

  if (category) {
    query += " AND categories LIKE @category";
    params.category = `%"${category}"%`;
  }

  if (typeof inStock === "boolean") {
    query += inStock ? " AND quantity > 0" : " AND quantity <= 0";
  }

  const offset = (page - 1) * limit;
  query += " ORDER BY createdAt DESC LIMIT @limit OFFSET @offset";
  params.limit = limit;
  params.offset = offset;

  const stmt = await db.prepare(query);
  return (await stmt.all(...params)).map(parseProduct);
};

export const DistinctCategories = async (): Promise<string[]> => {
  const db = await dbConnector();

  // Get all categories from all products
  const stmt = await db.prepare("SELECT categories FROM products");
  const allProducts = await stmt.all();

  // Extract and flatten all categories
  const categoriesSet = new Set<string>();
  for (const product of allProducts) {
    const categories = product.categories;
    categories.forEach((cat: string) => categoriesSet.add(cat));
  }

  // Convert to array and sort
  return Array.from(categoriesSet).sort((a, b) => a.localeCompare(b));
};
