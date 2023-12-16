import Input from "../Input";
import FormButton from "../FormButton";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useState } from 'react';
import axios from "axios";

const EditProduct = (props) => {
  const [editProductData, setEditProductData] = useState({
    id:props.record.id,
    name: props.record.name,
    price: props.record.price
  });
  const editHandler = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.put(
        `https://localhost:7126/api/v1/product/${editProductData.id}`,
        editProductData
      );
    } catch (error) {
      console.error("Can't edit this user", error.message);
    }
  };
  const inputHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setEditProductData({ ...editProductData, [name]: value });
  };
  return (
    <div className="flex flex-col md:flex-wrap space-y-2 bg-semiBrown px-24 py-12 rounded-xl">
    <AiOutlineCloseCircle onClick={props.onClick} className="cursor-pointer text-2xl absolute top-[170px] right-[470px]"/>
      <Input diff="number" title="Id" name="id" onChange={inputHandler} value={editProductData.id}/>
      <Input diff="text" title="Name" name="name" onChange={inputHandler} value={editProductData.name}/>
      <Input diff="text" title="Price" name="price" onChange={inputHandler} value={editProductData.price}/>
      <FormButton onClick={editHandler} text="Update" />
    </div>
  );
};

export default EditProduct;
