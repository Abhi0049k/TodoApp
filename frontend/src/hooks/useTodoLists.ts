import axios from "axios";
import { useCallback, useEffect, useState } from "react"
import { useRecoilValue } from "recoil";
import { todoI } from "shared/types";
import { changeListAtom } from "store/ChangeListAtom";
import { tokenAtom } from "store/TokenAtom";
const backendServerUrl = import.meta.env.VITE_BACKEND_SERVER_URL

const useTodoLists = () => {
    const [todo, setTodo] = useState<Array<todoI>>();
    const [loading, setLoading] = useState<boolean>(false);
    const changeList = useRecoilValue(changeListAtom);
    const token = useRecoilValue(tokenAtom);

    const fetchTodo = useCallback(async () => {
        setLoading(() => true);
        try {
            const res = await axios.get(`${backendServerUrl}todo`, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            setTodo(() => res.data)
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(() => false);
        }
    }, [token])

    useEffect(() => {
        fetchTodo();
    }, [fetchTodo, changeList])

    return { todo, loading }
}

export default useTodoLists