import { Card, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import axios from "axios";
import download from "downloadjs";
import { FaFileDownload } from "react-icons/fa";

const ClientOrderTable = () => {
  const userData = useSelector(selectUser);
  const userID = userData.id;
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7126/api/v1/order/user/${userID}`
        );
        setOrdersData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [userID]);

  const fetchInvoice = async (orderID) => {
    try {
      const response = await axios.get(
        `https://localhost:7126/api/v1/${orderID}/document`,
        { responseType: "blob" }
      );
      const contentDisposition = response.headers["content-disposition"];
      let filename = `invoice_${orderID}.pdf`;

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch.length === 2) {
          filename = filenameMatch[1];
        }
      }

      download(response.data, filename, response.headers["content-type"]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const TABLE_HEAD = [
    "Id",
    "Orders Status",
    "Order Total",
    "Document",
    "Order created at",
    "Order Details",
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
                { id, orderStatus, orderTotal, orderCreatedAt, orderItems },
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
                        ${orderTotal}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        <button
                          onClick={() => fetchInvoice(id)}
                          className="mx-6 hover:text-green-400"
                        >
                          <FaFileDownload />
                        </button>
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
                            <th>Discount</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderItems.map((item, index) => (
                            <tr key={index}>
                              <td>{item.product.name}</td>
                              <td>{item.qunatity}</td>
                              <td>${item.price}</td>
                              <td>${item.discount}</td>
                              <td>${item.totalPrice}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
