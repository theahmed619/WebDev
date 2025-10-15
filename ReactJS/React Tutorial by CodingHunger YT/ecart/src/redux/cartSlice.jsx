import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the cart
const initialState = {
    cartItems: [],      // An array to hold items in the cart
    totalQuantity: 0,   // The total number of items in the cart
    totalAmount: 0      // The total price of all items
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        
        /**
         * Adds an item to the cart. If the item already exists, it increases its quantity.
         * action.payload should be the product object (e.g., { id, name, price })
         */
        addItem: (state, action) => {
            const newItem = action.payload;
            // Check if the item already exists in the cart
            const existingItem = state.cartItems.find(item => item.id === newItem.id);
            
            state.totalQuantity++;

            if (!existingItem) {
                // If it's a new item, add it to the cart with a quantity of 1
                state.cartItems.push({
                    ...newItem,
                    quantity: 1,
                    totalPrice: newItem.price // Total price for this item line
                });
            } else {
                // If the item already exists, just increase its quantity and total price
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
            
            // Update the grand total amount for the whole cart
            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + item.totalPrice, 0
            );
        },

        /**
         * Removes one quantity of an item from the cart. If quantity becomes 0, it removes the item.
         * action.payload should be the item's id (e.g., id: 'p1')
         */
        removeItem: (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find(item => item.id === id);

            state.totalQuantity--;

            if (existingItem.quantity === 1) {
                // If quantity is 1, remove the item completely from the cart
                state.cartItems = state.cartItems.filter(item => item.id !== id);
            } else {
                // Otherwise, just decrease the quantity and total price
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }

            // Update the grand total amount
             state.totalAmount = state.cartItems.reduce(
                (total, item) => total + item.totalPrice, 0
            );
        },

        /**
         * Deletes an item and all its quantities from the cart completely.
         * action.payload should be the item's id (e.g., id: 'p1')
         */
        deleteItem: (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find(item => item.id === id);
            
            if (existingItem) {
                // Remove the item and update totals
                state.cartItems = state.cartItems.filter(item => item.id !== id);
                state.totalQuantity = state.totalQuantity - existingItem.quantity;
            }
            
            // Update the grand total amount
             state.totalAmount = state.cartItems.reduce(
                (total, item) => total + item.totalPrice, 0
            );
        },
        
        /**
         * Clears all items from the cart, resetting it to its initial state.
         */
        clearCart: (state) => {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
            // A simpler way is to return the initial state:
            // return initialState;
        }
    }
});

// Export the action creators
export const { addItem, removeItem, deleteItem, clearCart } = cartSlice.actions;

// Export the selectors (optional but good practice)
export const selectCartItems = (state) => state.cart.cartItems;
export const selectTotalQuantity = (state) => state.cart.totalQuantity;
export const selectTotalAmount = (state) => state.cart.totalAmount;

// Export the reducer as the default export
export default cartSlice.reducer;