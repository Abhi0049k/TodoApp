import { atom } from "recoil";

export const changeListAtom = atom<boolean>({
    key: "changeList",
    default: false
})