import { atom } from "recoil";

export const tokenAtom = atom<string>({
    key: "token",
    default: ""
})