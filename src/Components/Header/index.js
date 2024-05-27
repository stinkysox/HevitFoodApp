import './index.css'
import {useContext} from 'react'
import {Link} from 'react-router-dom'
import {FaShoppingCart} from 'react-icons/fa'
import CartContext from '../../context/CartContext'

const Header = ({restaurantName}) => {
  const {cartList} = useContext(CartContext)

  return (
    <div className="w-header">
      <Link to="/">
        <h1 className="header-heading">{restaurantName}</h1>
      </Link>

      <div className="header-cart-container">
        <p className="my-orders">My Orders</p>

        <div className="cart-container">
          <Link to="/cart">
            <div className="cart-icon">
              <FaShoppingCart fontSize="28px" color="white" />
            </div>
          </Link>
        </div>
        <div className="count-container">
          <p>{cartList.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Header
