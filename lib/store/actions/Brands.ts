import { ListBrands } from "@/lib/actions/brands";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBrands = createAsyncThunk(
  "brands/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ListBrands();

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


