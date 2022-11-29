import classes from './AvailableMeals.module.css'
import Card from './../UI/Card'
import MealItem from '../Meals/MealItem/MealItem'
import React, {useEffect, useState} from 'react'
import axios from 'axios'


const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState()
  useEffect(() => {
      setIsLoading(true)
        axios.get('https://food-order-5e13e-default-rtdb.europe-west1.firebasedatabase.app/meals.json')
        .then(response => {
         let fetchedData = response.data
         const loadedMeals = [];
       
          setIsLoading(false)
          for (const key in fetchedData) {
            loadedMeals.push({
              id: key,
              name: fetchedData[key].name,
              description: fetchedData[key].description,
              price: fetchedData[key].price
            })
          }
          setMeals(loadedMeals)
          setIsLoading(false)
       })
      .catch(error =>{
        setIsLoading(false)
        setLoadError(error.message)
      })
},[])

     if (isLoading) {
       return <section className={classes.MealsLoading}>
         <p>Loading...</p>
       </section>
     }

     if(loadError) {
       return <section className={classes.MealsError}>
         <p>{loadError}</p>
       </section>
     }

    const mealsList = meals.map(meal => 
        (
        <MealItem 
         key={meal.id} 
         id={meal.id}
         name={meal.name} 
         description={meal.description} 
         price={meal.price}
        />))
    return <section className={classes.meals}>
        <Card>
        <ul>
            {mealsList}
        </ul>
        </Card>
    </section>
}

export default AvailableMeals



// axios.get('https://food-order-5e13e-default-rtdb.europe-west1.firebasedatabase.app/m1.json')
//     .then(response => {
//       let fetchedData = response.data
//       const loadedMeals = [];

//       for (const key in fetchedData) {
//         loadedMeals.push({
//           id: key,
//           name: fetchedData[key].name,
//           description: fetchedData[key].description,
//           price: fetchedData[key].price
//         })
//       }
//       console.log(loadedMeals, 'not yet')
//       setMeals(loadedMeals)
//       console.log(meals, 'loaded')
//     })
