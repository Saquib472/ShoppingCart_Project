import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name : 'products',
  initialState : {
    loading : false,
    error : '',
    productList : []
  },
  reducers : {
    addProductsList(state, action){
      state.loading = false
      state.error = ''
      state.productList = action.payload
    },
    isLoading(state){
      state.error = ''
      state.loading = true
    },
    setError(state, action){
      state.loading = false
      state.error = action.payload || `Something Went Wrong Please try after sometime :-(`
    }
  }
})

//Selectors
export const getAllProducts = (state) => state.products.productList
export const getAllProductLoading = (state) => state.products.loading
export const getAllProductError = (state) => state.products.error

export const {addProductsList, isLoading, setError} = productSlice.actions
export default productSlice.reducer