import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex flex-col mt-56 space-y-20 items-center font-bold ">
      <h2>Error 404</h2>
      <p> This site doesn't exists</p>
      <Link to="/" className="text-typo border-2 p-5 border-typo">
        Go back to Home site
      </Link>
    </div>
  );
}
