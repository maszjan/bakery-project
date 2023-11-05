import { GiSlicedBread } from "react-icons/gi";

const Header = () => {
    return (
    <div className="flex flex-col items-center text-center space-y-5 scale-75 hover:scale-50 mt-16 ml-4 md:mt-0">
        <GiSlicedBread className="h-48 w-48 text-darkBrown" />
        <div className="text-darkBrown font-bold text-6xl w-46">Bakery Managament System</div>
    </div>
    );
}

export default Header;