import useLogout from "hooks/useLogout";
import { useTheme } from "hooks/useTheme";
import { FC } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { useRecoilValue } from "recoil";
import { userAtom } from "store/UserAtom";

const Navbar: FC = () => {
    const { handleLogout } = useLogout();
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="border bg-white dark:bg-gray-800 dark:border-gray-700 h-14 flex px-10 items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Todo App</h1>
            <div className="flex items-center gap-3">
                <button 
                    id="theme-toggle"
                    className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white flex items-center justify-center text-xl p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring focus:border-blue-300" 
                    onClick={toggleTheme}
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {theme === 'light' ? (
                        // Moon icon - when in light mode, show moon to indicate "switch to dark"
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                        </svg>
                    ) : (
                        // Sun icon - when in dark mode, show sun to indicate "switch to light"
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path>
                        </svg>
                    )}
                </button>
                <button className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white flex items-center justify-between text-xl px-4 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring focus:border-blue-300" onClick={handleLogout}>
                    <IoLogOutOutline /> Logout
                </button>
            </div>
        </div>
    )
}
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
