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
        setToken(() => "");
        resetUser();
        localStorage.clear();
        navigate("/login");
    }, [setToken, resetUser, navigate])

    return { handleLogout }
}

export default useLogout;