import { useCallback, useState } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tokenAtom } from "store/TokenAtom";
import { changeListAtom } from "store/ChangeListAtom";
const backendServerUrl = import.meta.env.VITE_BACKEND_SERVER_URL;

const useAddTodo = () => {
    const [todo, setTodo] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const setChangeList = useSetRecoilState(changeListAtom)
    const token = useRecoilValue(tokenAtom);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setTodo(value);
    }, [])

    const handleAddTodo = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(() => true);
        try {
            await axios.post(`${backendServerUrl}todo`, { task: todo }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            })
            setChangeList((prev) => !prev)
            setTodo(() => "");
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    }, [todo, token, setChangeList])

    return { todo, handleChange, handleAddTodo, loading }
}

export default useAddTodo