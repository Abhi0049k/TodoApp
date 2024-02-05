import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { childrenPropI } from "shared/types";
import { tokenAtom } from "store/TokenAtom";

const ProtectedRoute: FC<childrenPropI> = ({ children }) => {
    const token = useRecoilValue<string>(tokenAtom)
    return token ? children : <Navigate to={"/login"} />
}

export default ProtectedRoute