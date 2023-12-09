import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { clearUser } from "../store/slices/userSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const logoutHandler = () => {
    dispatch(clearUser());
    navigate("/")
  }
  return <button className="focus:outline-none text-typo font-sm hover:text-darkest" onClick={logoutHandler}>Logout</button>;
};

export default Logout;
