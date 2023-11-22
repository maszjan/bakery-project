import Input from "./Input";
import FormButton from "./FormButton";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
    return navigate("/admin/dashboard");
  };

  return (
    <div className="flex flex-col space-y-4 mx-auto items-center px-5 py-5 bg-lighter rounded-2xl">
    <h1 className="text-xl text-typo">Welcome back!</h1>
      <form className="flex flex-col space-y-5">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          diff="email"
          title="E-mail"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          diff="password"
          title="Password"
        />
        <FormButton onClick={loginHandler} text="Log in" />
      </form>
      <p className="text-typo text-sm">You don't have an account?</p>
      <Link to="/register"><p className="text-typo text-sm font-bold">Register</p></Link>
      
    
    </div>
  );
};

export default Login;
