import { Card, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { AiOutlineEdit, AiOutlineCloseCircle } from 'react-icons/ai';
import axios from "axios";
import EditProduct from "./EditProduct";


const ProductsList = () => {
    
  const [productsData, setProductsData] = useState([]);
  const [isEditModalVisible,setIsEditModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7126/api/v1/product");
        setProductsData(response.data);
      } catch (error) {
        console.error(error.message);
      };  
    };
    fetchData();
  }, []);

  const openEditHandler = (event) => {
    event.preventDefault()
    setIsEditModalVisible(true);
  }

  const closeEditHandler = (event) => {
    event.preventDefault()
    setIsEditModalVisible(false);
  }

  const TABLE_HEAD = [
    "Id",
    "Name",
    "Price",
    "Edit",
    "Remove"
  ];

  return (
    <div>
    {isEditModalVisible ? <EditProduct onClick={closeEditHandler}/> : ""}
      <Card className="h-full w-full">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-darkerBrown p-4">
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
            {productsData.map(
              (
                {
                  id,
                  name,
                  price
                },
                index
              ) => {
                const isLast = index === productsData.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-darkBrown";

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
                        {price}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        <button className="focus:outline-none flex mx-auto items-center" onClick={openEditHandler}>
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
                        <button className="focus:outline-none flex mx-auto items-center">
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

export default ProductsList;
