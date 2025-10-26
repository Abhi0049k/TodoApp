import React, { useCallback, useState } from "react";
import { Action, CredentialsI } from "shared/types";
import axios, { AxiosResponse } from "axios";
import { useSetRecoilState } from "recoil";
import { tokenAtom } from "store/TokenAtom";
import { useNavigate } from "react-router-dom";
import { userAtom } from "store/UserAtom";

const backendServerUrl = import.meta.env.VITE_BACKEND_SERVER_URL;

const initialState: CredentialsI = {
  email: "",
  password: "",
};


// interface ErrorResponse {
    //     Error?: string;
    //     message?: string;
    // }
    
    const useAuthentication = (action: string) => {
        const [credentials, setCredentials] = useState<CredentialsI>(initialState);
        const [loading, setLoading] = useState<boolean>(false);
        const [error, setError] = useState<string>("");
        const setToken = useSetRecoilState(tokenAtom);
        const navigate = useNavigate();
        const setUser = useSetRecoilState(userAtom);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const val: string = event.target.value;
      const name: string = event.target.name;
      setCredentials((previousState) => ({
        ...previousState,
        ...{ [name]: val },
      }));
      // Clear error when user starts typing
      if (error) setError("");
    },
    [error]
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError("");
      setLoading(true);

      try {
        if (action === Action.signin) {
          const res: AxiosResponse = await axios.post(
            `${backendServerUrl}user/${Action.signin}`,
            credentials
          );
          setToken(res.data?.token);

          //   saved user name to localStorage
          if (res.data?.user) {
            setUser({
              name: res.data.user.name,
              email: res.data.user.email,
            });
          } else {
            // fallback in case backend doesn't send name
            setUser({
              name: credentials.email.split("@")[0],
              email: credentials.email,
            });
          }

          navigate("/");
        } else {
          await axios.post(
            `${backendServerUrl}user/${Action.signup}`,
            credentials
          );
          navigate("/login");
        }
      } catch (err: any) {
        let errorMessage = "Something went wrong. Please try again.";

        if (err?.response?.data?.Error) {
          const backendError = err.response.data.Error;

          // Customize error messages based on backend response
          if (backendError === "Invalid Input") {
            if (action === Action.signup) {
              errorMessage = "Password must be at least 8 characters long.";
            } else {
              errorMessage = "Please check your email and password.";
            }
          } else if (backendError === "User Already Exists") {
            errorMessage =
              "This email is already registered. Please login instead.";
          } else if (backendError === "User Doesn't Exist") {
            errorMessage =
              "No account found with this email. Please register first.";
          } else if (backendError === "Wrong Password") {
            errorMessage = "Incorrect password. Please try again.";
          } else {
            errorMessage = backendError;
          }
        } else if (err?.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (!err?.response) {
          errorMessage =
            "Unable to connect to server. Please check your connection.";
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [credentials, action, setToken, navigate]
  );

  return { credentials, handleChange, handleSubmit, loading, error };
};

export default useAuthentication;
