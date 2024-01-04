import { Card, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { AiOutlineEdit, AiOutlineCloseCircle } from 'react-icons/ai';
import axios from "axios";
import EditClient from "./EditClient";


const ClientsList = (props) => {
  const [usersData, setUsersData] = useState([]);
  const [isEditModalVisible,setIsEditModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7126/api/v1/user");
        setUsersData(response.data);
      } catch (error) {
        console.error(error.message);
      };  
    };
    fetchData();
  }, []);

  const openEditHandler = (e, record) => {
    e.preventDefault();
    setSelectedRecord(record);
    setIsEditModalVisible(true);
  }

  const closeEditHandler = (e) => {
    e.preventDefault()
    setIsEditModalVisible(false);
  }

  const deleteUserHandler = async (e, record) => {
    e.preventDefault();
    setSelectedRecord(record);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.delete(
        `https://localhost:7126/api/v1/user/${record.id}`,
      );
      
    } catch (error) {
      console.error("Can't delete this user", error.message);
    }
  }

  

  const TABLE_HEAD = [
    "Id",
    "Name",
    "Email",
    "Address",
    "City",
    "Postcode",
    'Country',
    "B2B",
    "Edit",
    "Remove"
  ];

  return (
    <div>
    {isEditModalVisible ? <EditClient record={selectedRecord} onClick={closeEditHandler}/> : ""}
      <Card className="h-full w-full">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-typo p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {usersData.map(
              (
                {
                  id,
                  name,
                  email,
                  address,
                  city,
                  postcode,
                  country,
                  isCompanyClient,
                },
                index
              ) => {
                const isLast = index === usersData.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-darkest";

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="brown" 
                        className="font-normal"
                      >
                        {id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {address}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {city}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {postcode}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {country}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {isCompanyClient ? "Yes" : "No"}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        <button className="focus:outline-none flex mx-auto items-center hover:text-blue-500" onClick={(event) => openEditHandler(event, {
                            id,
                            name,
                            email,
                            address,
                            city,
                            postcode,
                            country,
                            isCompanyClient,
                          })}>
                          <AiOutlineEdit/>
                        </button>
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        <button className="focus:outline-none flex mx-auto items-center hover:text-red-500" onClick={(event) => deleteUserHandler(event, {
                            id
                          })}>
                          <AiOutlineCloseCircle/>
                        </button>
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ClientsList;
