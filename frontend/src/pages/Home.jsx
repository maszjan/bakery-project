import Login from "../componenets/Login";
import Register from "../componenets/Register";
import Header from "../componenets/Header";

export default function HomePage() {
  return (
    <div className="flex flex-col md:flex-row space-y-20 md:space-y-0 md:space-x-0 mx-auto md:mx-24 mt-24 justify-center items-center md:overflow-hidden">
      <Login />
      <Header />
      <Register />
    </div>
  );
}
