import useLogout from "hooks/useLogout";
import { FC } from "react";
import { IoLogOutOutline } from "react-icons/io5";

const Navbar: FC = () => {
    const { handleLogout } = useLogout();

    return (
        <div className="border h-14 flex px-10 items-center justify-between">
            <h1 className="text-2xl font-semibold">Todo App</h1>
            <button className="border flex items-center justify-between text-xl px-4 py-1 rounded hover:bg-gray-200 focus:outline-none focus:ring focus:border-blue-300" onClick={handleLogout}>
                <IoLogOutOutline /> Logout
            </button>
        </div>
    )
}

export default Navbar