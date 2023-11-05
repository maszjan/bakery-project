import Input from "../Input";
import FormButton from "../FormButton";
import { FiUsers } from 'react-icons/fi';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const EditClient = (props) => {
  return (
    <div className="flex flex-col md:flex-wrap space-y-2 bg-semiBrown px-24 py-12 rounded-xl">
    <AiOutlineCloseCircle onClick={props.onClick} className="cursor-pointer text-2xl absolute top-[170px] right-[310px]"/>
      <Input diff="id" title="Id" />
      <Input diff="email" title="E-mail" />
      <Input diff="text" title="Name" />
      <Input diff="password" title="Password" />
      <Input diff="text" title="Addres" />
      <Input diff="text" title="City" />
      <Input diff="text" title="Postcode" />
      <Input diff="text" title="Country" />

      <div className="flex flex-row space-x-4">
        <FiUsers className="w-12 h-12 text-darkBrown" />
        <Input diff="checkbox" title="B2B" className="accent-darkerBrown" />
      </div>
      <FormButton onClick={props.onClick} text="Update" />
    </div>
  );
};

export default EditClient;
