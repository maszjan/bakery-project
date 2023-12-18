import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { clearUser } from "../store/slices/userSlice";
import { persistor } from "../store/index";
import { CgLogOut } from "react-icons/cg";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(clearUser());
    persistor.purge();
    navigate("/");
  };
  return (
    <button
      className="flex flex-row space-x-2 align-center focus:outline-none text-typo font-sm hover:text-darkest"
      onClick={logoutHandler}
    >
      <CgLogOut />
      <p className="font-bold">Logout</p>
    </button>
  );
};

export default Logout;
