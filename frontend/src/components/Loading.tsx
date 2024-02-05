import { FC } from "react";

const Loading: FC = () => {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="h-6 w-6 border-[4px] border-slate-800 border-l-transparent border-r-transport rounded-full animate-spin"></div>
        </div>
    )
}

export default Loading;