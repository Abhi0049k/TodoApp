// import useAddTodo from "hooks/useAddTodo";
// import { FC } from "react";
// import Loading from "components/Loading";

// const TodoForm: FC = () => {
//     const { todo, handleChange, handleAddTodo, loading } = useAddTodo();
//     return (

//         <div className="w-[30%]">
//     <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 h-fit border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
//         <div className="flex items-center mb-6">
//             <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
//             <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
//                 Add Todo
//             </h2>
//         </div>

//         <form className="flex flex-col space-y-6" onSubmit={handleAddTodo}>
//             <div className="group">
//                 <label
//                     htmlFor="todo"
//                     className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 group-focus-within:text-blue-600 transition-colors duration-200"
//                 >
//                     Todo Description
//                 </label>
//                 <div className="relative">
//                     <input
//                         type="text"
//                         id="todo"
//                         name="todo"
//                         onChange={handleChange}
//                         value={todo}
//                         className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg
//                                  focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
//                                  transition-all duration-200 outline-none
//                                  placeholder-gray-400 dark:placeholder-gray-500 text-gray-800 dark:text-gray-200
//                                  hover:border-gray-300 dark:hover:border-gray-500
//                                  bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
//                         placeholder="Enter your todo item..."
//                         required
//                     />
//                     <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
//                 </div>
//             </div>

//             <button
//                 type="submit"
//                 className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600
//                          text-white font-semibold py-4 px-6 rounded-lg
//                          hover:from-blue-600 hover:to-blue-700
//                          focus:outline-none focus:ring-4 focus:ring-blue-500/30
//                          disabled:opacity-50 disabled:cursor-not-allowed
//                          transform hover:scale-[1.02] active:scale-[0.98]
//                          transition-all duration-200 shadow-lg hover:shadow-xl
//                          min-h-[3rem] flex items-center justify-center"
//                 disabled={loading}
//             >
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0
//                               translate-x-[-100%] group-hover:translate-x-[100%]
//                               transition-transform duration-700 ease-in-out"></div>
//                 {loading ? <Loading /> : "Add Todo"}
//             </button>
//         </form>
//     </div>
// </div>

import useAddTodo from "hooks/useAddTodo";
import { FC } from "react";
import Loading from "components/Loading";

const TodoForm: FC = () => {
  const { task, description, handleChange, handleAddTodo, loading } =
    useAddTodo();

  return (
    <div className="w-[30%]">
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 h-fit border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
        <div className="flex items-center mb-6">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            Add Todo
          </h2>
        </div>

        <form className="flex flex-col space-y-6" onSubmit={handleAddTodo}>
    
          {/* Task Input */}
          <div className="group">
            <label
              htmlFor="task"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 group-focus-within:text-blue-600 transition-colors duration-200"
            >
              Task
            </label>
            <div className="relative">
              <input
                type="text"
                id="task"
                name="task"
                onChange={handleChange}
                value={task}
                className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                                        focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 
                                        transition-all duration-200 outline-none
                                        placeholder-gray-400 dark:placeholder-gray-500 text-gray-800 dark:text-gray-200
                                        hover:border-gray-300 dark:hover:border-gray-500
                                        bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                placeholder="Enter your todo task..."
                required
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
            </div>
          </div>

          {/* Description Input */}
          <div className="group">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 group-focus-within:text-blue-600 transition-colors duration-200"
            >
              Description
            </label>
            <div className="relative">
              <textarea
                id="description"
                name="description"
                onChange={handleChange}
                value={description}
                rows={3}
                className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                                        focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 
                                        transition-all duration-200 outline-none resize-none
                                        placeholder-gray-400 dark:placeholder-gray-500 text-gray-800 dark:text-gray-200
                                        hover:border-gray-300 dark:hover:border-gray-500
                                        bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                placeholder="Add a short description..."
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 
                                text-white font-semibold py-4 px-6 rounded-lg 
                                hover:from-blue-600 hover:to-blue-700 
                                focus:outline-none focus:ring-4 focus:ring-blue-500/30 
                                disabled:opacity-50 disabled:cursor-not-allowed
                                transform hover:scale-[1.02] active:scale-[0.98]
                                transition-all duration-200 shadow-lg hover:shadow-xl
                                min-h-[3rem] flex items-center justify-center"
            disabled={loading}
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                                    translate-x-[-100%] group-hover:translate-x-[100%] 
                                    transition-transform duration-700 ease-in-out"
            ></div>
            {loading ? <Loading /> : "Add Todo"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
