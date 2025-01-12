import { ListBrandProducts, ListBrands } from "@/lib/actions/brands";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBrands = createAsyncThunk(
  "brands/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ListBrands();

      if (!response) {
        throw new Error("Failed to fetch Brands");
      }

      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

export const fetchBrandProducts = createAsyncThunk<IProduct[], string>(
  "brands/fetchAllProducts",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await ListBrandProducts(slug);

      // console.log(response)
      if (!response) {
        throw new Error("Failed to fetch orders");
      }

      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);
