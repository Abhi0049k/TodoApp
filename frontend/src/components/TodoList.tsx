import useTodoLists from "hooks/useTodoLists";
import { FC } from "react";
import Loading from "components/Loading";
import TodoCard from "./TodoCard";
import { BsClipboardCheck } from "react-icons/bs";

const TodoList: FC = () => {
    const { todo, loading } = useTodoLists();
    return (
        <div className="w-[70%] h-full border rounded p-5 overflow-y-auto">
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
                                <BsClipboardCheck className="text-6xl text-gray-400 mb-4" />
                                <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                                    No Tasks added yet!
                                </h2>
                                <p className="text-lg text-blue-500 font-medium">
                                    Add your first task of the day!
                                </p>
                            </div>
                        )
            }
        </div>
    )
}

export default TodoList