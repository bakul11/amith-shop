import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";


const newCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

const initialState = {
    cart: newCart
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        //add to cart 
        addToCart: (state, action) => {
            const itemInCart = state.cart.find((item) => item._id === action.payload._id);
            if (itemInCart) {
                itemInCart.quantity++;
                toast.success('Item quantity increment')

            } else {
                state.cart.push({ ...action.payload, quantity: 1 })
                toast.success('Item add to cart success')
            }

            localStorage.setItem('cart', JSON.stringify(state.cart))
        },

        // remove form cart 
        removeFormCart: (state, action) => {
            const removeProduct = state.cart.filter((item) => item._id !== action.payload);
            state.cart = removeProduct;
            toast.success('Item remove form cart success')
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        //quantity increment funtion
        incrementQty: (state, action) => {
            const item = state.cart.find((item) => item._id === action.payload);
            item.quantity++;
            toast.success('Item quantity increment ')
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        //decremnt qty funtion
        decrementQty: (state, action) => {
            const item = state.cart.find((item) => item._id === action.payload);
            if (item.quantity === 1) {
                item.quantity = 1
            } else {
                item.quantity--;
                toast.success('Item quantity decrement')
            }
            localStorage.setItem('cart', JSON.stringify(state.cart))
        }

    }

})
export const cartReducer = cartSlice.reducer;
export const { addToCart, removeFormCart, incrementQty, decrementQty } = cartSlice.actions;