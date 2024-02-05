import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { tokenAtom } from "store/TokenAtom";

const useLogout = () => {
    const setToken = useSetRecoilState(tokenAtom);
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        setToken(() => "");
        navigate("/login");
    }, [setToken, navigate])

    return { handleLogout }
}

export default useLogout;