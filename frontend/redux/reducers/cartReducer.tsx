import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
}

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const item = action.payload;
      const isExist = state.cartItems.find((i) => i.product === item.product);
      
      if (isExist) {
        // Update existing item
        for (let i = 0; i < state.cartItems.length; i++) {
          if (state.cartItems[i].product === item.product) {
            state.cartItems[i] = item;
            break;
          }
        }
      } else {
        // Add new item
        state.cartItems.push(item);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter((i) => i.product !== productId);
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
