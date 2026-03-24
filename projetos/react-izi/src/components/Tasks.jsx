import { ChevronRightIcon, TrashIcon } from "lucide-react";

function Tasks(props) {
  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {props.tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <button
            onClick={() => props.onTaskClick(task.id)}
            className="bg-slate-400 text-white text-left w-full p-2 rounded-md"
          >
            {task.isCompleted ? <s>{task.title}</s> : task.title}
          </button>
          <button className="ml-2 p-2 rounded-md hover:bg-slate-300">
            <ChevronRightIcon className="text-slate-400" />
          </button>

          <button
            onClick={() => props.onTaskClick(task.id)}
            className="ml-2 p-2 rounded-md hover:bg-slate-300"
          >
            <TrashIcon className="text-slate-400" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
