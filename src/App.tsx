import React, { ChangeEvent, FC, useState } from "react";
import "./App.css";
// import TodoTask from "./components/TodoTask";
import { iTask } from "./Interface";

const App: FC = () => {
  const [task, settask] = useState<string>("");
  const [deadline, setdeadline] = useState<number>(0);
  const [todo, settodo] = useState<iTask[]>([]);
  const [status, setstatus] = useState("all");

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    // console.log("handlechange called");
    if (event.target.name === "task") {
      settask(event?.target?.value);
    } else {
      setdeadline(Number(event?.target?.value));
    }
  };

  const addTask = (): void => {
    // console.log("addtask called");
    const newTask = { taskName: task, deadline: deadline, completed: false };
    settodo([...todo, newTask]);
    settask("");
    setdeadline(0);
  };

  const deleteTask = (data: any, index: number) => {
    console.log("delete called");
    settodo([...todo.slice(0, index), ...todo.slice(index + 1)]);
  };

  const toggle = (data: any, index: number) => {
    console.log("toggle called");
    settodo([
      ...todo.slice(0, index),
      { ...data, completed: !data?.completed },
      ...todo.slice(index + 1),
    ]);
  };

  let filterArray = todo.filter((data) => {
    switch (status) {
      case "all":
        return data;
      case "completed":
        return data.completed;
      case "pending":
        return !data.completed;
      default:
        return data;
    }
  });

  return (
    <div>
      <div>
        <input
          type="text"
          name="task"
          value={task}
          placeholder="write something..."
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="deadline"
          value={deadline}
          placeholder="Deadline in days..."
          onChange={handleChange}
          required
        />
        <button type="button" onClick={addTask}>
          Add to do
        </button>
      </div>
      <div>
        <button
          type="button"
          name="all"
          onClick={() => {
            setstatus("all");
          }}
        >
          ALL
        </button>
        <button
          type="button"
          name="pending"
          onClick={() => {
            setstatus("pending");
          }}
        >
          PENDING
        </button>

        <button
          type="button"
          name="completed"
          onClick={() => {
            setstatus("completed");
          }}
        >
          COMPLETED
        </button>
      </div>
      <div>
        {filterArray.map((data, index) => {
          return (
            <div key={index}>
              <button
                type="button"
                onClick={() => {
                  toggle(data, index);
                }}
              >
                {data?.completed ? "DONE" : "UNDO"}
              </button>
              <p>{data?.taskName}</p>
              <p>{data?.deadline}</p>
              <button
                type="button"
                onClick={() => {
                  deleteTask(data, index);
                }}
              >
                DELETE
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
