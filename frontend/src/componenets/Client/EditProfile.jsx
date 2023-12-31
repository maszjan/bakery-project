import Input from "../Input";
import { useSelector } from "react-redux";
import axios from "axios";
import FormButton from "../FormButton";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { selectUser } from "../../store/slices/userSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";

const EditProfile = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  const editedData = {
    id: userData.id,
    email: userData.email,
    name: userData.name,
    surName: userData.surName,
    address: userData.address,
    city: userData.city,
    postcode: userData.postcode,
    country: userData.country,
    isCompanyClient: userData.isCompanyClient,
  };
  const [editUserData, setEditUserData] = useState(editedData);

  const editHandler = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.put(
        `https://localhost:7126/api/v1/user/${userData.id}`,
        editUserData
      );

      const updatedUserResponse = await axios.get(
        `https://localhost:7126/api/v1/user/${userData.email}`
      );

      dispatch(setUser(updatedUserResponse.data));
    } catch (error) {
      console.error("Can't edit this user", error.message);
    }
  };

  const inputHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setEditUserData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <form className="flex flex-col md:flex-wrap space-y-2 bg-white border-typo border-2 px-24 py-12 rounded-xl">
      <AiOutlineCloseCircle
        onClick={props.onClick}
        className="cursor-pointer text-2xl absolute right-[770px] top-[320px] text-typo"
      />
      <Input
        diff="id"
        title="Id"
        name="id"
        onChange={inputHandler}
        value={editUserData.id}
        disabled={true}
      />
      <Input
        diff="email"
        title="E-mail"
        name="email"
        onChange={inputHandler}
        value={editUserData.email}
      />
      <Input
        diff="text"
        title="Name"
        name="name"
        onChange={inputHandler}
        value={editUserData.name}
      />
      <Input
        diff="text"
        title="Surname"
        name="surName"
        onChange={inputHandler}
        value={editUserData.surName}
      />
      <Input
        diff="text"
        title="Addres"
        name="address"
        onChange={inputHandler}
        value={editUserData.address}
      />
      <Input
        diff="text"
        title="City"
        name="city"
        onChange={inputHandler}
        value={editUserData.city}
      />
      <Input
        diff="text"
        title="Postcode"
        name="postcode"
        onChange={inputHandler}
        value={editUserData.postcode}
      />
      <Input
        diff="text"
        title="Country"
        name="country"
        onChange={inputHandler}
        value={editUserData.country}
      />
      <Input
        diff="checkbox"
        title="B2B"
        name="isCompanyClient"
        onChange={inputHandler}
        checked={editUserData.isCompanyClient}
      />

      <FormButton onClick={editHandler} text="Update" />
    </form>
  );
};

export default EditProfile;
