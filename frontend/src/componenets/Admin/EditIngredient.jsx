import Input from "../Input";
import FormButton from "../FormButton";
import { AiOutlineCloseCircle } from 'react-icons/ai';

const EditClient = (props) => {
  return (
    <div className="flex flex-col md:flex-wrap space-y-2 bg-semiBrown px-24 py-12 rounded-xl">
    <AiOutlineCloseCircle onClick={props.onClick} className="cursor-pointer text-2xl absolute top-[170px] right-[470px]"/>
      <Input diff="number" title="Id" />
      <Input diff="text" title="Name" />
      <Input diff="number" title="Quantity" />
      <Input diff="text" title="Unit" />
      <Input diff="number" title="Price" />
      <FormButton onClick={props.onClick} text="Update" />
    </div>
  );
};

export default EditClient;
