import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./supabase-client";
const Todo = () => {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState([]);
  const [newDescription, setNewDescription] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const fetchTasks = async () => {
    const { error, data } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("error reading tasks:", error.message);
      return;
    }
    setTasks(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("tasks").insert([newTask]).single();
    if (error) {
      console.log("error adding task:", error.message);
    }
    setNewTask({ title: "", description: "" });
  };
  //

  const handlDelete = async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      console.error("Error deleting task:", error.message);
      return;
    }
  };

  const handleUpdate = async (id) => {
    const { error } = await supabase
      .from("tasks")
      .update({ description: newDescription, title: newTitle })
      .eq("id", id);
    if (error) {
      console.error("error updating task description:", error.message);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  // useEffect(() => {
  //   setState(true);
  // }, [state == true]);
  console.log(tasks);
  return (
    <div>
      <div className="flex justify-center items-center">
        <div>
          {" "}
          <div className="flex justify-center p-2">
            <input
              placeholder="enter title"
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, title: e.target.value }))
              }
            />

            <input
              placeholder="Text Description"
              className="h-20"
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, description: e.target.value }))
              }
            />
            <br />
            <button
              className="bg-blue-300 p-1 rounded-2xl"
              onClick={handleSubmit}
            >
              submit
            </button>
          </div>
          {tasks.map((task, key) => (
            <li key={key}>
              <div>
                <div className="w-100 h-100 bg-gray-50">
                  <div>
                    <textarea
                      placeholder="Updated title..."
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <textarea
                      placeholder="Updated description..."
                      onChange={(e) => setNewDescription(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center">
                    this is the title:{task.title}
                  </div>
                  <div>this is the description: {task.description} </div>
                </div>
                <div className="flex justify-between ">
                  <div className="flex justify-between w-100">
                    <div>
                      <button
                        className="bg-red-300 hover:bg-red-400 m-2 p-2 rounded-2xl"
                        onClick={() => handleUpdate(task.id)}
                      >
                        edit
                      </button>
                    </div>
                    <div>
                      <button
                        className="bg-green-300 hover:bg-green-400 m-2 p-2 rounded-2xl"
                        onClick={() => handlDelete(task.id)}
                      >
                        delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Todo;
