import ClientsList from "../../componenets/Admin/ClientsTableForAdmin";
import BackLink from "../../componenets/BackLink";

export default function AdminClientsPage() {
  return (
    <div className="flex flex-col space-y-2 items-center mx-auto mt-20 w-[1000px]">
      <BackLink />
      <h1 className="text-4xl font-bold">Clients list</h1>
      <ClientsList />
    </div>
  );
}
