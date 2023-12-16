import { useState } from "react";
import axios from "axios";
import FormButton from "./FormButton";
import Input from "./Input";
import BackLinkLogin from "./BackLinkLogin";

const Register = () => {
  const [registerUserData, setRegisterUserData] = useState({
    email: "",
    password: "",
  });

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        "https://localhost:7126/register",
        registerUserData
      );
    } catch (error) {
      console.error("Can't register this user", error.message);
    }
  };

  const inputHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setRegisterUserData({ ...registerUserData, [name]: value });
  };

  return (
    <div className="flex flex-col space-y-2 bg-semiBrown px-24 py-12 rounded-3xl">
      <BackLinkLogin />
      <h1 className="text-4xl font-bold text-darkBrown text-center my-6">
        Register account
      </h1>
      <form>
        <Input
          diff="email"
          title="E-mail"
          name="email"
          value={registerUserData.email}
          onChange={inputHandler}
        />
        <Input
          diff="password"
          title="Password"
          name="password"
          value={registerUserData.password}
          onChange={inputHandler}
        />

        <FormButton text="Register" onClick={registerHandler} />
      </form>
    </div>
  );
};

export default Register;
