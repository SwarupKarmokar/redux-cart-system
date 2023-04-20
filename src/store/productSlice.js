import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
})

const productSlice = createSlice({
    name: "product",
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },
    reducers: {
        // // THIS IS FOR NORMAL THUNK MIDDLEWARE 
        // setProducts(state, action) {
        //     // do not call async data here directly 
        //     state.data = action.payload
        // },

        // setStatus(state, action) {
        //     state.status = action.payload;
        // }
    },

    // THIS IS FOR WHEN WE USE INBUILT THUNK USING TOOLKIT 
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = STATUSES.LOADING
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = STATUSES.IDLE

            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = STATUSES.ERROR
            })
    }
})

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;


// // THUNK MIDDLEWARE 
// // using this we can call async data 

// export function fetchProducts() {
//     return async function fetchProductThunk(dispatch, getState) {
//         dispatch(setStatus(STATUSES.LOADING));
//         try {
//             const res = await fetch("https://fakestoreapi.com/products")
//             const data = await res.json();
//             dispatch(setProducts(data));
//             dispatch(setStatus(STATUSES.IDLE));
//         }
//         catch (err) {
//             dispatch(setStatus(STATUSES.ERROR))
//         }
//     }
// }


// INBUILT TOOLKIT THUNK 
export const fetchProducts = createAsyncThunk('product/fetch', async () => {
    const res = await fetch("https://fakestoreapi.com/products")
    const data = await res.json();
    return data;
})