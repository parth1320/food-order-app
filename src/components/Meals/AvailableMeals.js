import Card from "../UI/Card";
import MealItem from "./MealsItem/MealItem";
import classes from "./Available.module.css";

const DUMMY_MEALS = async () => {
  const response = await fetch(
    "https://react-http-129a6-default-rtdb.firebaseio.com/meals.json",
  );
  const data = response.json();
  console.log(data);
};

const AvialableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvialableMeals;
