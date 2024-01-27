import Input from "../Input";
import FormButton from "../FormButton";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useState } from "react";
import axios from "axios";

const EditOrder = (props) => {
  const [editOrderData, setEditOrderData] = useState({
    id:props.record.id,
    userId: props.record.userId,
    orderStatus: props.record.orderStatus,
    orderTotal: props.record.orderTotal,
    orderCreatedAt: props.record.orderCreatedAt,
  });


  

  const editHandler = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.put(
        `https://localhost:7126/api/v1/order/${editOrderData.id}`,
        editOrderData
      );
    } catch (error) {
      console.error("Can't edit this user", error.message);
    }
  };
  const inputHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setEditOrderData({ ...editOrderData, [name]: value });
  };

  return (
    <div className="flex flex-col md:flex-wrap space-y-2 bg-semiBrown px-24 py-12 rounded-xl">
    <AiOutlineCloseCircle onClick={props.onClick} className="cursor-pointer text-2xl absolute top-[170px] right-[470px]"/>
      <Input diff="number" title="Id" name="id" onChange={inputHandler} value={editOrderData.id}/>
      <Input diff="text" title="User Id" name="userId" onChange={inputHandler} value={editOrderData.userId}/>
      <Input diff="text" title="Order Status" name="orderStatus" onChange={inputHandler} value={editOrderData.orderStatus}/>
      {/* <Input diff="text" title="document" name="document" onChange={inputHandler} value={editOrderData.document}/> */}
      <FormButton onClick={editHandler} text="Update" />
    </div>
  );
};

export default EditOrder;
