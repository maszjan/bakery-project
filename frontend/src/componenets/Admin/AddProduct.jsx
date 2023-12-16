import Input from "../Input";
import FormButton from "../FormButton";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useState } from 'react';
import axios from "axios";

const AddProduct = (props) => {
    const [productData, setProductData] = useState({
        name: "",
        price: ""
      });
    const addProductHandler = async (e) => {
        e.preventDefault();
            try {
              // eslint-disable-next-line no-unused-vars
              const response = await axios.post(
                "https://localhost:7126/api/v1/product",
                productData
              );
            } catch (error) {
              console.error("Can't add this product", error.message);
            }
    }
    const inputHandler = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setProductData({ ...productData, [name]: value });
      };
    return (
        <div className="flex flex-col md:flex-wrap space-y-2 bg-semiBrown px-24 py-12 rounded-xl">
        <AiOutlineCloseCircle onClick={props.onClick} className="cursor-pointer text-2xl absolute top-[170px] right-[470px]"/>
          <Input diff="text" title="Name" name="name" onChange={inputHandler} value={productData.name} />
          <Input diff="number" title="Price" name="price" onChange={inputHandler} value={productData.price}/>
          <FormButton onClick={addProductHandler} text="Add" />
        </div>
      );
}

export default AddProduct;