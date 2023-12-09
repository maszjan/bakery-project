import Input from "../Input";
import { useState } from 'react';
import axios from 'axios';
import FormButton from "../FormButton";
import { AiOutlineCloseCircle } from 'react-icons/ai';

const EditClient = (props) => {
  const [editUserData, setEditUserData] = useState({
    id:"",
    email: "",
    name: "",
    address: "",
    city: "",
    postcode: "",
    country: ""
  });

  const editHandler = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.put(
        `https://localhost:7126/user/${editUserData.id}`,
        editUserData
      );
    } catch (error) {
      console.error("Can't register this user", error.message);
    }
  };

  const inputHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setEditUserData({ ...editUserData, [name]: value });
  };
  return (
    <form className="flex flex-col md:flex-wrap space-y-2 bg-semiBrown px-24 py-12 rounded-xl">
    <AiOutlineCloseCircle onClick={props.onClick} className="cursor-pointer text-2xl absolute top-[170px] right-[310px]"/>
      <Input diff="id" title="Id" name="id" onChange={inputHandler} value={editUserData.id}/>
      <Input diff="email" title="E-mail" name="email" onChange={inputHandler} value={editUserData.email}/>
      <Input diff="text" title="Name" name="name" onChange={inputHandler} value={editUserData.name}/>
      <Input diff="text" title="Addres" name="address" onChange={inputHandler} value={editUserData.address}/>
      <Input diff="text" title="City" name="city" onChange={inputHandler} value={editUserData.city}/>
      <Input diff="text" title="Postcode" name="postcode" onChange={inputHandler} value={editUserData.postcode}/>
      <Input diff="text" title="Country" name="country" onChange={inputHandler} value={editUserData.country}/>
      <FormButton onClick={editHandler} text="Update" />
    </form>
  );
};

export default EditClient;
