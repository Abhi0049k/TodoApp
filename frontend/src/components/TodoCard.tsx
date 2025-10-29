import useTodosAction from "hooks/useTodosAction";
import { FC, memo } from "react";
import { MdDeleteOutline, MdOutlinePendingActions, MdOutlineDone } from "react-icons/md";
import { todoPropI } from "shared/types";

const TodoCard: FC<todoPropI> = ({ id, task, status }) => {
    const { updateTodo, deleteTodo } = useTodosAction()

    return (
        <div className="flex p-5 justify-between items-center rounded h-16 border bg-white dark:bg-gray-800 dark:border-gray-700">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{task}</h1>
            <div className="flex gap-4">
                <button className={`border h-fit py-2 px-4 text-lg flex gap-2 items-center rounded focus:outline-none focus:ring focus:border-blue-300 dark:border-gray-600 ${status ? 'bg-green-300 hover:bg-green-500 dark:bg-green-600 dark:hover:bg-green-700' : 'bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700'}`} onClick={() => updateTodo(id)} disabled={status}>
                    {status ? <><MdOutlineDone /> Completed</> : <><MdOutlinePendingActions /> Pending</>}
                </button>
                <button className="bg-red-300 hover:bg-red-400 dark:bg-red-600 dark:hover:bg-red-700 rounded focus:outline-none focus:ring focus:border-blue-300 p-3 border dark:border-gray-600" onClick={() => deleteTodo(id)}>
                    <MdDeleteOutline className="text-xl" />
                </button>
            </div>
        </div>
    )
}

export default memo(TodoCard);