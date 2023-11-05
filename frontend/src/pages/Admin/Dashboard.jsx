import Panel from "../../componenets/Panel";

import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsFillPeopleFill } from "react-icons/bs";
import { GiPowderBag, GiSlicedBread } from 'react-icons/gi';

const AdminDashboardPage = () => {
  return (
    <div className="flex flex-col text-darkBrown items-center py-24">
      <h1 className="text-4xl font-bold  text-darkBrown px-12 py-12">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 justify-items-start gap-x-5 gap-y-5 font-bold">
        <Panel to="/admin/clientslist" icon={<BsFillPeopleFill />}>Clients</Panel>
        <Panel to="/admin/orderslist" icon={<AiOutlineShoppingCart />}>Orders</Panel>
        <Panel to="/admin/productsList" icon={<GiSlicedBread />}>Products</Panel>
        <Panel to="/admin/ingredientsList" icon={<GiPowderBag />}>Ingredients</Panel>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
