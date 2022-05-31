import React from "react";
import { iTask } from "../Interface";

interface Props {
  task?: iTask;
}
const TodoTask = ({ task }: Props) => {
  return (
    <div>
      {task?.taskName}
      {task?.deadline}
    </div>
  );
};

export default TodoTask;
