import Input from "./Input";
import FormButton from "./FormButton";
import { useState } from 'react';

import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("")

  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
    return navigate("/admin/dashboard");
  };


  return (
    <div className="flex flex-col space-y-5 mx-auto items-center bg-semiBrown rounded-xl px-5 py-5">
      <h1 className="text-4xl font-bold text-darkBrown text-center my-6">
        Welcome back!
      </h1>
      <div className="flex flex-col space-y-6">
        <Input value={email} onChange={(e) => setEmail(e.target.value)} diff="email" title="E-mail" />
        <Input value={password} onChange={(e) => setPassword(e.target.value)} diff="password" title="Password" />
      </div>
      <FormButton onClick={loginHandler} text="Log in" />
    </div>
  );
};

export default Login;
