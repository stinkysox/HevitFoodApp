import {Component} from 'react'
import './App.css'
import HomeRoute from './Components/HomeRoute'
import CartContext from './context/CartContext'

class App extends Component {
  state = {cartList: []}

  addCartItem = item => {
    const {cartList} = this.state

    const itemExists = cartList.some(
      eachItem => eachItem.dishId === item.dishId,
    )

    if (itemExists) {
      const updatedCartList = cartList.map(eachItem => {
        if (eachItem.dishId === item.dishId) {
          return {...eachItem, quantity: eachItem.quantity + 1}
        }
        return eachItem
      })

      this.setState({cartList: updatedCartList})
    } else {
      this.setState({cartList: [...cartList, {...item, quantity: 1}]})
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const itemExists = cartList.some(eachItem => eachItem.dishId === id)

    if (itemExists) {
      const updatedCartList = cartList.map(eachItem => {
        if (eachItem.dishId === id && eachItem.quantity > 0) {
          return {...eachItem, quantity: eachItem.quantity - 1}
        }
        return eachItem
      })

      const filteredCartList = updatedCartList.filter(
        eachItem => eachItem.dishId !== id || eachItem.quantity > 0,
      )

      this.setState({cartList: filteredCartList})
    }
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
        }}
      >
        <div className="App">
          <HomeRoute />
        </div>
      </CartContext.Provider>
    )
  }
}

export default App
