import IngredientsList from "../../componenets/Admin/IngredientsList";
import BackLink from "../../componenets/BackLink";

export default function AdminIngredientsPage() {
  return (
    <div className="flex flex-col space-y-2 items-center mx-auto mt-20 w-[1000px]">
      <BackLink/>
      <h1 className="text-4xl font-bold">Ingredients list</h1>
      <IngredientsList />
    </div>
  );
}
