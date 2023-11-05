import ProductsList from "../../componenets/Admin/ProductTableForAdmin";
import BackLink from "../../componenets/BackLink";

export default function AdminProductsPage() {
  return (
    <div className="flex flex-col space-y-2 items-center mx-auto mt-20 w-[1000px]">
    <BackLink/>
      <h1 className="text-4xl font-bold">Products list</h1>
      <ProductsList />
    </div>
  );
}
