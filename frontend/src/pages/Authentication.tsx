import Loading from "components/Loading";
import useAuthentication from "hooks/useAuthentication";
import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { Action, ActionI } from "shared/types";

const Authentication: FC<ActionI> = ({ action }) => {
    const { credentials, handleChange, handleSubmit, loading } = useAuthentication(action);
    useEffect(() => {
        if (action === Action.signin)
            document.title = "Todo App | Login"
        else if (action === Action.signup)
            document.title = "Todo App | Register"
    }, [action])

    return (
        <div className="flex bg-slate-200 h-screen w-full justify-center items-center">
            <div className="bg-white rounded-md shadow-md p-8 h-fit">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">{action === Action.signin ? "Login" : "Register"}</h2>
                <form className="w-96 flex flex-col"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white max-h-10 py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        {
                            loading ?
                                <Loading />
                                : action === Action.signin ? "Login" : "Register"
                        }
                    </button>
                    <p className="mt-4 text-gray-600 text-lg">
                        {action === Action.signin ? "Don't have an account?  " : "Already have an Account?  "}
                        <Link to={action === Action.signin ? "/register" : "/login"} className="text-blue-500 hover:underline">
                            {action === Action.signin ? "Register here" : "Login here"}
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Authentication