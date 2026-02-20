import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CartIcon from '../assets/cart-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsData } from '../store/slices/productsReducer'
import { fetchCartItemsData } from '../store/slices/cartReducer'

export default function Header() {
  const cartItems = useSelector((state) => state.cartItems.list)
  const dispatch = useDispatch()
  useEffect(()=>{

    //Fetching API using Redux Thunk
    dispatch(fetchProductsData())
    dispatch(fetchCartItemsData())

    //Fetching API using Custom Middleware
    // dispatch({
    //   type : 'api/makeCall',
    //   payload : {
    //     url : 'products',
    //     onStart : isLoading.type,
    //     onSuccess : addProductsList.type,
    //     onError : setError.type
    //   }
    // })

    // dispatch({
    //   type : 'api/makeCall',
    //   payload : {
    //     url : 'carts/5',
    //     onStart : isLoadingCart.type,
    //     onSuccess : loadCartItems.type,
    //     onError : setErrorCart.type
    //   }
    // })

    // Fetching API using React
    // const handleProducts = async ()=> {
    //   dispatch(isLoading())
    //   try{
    //     const res = await fetch('https://fakestoreapi.com/products')
    //     const data = await res.json()
    //     dispatch(addProductsList(data))
    //   }catch(err){
    //     dispatch(setError())
    //   }

    //   dispatch(isLoadingCart())
    //   try{
    //     const res = await fetch('https://fakestoreapi.com/carts/5')
    //     const data = await res.json()
    //     dispatch(loadCartItems(data))
    //   }catch(err){
    //     dispatch(setErrorCart())
    //   }
    // }
    // handleProducts()
  },[])
  return (
    <header>
      <div className="header-contents">
        <h1>
          <Link to="/">Shopee</Link>
        </h1>
        <Link className="cart-icon" to="/cart">
          <img src={CartIcon} />
          <div className="cart-items-count">
            {cartItems?.reduce(
              (accumulator, currentItem) => accumulator + currentItem.quantity,
              0
            )}
          </div>
        </Link>
      </div>
    </header>
  )
}
