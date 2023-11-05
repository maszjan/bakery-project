import OrdersList from "../../componenets/Admin/OrdersTableForAdmin";
import BackLink from "../../componenets/BackLink";

export default function AdminOrdersPage() {
  return (
    <div className="flex flex-col space-y-2 items-center mx-auto mt-20 w-[1000px]">
   <BackLink/>
      <h1 className="text-4xl font-bold">Orders list</h1>
      <OrdersList />
    </div>
  );
}
