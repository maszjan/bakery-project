import { Link } from 'react-router-dom';
import { IoReturnUpBackOutline } from 'react-icons/io5';


export default function BackLinkLogin() {
    return (
    <div className="flex flex-row space-x-2 text-md text-typo hover:text-darkest">
    <IoReturnUpBackOutline/>
    <Link to="/">Back to login</Link>
  </div>);
}