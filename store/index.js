// import { combineReducers, createStore } from 'redux'
import productsReducer from './slices/productsReducer'
import cartReducer from './slices/cartReducer'
import wishListReducer from './slices/wishListReducer'
import { configureStore } from '@reduxjs/toolkit'
import { apiMiddleware } from './middleware/api'
import { func } from './middleware/func'

// const reducer = combineReducers({
//   products: productsReducer,
//   cartItems: cartReducer,
//   wishList: wishListReducer,
// })

// export const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__?.()
// )

export const store = configureStore({
  reducer : {
    products: productsReducer,
    cartItems: cartReducer,
    wishList: wishListReducer,
  },
  // middleware : ()=> [apiMiddleware , func]
})
