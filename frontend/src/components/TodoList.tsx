import useTodoLists from "hooks/useTodoLists";
import { FC } from "react";
import Loading from "components/Loading";
import TodoCard from "./TodoCard";

const TodoList: FC = () => {
    const { todo, loading } = useTodoLists();
    console.log(todo);
    return (
        <div className="w-[70%] h-full border rounded p-5 overflow-y-auto">
            {
                loading
                    ? <Loading />
                    : (
                        <div className="flex gap-5 flex-col">
                            {todo?.map((el) => <TodoCard key={el._id} _id={el._id} status={el.status} task={el.task} />)}
                        </div>
                    )
            }
        </div>
    )
}

export default TodoList