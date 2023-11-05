import { FiUsers } from "react-icons/fi";
import FormButton from "./FormButton";
import Input from "./Input";


const Register = (props) => {
  return (
    <div className="flex flex-col space-y-2 bg-semiBrown px-24 py-12 rounded-3xl">
      <h1 className="text-4xl font-bold text-darkBrown text-center my-6">
        Register account
      </h1>
      <Input diff="email" title="E-mail"/>
      <Input diff="text" title="Name" />
      <Input diff="password" title="Password" />
      <Input diff="text" title="Address" />
      <Input diff="text" title="City" />
      <Input diff="text" title="Postcode" />
      <Input diff="text" title="Country" />

      <div className="flex flex-row space-x-4">
        <FiUsers className="w-12 h-12 text-darkBrown" />
        <Input diff="checkbox" title="B2B" className="accent-darkerBrown" />
      </div>
      <FormButton text="Register" />
    </div>
  );
};

export default Register;
