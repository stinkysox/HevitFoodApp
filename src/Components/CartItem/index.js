import './index.css'
import {useContext} from 'react'
import {MdDelete} from 'react-icons/md'
import CartContext from '../../context/CartContext'

const CartItem = props => {
  const {details} = props
  const {
    dishImage,
    dishName,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishCalories,
    quantity,
    dishId,
  } = details

  const {
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
  } = useContext(CartContext)

  const handleIncrement = () => {
    incrementCartItemQuantity(dishId)
  }

  const handleDecrement = () => {
    decrementCartItemQuantity(dishId)
  }

  return (
    <li className="cart-item">
      <div className="cart-image-container">
        <img src={dishImage} alt={dishName} className="cart-item-image" />
      </div>
      <div className="cart-item-details">
        <h1 className="cart-item-name">{dishName}</h1>
        <p className="cart-item-description">{dishDescription}</p>
        <p className="cart-item-price">
          {dishCurrency} {dishPrice}
        </p>
      </div>
      <div className="button-container">
        <button className="cart-btn" onClick={handleDecrement}>
          -
        </button>
        <p className="quantity"> {quantity}</p>
        <button className="cart-btn" onClick={handleIncrement}>
          +
        </button>
      </div>
      <div className="cart-item-calories">
        <p className="cart-item-calories">{dishCalories} calories</p>
      </div>
      <div className="delete-container">
        <button onClick={() => removeCartItem(dishId)} className="delete-btn">
          <MdDelete />
        </button>
      </div>
    </li>
  )
}

export default CartItem
