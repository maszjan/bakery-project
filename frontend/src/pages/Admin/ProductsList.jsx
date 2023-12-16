import ProductsList from "../../componenets/Admin/ProductTableForAdmin";
import BackLink from "../../componenets/BackLink";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import AddProduct from "../../componenets/Admin/AddProduct";


export default function AdminProductsPage() {
  
  const [showAddProduct, setShowAddProduct] = useState(false);
  const openAddProductHandler = (event) => {
    event.preventDefault()
    setShowAddProduct(true);
  }

  const closeAddProductHandler = (event) => {
    event.preventDefault()
    setShowAddProduct(false);
  }
  
  return (
    <div className="flex flex-col space-y-2 items-center mx-auto mt-20 w-[1000px]">
    <BackLink/>
      <h1 className="text-4xl font-bold">Products list</h1>
      <button onClick={openAddProductHandler} className="text-typo hover:scale-150" >
      <div className="flex flex-row space-x-2 items-center">
        <IoIosAddCircleOutline />
        <p>Add Product</p>
      </div>
      </button>
      {showAddProduct ? <AddProduct onClick={closeAddProductHandler}/> : ''}
      <ProductsList />
    </div>
  );
}
