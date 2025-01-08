import {
  DeleteProduct,
  DistinctCategories,
  getProductById,
  ListProducts,
} from "@/lib/actions/product";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ListProducts();

      if (!response) {
        throw new Error("Failed to fetch products");
      }

      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

export const fetchDistinctCategories = createAsyncThunk(
  "products/fetchDistinctCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await DistinctCategories();
      console.log(response);

      if (!response) {
        throw new Error("Failed to fetch categories");
      }

      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

export const fetchSingleProduct = createAsyncThunk<IProduct, string>(
  "products/fetchSingle",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await getProductById(slug);

      if (!response) {
        throw new Error(`Failed to fetch Product By Id: {slug}`);
      }

      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

export const deleteSingleProduct = createAsyncThunk<IProduct, string>(
  "products/fetchAll",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await DeleteProduct(slug);
      console.log(response);

      if (!response) {
        throw new Error("Failed to fetch users");
      }

      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);


