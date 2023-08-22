import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        totalProducts: 0,
        totalPrice: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload.productList);
            state.totalProducts += action.payload.totalProducts;
            state.totalPrice += action.payload.price;
        },

        updateProductQuantity: (state, action) => {
            const { productId, newQuantity, productSize } = action.payload;
            const product = state.products.find(product => product._id === productId && product.productSize === productSize);

            if (product) {
                state.totalProducts += newQuantity - product.quantity;
                state.totalPrice += (newQuantity - product.quantity) * product.price;
                product.quantity = newQuantity;
            }
        },

        removeProduct: (state, action) => {
            const { productId, productSize } = action.payload;
            const index = state.products.findIndex(product => product._id === productId && product.productSize === productSize);

            if (index !== -1) {
                const removedProduct = state.products[index];
                state.totalProducts -= removedProduct.quantity;
                state.totalPrice -= removedProduct.price * removedProduct.quantity;
                state.products.splice(index, 1);
            }
        }
    }
});

export const { addProduct, updateProductQuantity, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
