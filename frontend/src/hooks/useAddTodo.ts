import { useCallback, useState } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tokenAtom } from "store/TokenAtom";
import { changeListAtom } from "store/ChangeListAtom";
const backendServerUrl = import.meta.env.VITE_BACKEND_SERVER_URL;

const useAddTodo = () => {
    const [task, setTask] = useState<string>("");
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState<boolean>(false);
    const setChangeList = useSetRecoilState(changeListAtom)
    const token = useRecoilValue(tokenAtom);


    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        if (name === "task") setTask(value);
        if(name === "description") setDescription(value);
    }, [])

    const handleAddTodo = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!task.trim()) return;

        setLoading(() => true);
        try {
            await axios.post(`${backendServerUrl}todo`, { task, description }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            })
            setTask("")
            setDescription("")

            setChangeList((prev) => !prev)
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    }, [task, description, token, setChangeList])

    return { task, description, handleChange, handleAddTodo, loading }
}

export default useAddTodo