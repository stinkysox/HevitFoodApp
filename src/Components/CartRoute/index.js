import './index.css'
import {useContext} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

const CartRoute = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)
  const isCartEmpty = cartList.length === 0

  return (
    <div>
      <Header restaurantName="UNI Resto Cafe" />
      {isCartEmpty ? (
        <div className="cart-empty-view-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
            className="cart-empty-img"
            alt="cart empty"
          />
          <h1 className="cart-empty-heading">Your Cart Is Empty</h1>

          <Link to="/">
            <button type="button" className="shop-now-btn">
              Shop Now
            </button>
          </Link>
        </div>
      ) : (
        <div className="cart-items-container">
          <ul className="cart-items-list">
            {cartList.map(eachItem => (
              <CartItem key={eachItem.dishId} details={eachItem} />
            ))}
          </ul>
          <div className="delete-container">
            <button
              type="button"
              className="remove-button"
              onClick={removeAllCartItems}
            >
              Remove All
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartRoute
