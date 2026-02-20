import { createSelector, createSlice } from "@reduxjs/toolkit";

const findItemIndex = (state, action)=>{
  return state.findIndex((cartItem)=>cartItem.id === action.payload.id)
}
const cartReducerSlice = createSlice({
  name : 'cart',
  initialState : {
    loading : false,
    list : [],
    error : ''
  },
  reducers : {
    isLoadingCart(state){
      state.loading = true
    },
    setErrorCart(state, action){
      state.loading = false
      state.error = action.payload || `Something Went Wrong Please try after sometime :-(`
    },
    loadCartItems(state, action){
      state.loading = false
      state.list = action.payload.products.map((product)=> {
        return {id : product.productId, quantity : product.quantity}
      })
    },
    addCartItem(state, action){
      const existingItemIndex = findItemIndex(state.list, action)
      if(existingItemIndex !== -1) state.list[existingItemIndex].quantity += 1
      else state.list.push({...action.payload , quantity: 1})
    },
    removeCartItem(state, action){
      const existingItemIndex = findItemIndex(state.list, action)
      state.list.splice(existingItemIndex , 1)
    },
    decreaseCartItemQuantity(state, action){
      const existingItemIndex = findItemIndex(state.list, action)
      state.list[existingItemIndex].quantity = state.list[existingItemIndex].quantity - 1
        if(state.list[existingItemIndex].quantity === 0){
          state.list.splice(existingItemIndex , 1)
        }
    },
    increaseCartItemQuantity(state, action){
      const existingItemIndex = findItemIndex(state.list, action)
      state.list[existingItemIndex].quantity = state.list[existingItemIndex].quantity + 1
    }
  }
})

const getCartItems = ({products, cartItems}) => {
    return cartItems.list.map(({id, quantity})=>{
      const cartProduct = products.productList.find((product)=> product.id === id)
      return {...cartProduct, quantity}
    }).filter((cartItem)=> cartItem.title)
}
//Memoizing the selector.
export const getAllCartItems = createSelector(getCartItems, (cartItems)=> cartItems)
export const getCartLoader = (store)=> store.cartItems.loading
export const getCartError = (store)=> store.cartItems.error

export const {addCartItem, removeCartItem, increaseCartItemQuantity, decreaseCartItemQuantity } = cartReducerSlice.actions

const {loadCartItems, isLoadingCart, setErrorCart} = cartReducerSlice.actions

//Redux Thunk Action Creator
export const fetchCartItemsData = () => (dispatch) => {
  dispatch(isLoadingCart())
  fetch("https://fakestoreapi.com/carts/5")
    .then(res => res.json())
    .then((data) => {
      dispatch(loadCartItems(data))
    })
    .catch(()=>{
      dispatch(setErrorCart())
    })
}

export default cartReducerSlice.reducer

// import { produce } from "immer"

// Action Types
// const CART_ADD_ITEM = 'cart/addItem'
// const CART_REMOVE_ITEM = 'cart/removeItem'
// const CART_ITEM_INCREASE_QUANTITY = 'cart/increaseItemQuantity'
// const CART_ITEM_DECREASE_QUANTITY = 'cart/decreaseItemQuantity'
// const CART_LOAD_ITEMS = 'cart/loadCartItems'

// Action Creators
// export function addCartItem(productData) {
//   return { type: CART_ADD_ITEM, payload: productData }
// }

// export function removeCartItem(productId) {
//   return { type: CART_ADD_ITEM, payload: { productId } }
// }

// export function decreaseCartItemQuantity(productId) {
//   return {
//     type: CART_ITEM_DECREASE_QUANTITY,
//     payload: { productId },
//   }
// }

// export function increaseCartItemQuantity(productId) {
//   return {
//     type: CART_ITEM_INCREASE_QUANTITY,
//     payload: { productId },
//   }
// }

// export function loadCartItems(data) {
//   return {
//     type: CART_LOAD_ITEMS,
//     payload: data,
//   }
// }

// Reducer
// export default function cartReducer(originalState = [], action) {
//   return produce(originalState , (state)=>{
//     const existingItemIndex = state.findIndex(
//       (cartItem) => cartItem.productId === action.payload.productId
//     )
//     switch (action.type) {
//       case CART_LOAD_ITEMS: 
//         return action.payload
//       case CART_ADD_ITEM:
//         if (existingItemIndex !== -1) {
//           state[existingItemIndex].quantity = state[existingItemIndex].quantity + 1
//           break
//         }
//         state.push({...action.payload, quantity : 1})
//         break
//       case CART_REMOVE_ITEM:
//         state.splice(existingItemIndex , 1)
//         break
//       case CART_ITEM_INCREASE_QUANTITY:
//         state[existingItemIndex].quantity = state[existingItemIndex].quantity + 1
//         break
//       case CART_ITEM_DECREASE_QUANTITY:
//         state[existingItemIndex].quantity = state[existingItemIndex].quantity - 1
//         if(state[existingItemIndex].quantity === 0){
//           state.splice(existingItemIndex , 1)
//         }
//     }
//     return state
//   })
// }

// export default function cartReducer(state = [], action) {
//   switch (action.type) {
//     case CART_ADD_ITEM:
//       const existingItem = state.find(
//         (cartItem) => cartItem.productId === action.payload.productId
//       )
//       if (existingItem) {
//         return state.map((cartItem) => {
//           if (cartItem.productId === existingItem.productId) {
//             return { ...cartItem, quantity: cartItem.quantity + 1 }
//           }
//           return cartItem
//         })
//       }
//       return [...state, { ...action.payload, quantity: 1 }]
//     case CART_REMOVE_ITEM:
//       return state.filter(
//         (cartItem) => cartItem.productId !== action.payload.productId
//       )
//     case CART_ITEM_INCREASE_QUANTITY:
//       return state.map((cartItem) => {
//         if (cartItem.productId === action.payload.productId) {
//           return { ...cartItem, quantity: cartItem.quantity + 1 }
//         }
//         return cartItem
//       })

//     case CART_ITEM_DECREASE_QUANTITY:
//       return state
//         .map((cartItem) => {
//           if (cartItem.productId === action.payload.productId) {
//             return { ...cartItem, quantity: cartItem.quantity - 1 }
//           }
//           return cartItem
//         })
//         .filter((cartItem) => cartItem.quantity > 0)
//     default:
//       return state
//   }
// }