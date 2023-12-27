import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import FormButton from "../FormButton";
import axios from "axios";

export default function OrderForm() {
  const user = useSelector(selectUser);
  const userId = user.id;
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({
    userId: userId,
    orderStatus: "",
    orderTotal: 0,
    document: "",
    orderCreatedAt: new Date().toISOString(),
    orderItems: [],
  });

  useEffect(() => {
    axios
      .get("https://localhost:7126/api/v1/product")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Failed to fetch products", error));
  }, []);

  const handleProductClick = (product) => {
    setOrder((prevOrder) => {
      const existingItemIndex = prevOrder.orderItems.findIndex(
        (item) => item.productId === product.id
      );
  
      let newOrderItems;
  
      if (existingItemIndex !== -1) {
        // If the product is already in the order, increase its quantity
        newOrderItems = [...prevOrder.orderItems];
        newOrderItems[existingItemIndex] = {
          ...newOrderItems[existingItemIndex],
          qunatity: newOrderItems[existingItemIndex].qunatity + 1,
          totalPrice: (newOrderItems[existingItemIndex].qunatity + 1) * product.price,
        };
      } else {
        // If the product is not in the order, add it
        newOrderItems = [
          ...prevOrder.orderItems,
          {
            productId: product.id,
            product: {
              id: product.id,
              name: product.name,
              price: product.price,
            },
            qunatity: 1,
            price: product.price,
            discount: 0, 
            totalPrice: product.price,
          },
        ];
      }
  
      // Calculate the new total for the order
      const newTotal = newOrderItems.reduce((total, item) => total + item.totalPrice, 0);
      setTotal(newTotal);

      return { ...prevOrder, orderItems: newOrderItems, orderTotal: newTotal };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update the total price in the order before sending the request
    const orderWithTotal = { 
      ...order, 
      orderTotal: total,
      orderItems: order.orderItems.map(item => ({
        ...item,
        productId: item.productId
      })),
    };
  

    try {
      await axios.post("https://localhost:7126/api/v1/order", orderWithTotal);
      setOrder({ orderItems: [] });
      setTotal(0); // Reset the total price
    } catch (error) {
      console.error("Failed to submit order", error);
    }
  };
  const handleRemoveClick = (indexToRemove) => {
    setOrder((prevOrder) => {
      const newOrderItems = prevOrder.orderItems.filter(
        (item, index) => index !== indexToRemove
      );
      return { ...prevOrder, orderItems: newOrderItems };
    });

    setTotal((prevTotal) => prevTotal - order.orderItems[indexToRemove].price * order.orderItems[indexToRemove].quantity);
  };

  return (
    <div>
      <h1 className="text-typo text-2xl mx-9">Select Products</h1>
      <div className="flex flex-row space-x-2 items-center justify-center mx-auto p-2">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product)}
            className="w-16 h-16 border border-typo hover:border-white hover:bg-typo hover:text-white flex flex-col items-center justify-center cursor-pointer"
          >
            <p className="font-bold text-lg">{product.name}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
      <div className="mx-9">
        <h2 className="font-bold text-typo">Selected Products:</h2>
        {order.orderItems.map((item, index) => (
          <div className="flex flex-row space-x-2" key={index}>
            <p>
              {item.product.name}: {item.qunatity} x ${item.price}
            </p>
            <button
              className="text-typo hover:text-red-600"
              onClick={() => handleRemoveClick(index)}
            >
              <AiOutlineCloseCircle />
            </button>
          </div>
        ))}
        <p className="font-bold">Total: ${total}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <FormButton text="Place Order"></FormButton>
      </form>
    </div>
  );
}
