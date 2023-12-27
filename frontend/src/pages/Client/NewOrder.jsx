import BackLinkClient from "../../componenets/BackLinkClient";
import OrderForm from "../../componenets/Client/OrderForm";

const NewOrder = () => {
    return (
        <div className="flex flex-col space-y-2 items-center mx-auto mt-20 w-[1000px]">
      <BackLinkClient />
      <h1 className="text-4xl font-bold">Create new order</h1>
      <OrderForm />
    </div>
    );
}

export default NewOrder;