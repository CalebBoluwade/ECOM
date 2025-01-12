import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchDistinctCategories,
  fetchProducts,
  fetchSingleProduct,
} from "../actions/Products";
import { fetchBrandProducts, fetchBrands } from "../actions/Brands";

interface ProductState {
  allProducts: IProduct[];
  partnerBrands: IBrand[];
  productInView: IProduct;
  loading: boolean;
  filteredProducts: IProduct[];
  filters: {
    categories: string[];
    inStock: boolean;
  };
}

const initialState: ProductState = {
  allProducts: [],
  productInView: {
    name: "",
    cartQuantity: 1,
    categories: [],
    currency: "NGN",
    description: "",
    warranty: "",
    reviews: [],
    price: 0,
    discountPercentage: 0,
    isFeatured: false,
    quantity: 0,
    images: [],
    manufacturer: "",
    specifications: [],
    slug: "",
  },
  loading: false,
  partnerBrands: [],
  filteredProducts: [],
  filters: {
    categories: [],
    inStock: false,
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProductsToStore: (state, action: PayloadAction<IProduct[]>) => {
      state.allProducts.push(...action.payload);
    },
    setCategoryFilter(state, action: PayloadAction<string[]>) {
      state.filters.categories = action.payload;
      state.filteredProducts = state.allProducts.filter((product) =>
        action.payload ? product.categories === action.payload : true
      );
    },
    setStockFilter(state, action: PayloadAction<boolean>) {
      state.filters.inStock = action.payload;
      // state.filteredProducts = state.allProducts.filter((product) =>
      //   action.payload !== null ? product.inStock === action.payload : true
      // );
    },
    resetFilters(state) {
      state.filters = { categories: [], inStock: false };
      state.filteredProducts = [...state.allProducts];
    },
    initializeFilteredProducts(state) {
      state.filteredProducts = [...state.allProducts];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.partnerBrands = action.payload;
      })
      .addCase(fetchBrandProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchDistinctCategories.fulfilled, (state, action) => {
        state.filters.categories = action.payload.flatMap((x) =>
          x.toLowerCase().trim()
        );
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.productInView = action.payload;
      });
  },
});

export const {
  addProductsToStore,
  setCategoryFilter,
  setStockFilter,
  resetFilters,
  initializeFilteredProducts,
} = productSlice.actions;

export default productSlice.reducer;
