import {Component} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css'
import HomeRoute from './Components/HomeRoute'
import CartRoute from './Components/CartRoute'
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
          return {...eachItem, quantity: eachItem.quantity + item.quantity}
        }
        return eachItem
      })
      this.setState({cartList: updatedCartList})
    } else {
      this.setState({
        cartList: [...cartList, {...item, quantity: item.quantity}],
      })
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(eachItem => eachItem.dishId !== id)
    this.setState({cartList: updatedCartList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(eachItem => {
      if (eachItem.dishId === id) {
        return {...eachItem, quantity: eachItem.quantity + 1}
      }
      return eachItem
    })
    this.setState({cartList: updatedCartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList
      .map(eachItem => {
        if (eachItem.dishId === id && eachItem.quantity > 0) {
          return {...eachItem, quantity: eachItem.quantity - 1}
        }
        return eachItem
      })
      .filter(eachItem => eachItem.quantity > 0)
    this.setState({cartList: updatedCartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: ''})
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={HomeRoute} />
              <Route exact path="/cart" component={CartRoute} />
              <Route render={() => <h1>404 Not Found</h1>} />
            </Switch>
          </div>
        </Router>
      </CartContext.Provider>
    )
  }
}

export default App
