import {useState, useEffect} from 'react'
import Options from '../OptionsSection'
import Dishes from '../Dishes'

const HomeRoute = () => {
  const [dishDetails, setDishDetails] = useState([])
  const [activeDish, setActiveDish] = useState(null)

  useEffect(() => {
    const getFoodDetails = async () => {
      const api = 'https://run.mocky.io/v3/72562bef-1d10-4cf5-bd26-8b0c53460a8e'
      try {
        const response = await fetch(api)
        const data = await response.json()
        const results = data[0]
        const {table_menu_list: tableMenuList} = results

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

        setDishDetails(updatedData)
        // Set the active dish to the ID of the first category
        setActiveDish(tableMenuList[0].menu_category_id)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    getFoodDetails()
  }, [])

  const filteredData = dishDetails.filter(
    eachItem => eachItem.menuCategoryId === activeDish,
  )

  return (
    <div>
      <Options
        dishDetails={dishDetails}
        setActiveDish={setActiveDish}
        activeDish={activeDish}
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
}

export default HomeRoute
