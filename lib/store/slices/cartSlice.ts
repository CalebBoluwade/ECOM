import { calculateItemPrice } from "@/lib/utils/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchOrders } from "../actions/Orders";

const initialState: CartState = {
  items: [],
  orders: [],
  wishlist: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ product: IProduct; cartQuantity: number }>
    ) => {
      const existingItem = state.items.find(
        (item) => item.slug === action.payload.product.slug
      );
      if (existingItem) {
        existingItem.cartQuantity += action.payload.cartQuantity;
      } else {
        const newCartItem = {
          ...action.payload.product,
          cartQuantity: action.payload.cartQuantity,
        };
        state.items.push(newCartItem);
      }
      // state.totalQuantity += action.payload.quantity;
      state.totalPrice += calculateItemPrice(
        action.payload.product.price,
        action.payload.product.discountPercentage
      );
    },

    removeItem: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (item) => item.slug === action.payload
      );

      if (!existingItem) return;

      existingItem.cartQuantity -= 1;

      state.totalPrice -= calculateItemPrice(
        existingItem.price,
        existingItem.discountPercentage
      );

      // console.log(
      //   calculateItemPrice(existingItem.price, existingItem.discountPercentage)
      // );
      // } else {
      //   const index = state.items.findIndex(
      //     (item) => item.slug === action.payload
      //   );

      //   if (index !== -1) {
      //     const item = state.items[index];

      //     state.totalPrice -=
      //       calculateItemPrice(item.price, item.discountPercentage);
      //     state.items.splice(index, 1);
      //   }
      // }
    },

    deleteItem: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (item) => item.slug === action.payload
      );

      if (!existingItem) return;

      const index = state.items.findIndex(
        (item) => item.slug === action.payload
      );

      state.items.splice(index, 1);
    },
    reduceItemQuality: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(
        (item) => item.slug === action.payload
      );
      if (index !== -1) {
        const item = state.items[index];
        item.cartQuantity -= 1;
        state.totalPrice -= item.price * item.quantity;

        if (item.cartQuantity <= 0) {
          state.items.splice(index, 1);
        }
      }
    },
    addToWishlist: (state, action: PayloadAction<IProduct>) => {
      const existingItem = state.wishlist.find(
        (item) => item.slug === action.payload.slug
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.wishlist.push(action.payload);
      }
      // state.totalQuantity += action.payload.quantity;
      // state.totalPrice += action.payload.price * action.payload.quantity;
    },
    removeFromWishlist: (state, action: PayloadAction<IProduct>) => {
      const index = state.wishlist.findIndex(
        (item) => item.slug === action.payload.slug
      );
      if (index !== -1) {
        // const item = state.items[index];
        // state.totalPrice -= item.price * item.quantity;
        state.wishlist.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});

export const {
  addItem,
  removeItem,
  deleteItem,
  reduceItemQuality,
  addToWishlist,
  removeFromWishlist,
} = cartSlice.actions;
export default cartSlice.reducer;
