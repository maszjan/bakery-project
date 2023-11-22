import { Link } from 'react-router-dom';
import { IoReturnUpBackOutline } from 'react-icons/io5';


export default function BackLink() {
    return (
    <div className="flex flex-row space-x-2 text-md text-typo hover:text-darkerBrown">
    <IoReturnUpBackOutline/>
    <Link to="/admin/dashboard">Back to dashboard</Link>
  </div>);
}