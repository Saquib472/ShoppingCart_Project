import { useDispatch } from 'react-redux'
import { decreaseCartItemQuantity, increaseCartItemQuantity } from '../store/slices/cartReducer'

export default function CartItem({
  id,
  title,
  rating,
  price,
  imageUrl,
  quantity,
}) {
  const dispatch = useDispatch()
  return (
    <div className="cart-item-container">
      <div className="cart-item">
        <img src={imageUrl} alt={title} />
        <div>
          <h3>{title}</h3>
          <p>{rating} ★ ★ ★ ★</p>
        </div>
      </div>
      <div className="item-price">${price}</div>
      <div className="item-quantity">
        <button onClick={() => dispatch(decreaseCartItemQuantity({id}))}>
          -
        </button>
        <span>{quantity}</span>
        <button onClick={() => dispatch(increaseCartItemQuantity({id}))}>
          +
        </button>
      </div>
      <div className="item-total">${quantity * price}</div>
    </div>
  )
}
