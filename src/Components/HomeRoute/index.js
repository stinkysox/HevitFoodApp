import {useState, useEffect} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import Options from '../OptionsSection'
import Dishes from '../Dishes'
import Header from '../Header' // Import the Header component

const HomeRoute = () => {
  const [dishDetails, setDishDetails] = useState([])
  const [activeDish, setActiveDish] = useState(null)
  const [apiStatus, setApiStatus] = useState('Loading')
  const [restaurantName, setRestaurantName] = useState('')

  useEffect(() => {
    const getFoodDetails = async () => {
      const api = 'https://run.mocky.io/v3/72562bef-1d10-4cf5-bd26-8b0c53460a8e'
      try {
        const response = await fetch(api)
        const data = await response.json()
        const results = data[0]
        const {table_menu_list: tableMenuList, restaurant_name: name} = results

        const updatedData = tableMenuList.map(eachItem => ({
          categoryDishes: eachItem.category_dishes.map(dish => ({
            addonCat: dish.addonCat,
            dishAvailability: dish.dish_Availability,
            dishType: dish.dish_Type,
            dishCalories: dish.dish_calories,
            dishCurrency: dish.dish_currency,
            dishDescription: dish.dish_description,
            dishId: dish.dish_id,
            dishImage: dish.dish_image,
            dishName: dish.dish_name,
            dishPrice: dish.dish_price,
            nexturl: dish.nexturl,
          })),
          menuCategory: eachItem.menu_category,
          menuCategoryId: eachItem.menu_category_id,
          menuCategoryImage: eachItem.menu_category_image,
          nexturl: eachItem.nexturl,
        }))

        console.log(updatedData)

        setDishDetails(updatedData)
        setRestaurantName(name)
        setApiStatus('Success')
        setActiveDish(tableMenuList[0].menu_category_id)
      } catch (error) {
        console.error('Error fetching data:', error)
        setApiStatus('Failed')
      }
    }

    getFoodDetails()
  }, [])

  const filteredData = dishDetails.filter(
    eachItem => eachItem.menuCategoryId === activeDish,
  )

  const renderSuccessView = () => (
    <div>
      <Header restaurantName={restaurantName} />{' '}
      {/* Pass the restaurant name to Header */}
      <Options
        dishDetails={dishDetails}
        setActiveDish={setActiveDish}
        activeDish={activeDish}
        apiStatus={apiStatus}
        restaurantName={restaurantName}
      />
      <ul>
        {filteredData.map(category =>
          category.categoryDishes.map(eachItem => (
            <Dishes details={eachItem} key={eachItem.dishId} />
          )),
        )}
      </ul>
    </div>
  )

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  const renderFailureScreen = () => (
    <div>
      <h1>Failed to load the page. Please try again </h1>
    </div>
  )

  const renderScreenBasedOnApiStatus = () => {
    switch (apiStatus) {
      case 'Success':
        return renderSuccessView()
      case 'Loading':
        return renderLoadingView()
      case 'Failed':
        return renderFailureScreen()
      default:
        return null
    }
  }

  return (
    <div className="home-w-container">
      <div className="home-container">{renderScreenBasedOnApiStatus()}</div>
    </div>
  )
}

export default HomeRoute
