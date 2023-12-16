import Input from "../Input";
import FormButton from "../FormButton";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useState } from 'react';
import axios from "axios";

const AddIngredient = (props) => {
    const [ingredientData, setIngredientData] = useState({
        name: "",
        price: "",
        quantity: "",
        unit: ""
      });
    const addIngredientHandler = async (e) => {
        e.preventDefault();
            try {
              // eslint-disable-next-line no-unused-vars
              const response = await axios.post(
                "https://localhost:7126/api/v1/ingredient",
                ingredientData
              );
            } catch (error) {
              console.error("Can't add this ingredient", error.message);
            }
    }
    const inputHandler = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setIngredientData({ ...ingredientData, [name]: value });
      };
    return (
        <div className="flex flex-col md:flex-wrap space-y-2 bg-semiBrown px-24 py-12 rounded-xl">
        <AiOutlineCloseCircle onClick={props.onClick} className="cursor-pointer text-2xl absolute top-[170px] right-[470px]"/>
          <Input diff="text" title="Name" name="name" onChange={inputHandler} value={ingredientData.name} />
          <Input diff="number" title="Quantity" name="quantity" onChange={inputHandler} value={ingredientData.quantity}/>
          <Input diff="text" title="Unit" name="unit" onChange={inputHandler} value={ingredientData.unit}/>
          <Input diff="number" title="Price" name="price" onChange={inputHandler} value={ingredientData.price}/>

          <FormButton onClick={addIngredientHandler} text="Add" />
        </div>
      );
}

export default AddIngredient;