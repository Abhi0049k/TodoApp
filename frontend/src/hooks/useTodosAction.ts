import axios from "axios";
import { useCallback } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { changeListAtom } from "store/ChangeListAtom";
import { tokenAtom } from "store/TokenAtom";
const backendServerUrl = import.meta.env.VITE_BACKEND_SERVER_URL

const useTodosAction = () => {
    const token = useRecoilValue(tokenAtom);
    const setChangeList = useSetRecoilState(changeListAtom);

    const updateTodo = useCallback(async (id: string) => {
        try {
            await axios.patch(`${backendServerUrl}todo/${id}`, {}, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            })
            setChangeList((prev) => !prev);
        } catch (err) {
            console.log(err);
        }
    }, [token, setChangeList])

    const deleteTodo = useCallback(async (id: string) => {
        try {
            await axios.delete(`${backendServerUrl}todo/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            })
            setChangeList((prev) => !prev);
        } catch (err) {
            console.log(err);
        }
    }, [token, setChangeList])

    return { updateTodo, deleteTodo }
}

export default useTodosAction