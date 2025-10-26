import useTodoLists from "hooks/useTodoLists";
import { FC } from "react";
import Loading from "components/Loading";
import TodoCard from "./TodoCard";
import { BsClipboardCheck } from "react-icons/bs";

const TodoList: FC = () => {
    const { todo, loading } = useTodoLists();
    return (
        <div className="w-[70%] h-full border bg-white dark:bg-gray-800 dark:border-gray-700 rounded p-5 overflow-y-auto">
            {
                loading
                    ? <Loading />
                    : todo && todo.length > 0 
                        ? (
                            <div className="flex gap-5 flex-col">
                                {todo.map((el) => <TodoCard key={el.id} id={el.id} status={el.status} task={el.task} />)}
                            </div>
                        )
                        : (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <BsClipboardCheck className="text-6xl text-gray-400 dark:text-gray-500 mb-4" />
                                <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                                    No Tasks added yet!
                                </h2>
                                <p className="text-lg text-blue-500 dark:text-blue-400 font-medium">
                                    Add your first task of the day!
                                </p>
                            </div>
                        )
            }
        </div>
    )
}

export default TodoList