import { Link } from 'react-router-dom';

export default function Panel(props) {
  return(
  <div className='flex flex-col space-y-6 items-center justify-center'>
  <Link to={props.to} icon={props.icon} className="flex flex-col items-center text-7xl  justify-center w-64 h-64 bg-darkBrown text-lightBrown hover:bg-darkerBrown hover:text-darkBrown transition-all">
    {props.icon}
  </Link>
  <h1 className="text-2xl font-bold text-darkBrown">{props.children}</h1>
  </div>
  );
}
