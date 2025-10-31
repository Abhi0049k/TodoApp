import useTodosAction from "hooks/useTodosAction";
import { FC, memo, useState } from "react";
import {
  MdDeleteOutline,
  MdOutlinePendingActions,
  MdOutlineDone,
  MdEdit,
} from "react-icons/md";
import { todoPropI } from "shared/types";

const TodoCard: FC<todoPropI> = ({ id, task, status, email,description }) => {
  const { updateTodo, deleteTodo, editTodo } = useTodosAction();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
    const [editedDescription, setEditedDescription] = useState(description || "");

  const handleEditSubmit = async () => {
    if (!editedTask.trim()) {
      setIsEditing(false);
      return;
    }

    await editTodo(id, { task: editedTask.trim(),description: editedDescription.trim(), email });


    setIsEditing(false);
  };

  return (

 <div className="flex flex-col p-5 justify-between gap-3 rounded border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm transition-all hover:shadow-md">
      {/* 🧩 Task + Description Section */}
      <div className="flex flex-col gap-2">
        {isEditing ? (
          <div className="flex flex-col gap-3">
            {/* Edit Task Input */}
            <input
              type="text"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
              placeholder="Edit task title"
              className="text-lg font-semibold text-gray-900 dark:text-white bg-transparent border-b border-gray-400 focus:outline-none"
            />
            {/* Edit Description Textarea */}
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Edit task description"
              rows={2}
              className="text-gray-700 dark:text-gray-300 bg-transparent border-b border-gray-400 focus:outline-none resize-none"
            />
            {/* Save/Cancel Buttons */}
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleEditSubmit}
                className="bg-green-400 hover:bg-green-500 text-white font-medium px-3 py-1 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white font-medium px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Display Task */}
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {task}
            </h1>

            {/* Display Description (if present) */}
            {description ? (
              <p className="text-gray-600 dark:text-gray-400 text-sm italic mt-1">
                {description}
              </p>
            ) : (
              <p className="text-gray-400 dark:text-gray-500 text-sm italic mt-1">
                No description provided
              </p>
            )}
          </>
        )}
      </div>

      {/* 🛠 Buttons Section */}
      {!isEditing && (
        <div className="flex gap-4 mt-3 self-end">
          <button
            className={`border h-fit py-2 px-4 text-lg flex gap-2 items-center rounded focus:outline-none focus:ring focus:border-blue-300 dark:border-gray-600 ${
              status
                ? "bg-green-300 hover:bg-green-500 dark:bg-green-600 dark:hover:bg-green-700"
                : "bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700"
            }`}
            onClick={() => updateTodo(id)}
            disabled={status}
          >
            {status ? (
              <>
                <MdOutlineDone /> Completed
              </>
            ) : (
              <>
                <MdOutlinePendingActions /> Pending
              </>
            )}
          </button>

          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-300 hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700 rounded focus:outline-none focus:ring focus:border-blue-300 p-3 border dark:border-gray-600"
          >
            <MdEdit className="text-xl" />
          </button>

          <button
            className="bg-red-300 hover:bg-red-400 dark:bg-red-600 dark:hover:bg-red-700 rounded focus:outline-none focus:ring focus:border-blue-300 p-3 border dark:border-gray-600"
            onClick={() => deleteTodo(id)}
          >
            <MdDeleteOutline className="text-xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(TodoCard);
