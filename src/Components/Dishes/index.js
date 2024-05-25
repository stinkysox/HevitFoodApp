import './index.css'
import {useState, useContext} from 'react'
import CartContext from '../../context/CartContext'

const Dishes = props => {
  const {details} = props
  const [count, setCount] = useState(0)
  const {addCartItem, removeCartItem} = useContext(CartContext)

  const {
    dishImage,
    dishAvailability,
    dishType,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishName,
    dishPrice,
    addonCat,
    dishId,
  } = details

  const isCustomAvailable = addonCat.length !== 0

  const handleDecrease = () => {
    setCount(prev => (prev > 0 ? prev - 1 : 0))
    removeCartItem(dishId)
  }

  const handleIncrease = () => {
    setCount(prevCount => prevCount + 1)
    addCartItem({...details, quantity: count + 1})
  }

  return (
    <li className="fooditem-card">
      <div className={dishType === 1 ? 'non-veg-container' : 'veg-container'}>
        <div className={dishType === 1 ? 'non-veg-dot' : 'veg-dot'} />
      </div>
      <div className="dish-details-container">
        <h1 className="dish-name">{dishName}</h1>
        <p className="dish-currency">{`${dishCurrency} ${dishPrice}`}</p>
        <p className="dish-description">{dishDescription}</p>
        {dishAvailability ? (
          <div>
            <div className="buttons-container">
              <button
                className="minus-button"
                onClick={handleDecrease}
                type="button"
              >
                -
              </button>
              <p className="count">{count}</p>
              <button
                className="plus-btn"
                onClick={handleIncrease}
                type="button"
              >
                +
              </button>
            </div>
            {isCustomAvailable && (
              <p className="custom-text">Customizations available</p>
            )}
          </div>
        ) : (
          <p className="not-available">Not available</p>
        )}
      </div>
      <div className="dish-calories">
        <p>{dishCalories}</p>
        <p>calories</p>
      </div>
      <div className="dish-image-container">
        <img src={dishImage} alt={dishDescription} className="dish-image" />
      </div>
    </li>
  )
}

export default Dishes
