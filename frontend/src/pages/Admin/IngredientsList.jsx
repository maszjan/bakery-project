import IngredientsTableForAdmin from "../../componenets/Admin/IngredientsTableForAdmin";
import BackLink from "../../componenets/BackLink";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddIngredient from "../../componenets/Admin/AddIngredient";

export default function AdminIngredientsPage() {
  const [showAddIngredient, setShowAddIngredient] = useState(false);
  const openAddIngredientHandler = (event) => {
    event.preventDefault()
    setShowAddIngredient(true);
  }

  const closeAddIngredientHandler = (event) => {
    event.preventDefault()
    setShowAddIngredient(false);
  }
  return (
    <div className="flex flex-col space-y-2 items-center mx-auto mt-20 w-[1000px]">
      <BackLink/>
      <h1 className="text-4xl font-bold">Ingredients list</h1>
      <button onClick={openAddIngredientHandler} className="text-typo hover:scale-150" >
      <div className="flex flex-row space-x-2 items-center">
        <IoIosAddCircleOutline />
        <p>Add Ingredient</p>
      </div>
      </button>
      {showAddIngredient ? <AddIngredient onClick={closeAddIngredientHandler}/> : ''}
      <IngredientsTableForAdmin />
    </div>
  );
}
