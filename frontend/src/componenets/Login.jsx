import Input from "./Input";
import FormButton from "./FormButton";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { setUser } from "../store/slices/userSlice";
import { persistor } from "../store";


const Login = () => {
  const [loginUserData, setLoginUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        "https://localhost:7126/login",
        loginUserData
      );

      const userResponse = await axios.get(
        `https://localhost:7126/api/v1/user/${loginUserData.email}`
      );

      dispatch(setUser(userResponse.data));

      const userRole = userResponse.data.role;

      if (userRole === "admin") {
        navigate("/admin/dashboard");
      }
      // eslint-disable-next-line no-lone-blocks
      else {
        navigate("/client/dashboard");
      }
      persistor.persist();  
    } catch (error) {
      console.error("Can't log in this user", error.message);
    }
  };

  const inputHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setLoginUserData({ ...loginUserData, [name]: value });
  };

  return (
    <div className="flex flex-col space-y-4 mx-auto items-center px-5 py-5 bg-lighter rounded-2xl">
      <h1 className="text-xl text-typo">Welcome back!</h1>
      <form className="flex flex-col space-y-5">
        <Input
          diff="email"
          title="E-mail"
          name="email"
          value={loginUserData.email}
          onChange={inputHandler}
        />
        <Input
          diff="password"
          title="Password"
          name="password"
          value={loginUserData.password}
          onChange={inputHandler}
        />
        <FormButton onClick={loginHandler} text="Log in" />
      </form>
      <p className="text-typo text-sm">You don't have an account?</p>
      <Link to="/register">
        <p className="text-typo text-sm font-bold">Register</p>
      </Link>
    </div>
  );
};

export default Login;
