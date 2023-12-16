import { Link } from "react-router-dom";

export default function ErrorPageRole() {
  return (
    <div className="flex flex-col mt-56 space-y-20 items-center font-bold ">
      <h2>You are not able to reach this address</h2>
      <p></p>
      <Link to="/" className="text-typo border-2 p-5 border-typo">
        Go back to Home site
      </Link>
    </div>
  );
}
