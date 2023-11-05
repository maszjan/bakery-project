import Input from "../Input";
import FormButton from "../FormButton";
import { AiOutlineCloseCircle } from 'react-icons/ai';

const EditClient = (props) => {
  return (
    <div className="flex flex-col md:flex-wrap space-y-2 bg-semiBrown px-24 py-12 rounded-xl">
    <AiOutlineCloseCircle onClick={props.onClick} className="cursor-pointer text-2xl absolute top-[170px] right-[360px]"/>
      <Input diff="number" title="Id" />
      <Input diff="number" title="User Id" />
      <Input diff="text" title="Order Status" />
      <Input diff="text" title="Order Total" />
      <Input diff="text" title="Document" />
      <FormButton onClick={props.onClick} text="Update" />
    </div>
  );
};

export default EditClient;
