import Panel from "../../componenets/Panel";
import Logout from "../../componenets/Logout";
import { GiSlicedBread, GiBread } from 'react-icons/gi';
import { BsFillFilePersonFill } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const ClientDashboardPage = () => {
  return (
    <div className="flex flex-col items-center py-24">
      <h1 className="text-4xl font-bold  text-typo px-12 py-12">
        Dashboard
      </h1>
      <Logout/>
      <div className="grid grid-cols-1 md:grid-cols-4 justify-items-start gap-x-5 gap-y-5 font-bold">
        <Panel to="/client/newOrder" icon={<GiBread />}>Create new Order</Panel>
        <Panel to="/client/ordersList" icon={<AiOutlineShoppingCart />}> Your Orders</Panel>
        <Panel to="/client/productList" icon={<GiSlicedBread />}> Products List</Panel>
        <Panel to="/client/profile" icon={<BsFillFilePersonFill />}>Client Profile</Panel>
      </div>
    </div>
  );
};

export default ClientDashboardPage;
