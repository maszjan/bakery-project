import { Card, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import axios from "axios";

const ClientOrderTable = () => {
  const userData = useSelector(selectUser);
  const userID = userData.id;
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7126/api/v1/order/user/${userID}`);
        setOrdersData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [userID]);

  const TABLE_HEAD = [
    "Id",
    "Orders Status",
    "Order Total",
    "Document",
    "Order created at",
  ];

  return (
    <div>
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
            {ordersData.map(
              (
                { id, orderStatus, orderTotal, document, orderCreatedAt },
                index
              ) => {
                const isLast = index === ordersData.length - 1;
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
                        {orderStatus}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {orderTotal}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {document}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {orderCreatedAt}
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

export default ClientOrderTable;
