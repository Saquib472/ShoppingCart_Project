import CartItem from '../components/CartItem'
import { useSelector } from 'react-redux'
import { getAllCartItems, getCartError, getCartLoader } from '../store/slices/cartReducer'

export default function Cart() {
  const cartItems = useSelector(getAllCartItems)
  const loading = useSelector(getCartLoader)
  const error = useSelector(getCartError)
  return (
    <div className="cart-container">
      <h2>Items in Your Cart</h2>
      <div className="cart-items-container">
        <div className="cart-header cart-item-container">
          <div className="cart-item">Item</div>
          <div className="item-price">Price</div>
          <div className="quantity">Quantity</div>
          <div className="total">Total</div>
        </div>
        {loading ? (<h1 style={{'textAlign': 'center'}}>Loading.........</h1>) : error ? (<h1 style={{'textAlign': 'center'}}>{error}</h1>) : cartItems?.map(
          ({ id, title, rating, price, image, quantity }) => (
            <CartItem
              key={id}
              id={id}
              title={title}
              price={price}
              quantity={quantity}
              imageUrl={image}
              rating={rating.rate}
            />
          )
        )}
        <div className="cart-header cart-item-container">
          <div></div>
          <div></div>
          <div></div>
          {!loading && !error && (<div className="total">
            $
            {cartItems?.reduce(
              (accumulator, currentItem) =>
                accumulator + currentItem.quantity * currentItem.price,
              0
            )}
          </div>)}
        </div>
      </div>
    </div>
  )
}
