import useLogout from "hooks/useLogout";
import { FC } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { useRecoilValue } from "recoil";
import { userAtom } from "store/UserAtom";

const Navbar: FC = () => {
  const { handleLogout } = useLogout();
  const user = useRecoilValue(userAtom);

  return (
    <div className="border h-14 flex px-10 items-center justify-between">
      <h1 className="text-2xl font-semibold">Todo App</h1>

      <div className="flex items-center gap-4">
        {user && (
          <span className="text-gray-800 text-lg font-semibold">
            Hi,<span className="text-blue-600">{user.name}</span>
          </span>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-gray-100 text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <IoLogOutOutline className="text-xl" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
