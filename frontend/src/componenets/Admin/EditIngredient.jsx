import Input from "../Input";
import FormButton from "../FormButton";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useState } from 'react';
import axios from "axios";

const EditIngredient = (props) => {
  const [editIngredientData, setEditIngredientData] = useState({
    id:props.record.id,
    name: props.record.name,
    quantity: props.record.quantity,
    unit: props.record.unit,
    price: props.record.price
  });

  const editHandler = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.put(
        `https://localhost:7126/api/v1/ingredient/${editIngredientData.id}`,
        editIngredientData
      );
    } catch (error) {
      console.error("Can't edit this user", error.message);
    }
  };

  const inputHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setEditIngredientData({ ...editIngredientData, [name]: value });
  };
  return (
    <div className="flex flex-col md:flex-wrap space-y-2 bg-semiBrown px-24 py-12 rounded-xl">
    <AiOutlineCloseCircle onClick={props.onClick} className="cursor-pointer text-2xl absolute top-[170px] right-[470px]"/>
      <Input diff="text" title="Name" name="id" onChange={inputHandler} value={editIngredientData.id} />
      <Input diff="text" title="Name" name="name" onChange={inputHandler} value={editIngredientData.name} />
      <Input diff="number" title="Quantity" name="quantity" onChange={inputHandler} value={editIngredientData.quantity}/>
      <Input diff="text" title="Unit" name="unit" onChange={inputHandler} value={editIngredientData.unit}/>
      <Input diff="number" title="Price" name="price" onChange={inputHandler} value={editIngredientData.price}/>
      <FormButton onClick={editHandler} text="Update" />
    </div>
  );
};

export default EditIngredient;
