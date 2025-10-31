import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { tokenAtom } from "store/TokenAtom";
import { userAtom } from "store/UserAtom";

const useLogout = () => {
    const setToken = useSetRecoilState(tokenAtom);
    const navigate = useNavigate();
    const resetUser = useResetRecoilState(userAtom);

    const handleLogout = useCallback(() => {
        // Clear token from Recoil state
        setToken("");
        // Clear user data from Recoil state
        resetUser();
        // Clear token from localStorage
        localStorage.removeItem("token");
        // Navigate to login page
        navigate("/login");
    }, [setToken, resetUser, navigate])

    return { handleLogout }
}

export default useLogout;