import BackLinkClient from "../../componenets/BackLinkClient";
import Profile from "../../componenets/Client/Profile";


const ClientProfile = () => {
  
    return (
        <div className="flex flex-col space-y-5 mx-auto items-center my-64">
            <BackLinkClient />
            <Profile />
        </div>
    );
}

export default ClientProfile;