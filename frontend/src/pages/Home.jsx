import Login from "../componenets/Login";
import Header from "../componenets/Header";

export default function HomePage() {
  return (
    <div className="flex flex-col space-y-20 mx-auto mt-6 xl:mt-32 justify-center items-center md:overflow-hidden">
      <Header />
      <Login />    
    </div>
  );
}
