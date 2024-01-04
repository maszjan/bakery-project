import { Card, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { AiOutlineEdit, AiOutlineCloseCircle } from "react-icons/ai";
import { RiAiGenerate } from "react-icons/ri";
import { FaFileDownload } from "react-icons/fa";
import axios from "axios";
import download from "downloadjs";
import EditOrder from "./EditOrder";

const OrdersList = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [ingredients, setIngredients] = useState([]);

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

  const fetchIngredients = async (orderId) => {
    try {
      const response = await axios.get(
        `https://localhost:7126/api/v1/generateIngredients/${orderId}`
      );
      setIngredients(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Can't generate ingredients", error.message);
    }
  };

  const generateIngredients = (orderId) => {
    fetchIngredients(orderId);
    setModalOpen(true);
  };

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

  const summedIngredients = new Map();

  for (const ingredient of ingredients) {
    if (summedIngredients.has(ingredient.ingredientId)) {
      summedIngredients.get(ingredient.ingredientId).quantity +=
        ingredient.quantity;
    } else {
      summedIngredients.set(ingredient.ingredientId, { ...ingredient });
    }
  }

  const uniqueIngredients = Array.from(summedIngredients.values());

  const TABLE_HEAD = [
    "Id",
    "User Id",
    "Orders Status",
    "Order Total",
    "Document",
    "Order created at",
    "Order Items",
    "Generate Ingredients",
    "Edit",
    "Remove",
  ];

  return (
    <div>
      {modalOpen && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Ingredients
                    </h3>
                    {uniqueIngredients.map((item, index) => (
                      <div key={index} className="mt-2">
                        <p className="text-sm text-black">
                          <p className="font-bold text-typo">{item.ingredientName}</p> Quantity:{" "}
                          {item.quantity} {item.unit}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
            {ordersData.map(
              (
                {
                  id,
                  userId,
                  orderStatus,
                  orderTotal,
                  orderCreatedAt,
                  orderItems,
                },
                index
              ) => {
                const isLast = index === ordersData.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-typo";

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
                        className="font-normal mx-5"
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
                      <table className="border-black border-2">
                        <thead>
                          <tr className="border-black border-2">
                            <th className="border-black border-2">Product</th>
                            <th className="border-black border-2">Quantity</th>
                            <th className="border-black border-2">Price</th>
                            <th className="border-black border-2">Discount</th>
                            <th className="border-black border-2">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderItems.map((item, index) => (
                            <tr className="border-black border-2" key={index}>
                              <td className="border-black border-2">
                                {item.product.name}
                              </td>
                              <td className="border-black border-2">
                                {item.qunatity}
                              </td>
                              <td className="border-black border-2">
                                ${item.price}
                              </td>
                              <td className="border-black border-2">
                                ${item.discount}
                              </td>
                              <td className="border-black border-2">
                                ${item.totalPrice}
                              </td>
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
                          onClick={() => generateIngredients(id)}
                          className="mx-16 hover:text-yellow-600"
                        >
                          <RiAiGenerate />
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
                          className="focus:outline-none flex mx-auto items-center hover:text-blue-500"
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
                          className="focus:outline-none flex mx-auto items-center hover:text-red-500"
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
