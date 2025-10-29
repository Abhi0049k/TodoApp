import { atom } from "recoil";

// Get initial token from localStorage if available
const getInitialToken = (): string => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token") || "";
    }
    return "";
};

export const tokenAtom = atom<string>({
    key: "token",
    default: getInitialToken()
})