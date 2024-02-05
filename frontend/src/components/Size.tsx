import { FC } from "react";
import { childrenPropI } from "shared/types";

const Size: FC<childrenPropI> = ({ children }) => {
    return (
        <div className="h-screen w-full">
            {children}
        </div>
    )
}

export default Size