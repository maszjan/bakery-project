import ClientOrderTable from "../../componenets/Client/ClientOrderTable";
import BackLinkClient from "../../componenets/BackLinkClient";


const OrdersList = () => {
  
  return (
    <div className="flex flex-col space-y-2 items-center mx-auto mt-20 w-[1000px]">
      <BackLinkClient />
      <h1 className="text-4xl font-bold">Your orders</h1>
      <ClientOrderTable />
    </div>
  );
};

export default OrdersList;
