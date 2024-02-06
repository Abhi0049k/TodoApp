import useAddTodo from "hooks/useAddTodo";
import { FC } from "react";
import Loading from "components/Loading";

const TodoForm: FC = () => {
    const { todo, handleChange, handleAddTodo, loading } = useAddTodo();
    return (
        <div className="w-[30%]">
            <div className="bg-white rounded-md shadow-md p-8 h-fit border">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add Todo</h2>
                <form className="flex flex-col"
                    onSubmit={handleAddTodo}
                >
                    <div className="mb-4">
                        <label htmlFor="todo" className="block text-sm font-medium text-gray-600">
                            Todo
                        </label>
                        <input
                            type="text"
                            id="todo"
                            name="todo"
                            onChange={handleChange}
                            value={todo}
                            className="mt-1 p-2 w-full border rounded-md"
                            placeholder="Todo"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white max-h-10 py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        disabled={loading}
                    >
                        {
                            loading ?
                                <Loading />
                                : "Add Todo"
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default TodoForm