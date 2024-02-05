import Navbar from "components/Navbar";
import Todo from "components/Todo";
import { FC, useEffect } from "react";

const Home: FC = () => {
    useEffect(() => {
        document.title = "Todo App";
    }, [])

    return (
        <>
            <Navbar />
            <Todo />
        </>
    );
}

export default Home;