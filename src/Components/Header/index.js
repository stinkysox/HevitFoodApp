import './index.css'
import {useContext} from 'react'
import {FaShoppingCart} from 'react-icons/fa'
import CartContext from '../../context/CartContext'

const Header = () => {
  const {cartList} = useContext(CartContext)

  return (
    <div className="w-header">
      <h1 className="header-heading">UNI Resto Cafe Header</h1>

      <div className="header-cart-container">
        <p className="my-orders">My Orders</p>

        <div className="cart-container">
          <FaShoppingCart fontSize="28px" />
        </div>
        <div className="count-container">
          <p>{cartList.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Header
