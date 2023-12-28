import { Card, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { AiOutlineEdit, AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import EditOrder from "./EditOrder";

const OrdersList = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7126/api/v1/order");
        setOrdersData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  const openEditHandler = (event, record) => {
    event.preventDefault();
    setSelectedRecord(record);
    setIsEditModalVisible(true);
  };

  const closeEditHandler = (event) => {
    event.preventDefault();
    setIsEditModalVisible(false);
  };
  const deleteOrderHandler = async (e, record) => {
    e.preventDefault();
    setSelectedRecord(record);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.delete(
        `https://localhost:7126/api/v1/order/${record.id}`
      );
    } catch (error) {
      console.error("Can't delete this user", error.message);
    }
  };

  const TABLE_HEAD = [
    "Id",
    "User Id",
    "Orders Status",
    "Order Total",
    "Document",
    "Order created at",
    "Order Items",
    "Edit",
    "Remove",
  ];

  return (
    <div>
      {isEditModalVisible ? (
        <EditOrder record={selectedRecord} onClick={closeEditHandler} />
      ) : (
        ""
      )}
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
                {
                  id,
                  userId,
                  orderStatus,
                  orderTotal,
                  document,
                  orderCreatedAt,
                  orderItems
                },
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
                        {userId}
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
                    <td className={classes}>
                      <table>
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderItems.map((item, index) => (
                            <tr key={index}>
                              <td>{item.product.name}</td>
                              <td>{item.qunatity}</td>
                              <td>${item.price}</td>
                              <td>${item.totalPrice}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        <button
                          className="focus:outline-none flex mx-auto items-center"
                          onClick={(event) =>
                            openEditHandler(event, {
                              id,
                              userId,
                              orderStatus,
                              orderTotal,
                              document,
                            })
                          }
                        >
                          <AiOutlineEdit />
                        </button>
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        <button
                          className="focus:outline-none flex mx-auto items-center"
                          onClick={(event) =>
                            deleteOrderHandler(event, {
                              id,
                            })
                          }
                        >
                          <AiOutlineCloseCircle />
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

export default OrdersList;
