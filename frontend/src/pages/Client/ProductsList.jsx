import ClientProductsList from "../../componenets/Client/ProductTableForClient";
import BackLinkClient from "../../componenets/BackLinkClient";

const ProductsList = () => { 
    return (
        <div className="flex flex-col space-y-2 items-center mx-auto mt-20 w-[1000px]">
    <BackLinkClient/>
      <h1 className="text-4xl font-bold">Products list</h1>
        <ClientProductsList/>
        </div>
    );
}

export default ProductsList;