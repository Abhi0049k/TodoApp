import React, { useCallback, useState } from "react";
import { Action, CredentialsI } from "shared/types";
import axios, { AxiosResponse } from "axios";
import { useSetRecoilState } from "recoil";
import { tokenAtom } from "store/TokenAtom";
import { useNavigate } from "react-router-dom";

const backendServerUrl = import.meta.env.VITE_BACKEND_SERVER_URL;

const initialState: CredentialsI = {
    email: "",
    password: "",
}

const useAuthentication = (action: string) => {
    const [credentials, setCredentials] = useState<CredentialsI>(initialState);
    const [loading, setLoading] = useState<boolean>(false);
    const setToken = useSetRecoilState(tokenAtom);
    const navigate = useNavigate();

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const val: string = event.target.value;
        const name: string = event.target.name;
        setCredentials((previousState) => ({ ...previousState, ...{ [name]: val } }))
    }, [])

    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(() => true)
        try {
            if (action === Action.signin) {
                const res: AxiosResponse = await axios.post(`${backendServerUrl}user/${Action.signin}`, credentials);
                setToken(() => res.data?.token)
                navigate('/');
            } else {
                await axios.post(`${backendServerUrl}user/${Action.signup}`, credentials);
                navigate('/login');
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(() => false);
        }
    }, [credentials, action, setToken, navigate])

    return { credentials, handleChange, handleSubmit, loading }
}

export default useAuthentication