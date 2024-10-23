import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaCheck, FaTrash } from "react-icons/fa";
import { Toaster } from "react-hot-toast";

export default function CreateTask() {
  const [task, setTask] = useState([]);
  const [details, setDetails] = useState({
    taskname: "",
    description: "",
    currentDate: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (details.taskname.trim() && details.description.trim()) {
      setTask([...task, details]);
      setDetails({ taskname: "", description: "", currentDate: "" });
      toast.success("Task added successfully!"); // Toast notification
    } else {
      toast.error("Please fill in all fields!"); // Error notification
    }
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
      currentDate: getCurrentDate(),
    }));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setTask(task.filter((item, i) => i !== index));
    toast.success("Task completed!"); // Toast notification
  };
  const handleUpdate = (index, field, value) => {
    const updatedTasks = [...task];
    updatedTasks[index] = { ...updatedTasks[index], [field]: value };
    setTask(updatedTasks);
  };

  const handleSave = () => {
    setEditIndex(null);
    toast.success("Task updated successfully!"); // Toast notification
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-8">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Task Manager
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              onChange={handleInputChange}
              value={details.taskname}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              name="taskname"
              placeholder="Task Name"
            />
            <input
              type="text"
              onChange={handleInputChange}
              value={details.description}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              name="description"
              placeholder="Task Description"
            />
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-4 rounded-md hover:from-purple-700 hover:to-pink-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              Add Task
            </button>
          </form>
        </div>
      </div>

      {task.length > 0 && (
        <div className="max-w-md mx-auto mt-8 bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tasks:</h2>
            <ul className="space-y-4">
              {task.map((item, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg text-left shadow"
                >
                  {editIndex === index ? (
                    <>
                      <input
                        className="font-semibold text-lg text-purple-600 w-full mb-2 p-1 border rounded"
                        value={item.taskname}
                        onChange={(e) =>
                          handleUpdate(index, "taskname", e.target.value)
                        }
                      />
                      <textarea
                        className="text-gray-600 mt-1 w-full p-1 border rounded"
                        value={item.description}
                        onChange={(e) =>
                          handleUpdate(index, "description", e.target.value)
                        }
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="font-semibold text-lg text-purple-600">
                        {item.taskname}
                      </h3>
                      <p className="text-gray-600 mt-1">{item.description}</p>
                    </>
                  )}
                  <p className="text-gray-600 mt-1">{item.currentDate}</p>
                  <div className="mt-3  gap-y-2 text-base">
                    {editIndex === index ? (
                      <button
                        onClick={handleSave}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded transition duration-300 flex items-center gap-1"
                      >
                        {" "}
                        <FaCheck /> Save
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(index)}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded transition duration-300 flex items-center gap-1"
                        >
                          <FaEdit /> Edit
                        </button>

                        <button
                          onClick={() => handleDelete(index)}
                          className="bg-green-500 my-2 hover:bg-green-600 text-white font-bold py-1 px-2 rounded transition duration-300 flex items-center gap-1"
                        >
                          <FaCheck /> Completed
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
