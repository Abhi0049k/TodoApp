import { FC } from "react";
import TodoForm from "components/TodoForm";
import TodoList from "components/TodoList";

const Todo: FC = () => {
    return (
        <div className="flex my-5 gap-5 h-[689px] items-center w-[80%] mx-auto">
            <TodoForm />
            <TodoList />
        </div>
    )
}

export default Todo