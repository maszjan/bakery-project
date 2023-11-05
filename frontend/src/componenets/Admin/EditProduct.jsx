import Input from "../Input";
import FormButton from "../FormButton";
import { AiOutlineCloseCircle } from 'react-icons/ai';

const EditProduct = (props) => {
  return (
    <div className="flex flex-col md:flex-wrap space-y-2 bg-semiBrown px-24 py-12 rounded-xl">
    <AiOutlineCloseCircle onClick={props.onClick} className="cursor-pointer text-2xl absolute top-[170px] right-[470px]"/>
      <Input diff="number" title="Id" />
      <Input diff="text" title="Name" />
      <Input diff="text" title="Price" />
      <FormButton onClick={props.onClick} text="Update" />
    </div>
  );
};

export default EditProduct;
