import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import EditProfile from "./EditProfile";

const Profile = () => {
  const userData = useSelector(selectUser);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);


  const openEditHandler = (e) => {
    e.preventDefault();
    setIsEditModalVisible(true);
  };

  const closeEditHandler = (e) => {
    e.preventDefault();
    setIsEditModalVisible(false);
  };

  return (
    <div className="flex flex-col space-y-3 bg-darkest mx-auto items-center w-96 rounded-xl my-14">
      {isEditModalVisible ? <EditProfile onClick={closeEditHandler} /> : ""}
      <h1 className="font-bold text-2xl text-typo my-4">Your Profile</h1>
      <div className="flex flex-row space-x-2 my-2">
        <p className="font-bold text-typo">Name:</p>
        <p className="text-typo">{userData.name}</p>
      </div>
      <div className="flex flex-row space-x-2 my-2">
        <p className="font-bold text-typo">Surname:</p>
        <p className="text-typo">{userData.surName}</p>
      </div>
      <div className="flex flex-row space-x-2 my-2">
        <p className="font-bold text-typo">Email:</p>
        <p className="text-typo">{userData.email}</p>
      </div>
      <div className="flex flex-row space-x-2 my-2">
        <p className="font-bold text-typo">Address:</p>
        <p className="text-typo">{userData.address}</p>
      </div>
      <div className="flex flex-row space-x-2 my-2">
        <p className="font-bold text-typo">City:</p>
        <p className="text-typo">{userData.city}</p>
      </div>
      <div className="flex flex-row space-x-2 my-2">
        <p className="font-bold text-typo">Postcode:</p>
        <p className="text-typo">{userData.postcode}</p>
      </div>
      <div className="flex flex-row space-x-2 my-2">
        <p className="font-bold text-typo">B2B:</p>
        <p className="text-typo">{userData.isCompanyClient ? "Yes" : "No"}</p>
      </div>
      <div className="py-5 ">
        <button
          onClick={openEditHandler}
          className="flex flex-row space-x-2 text-typo mx-5 align-center hover:scale-125">
          <FaEdit />
          <p className="font-bold">Edit</p>
        </button>
      </div>
    </div>
  );
};

export default Profile;
