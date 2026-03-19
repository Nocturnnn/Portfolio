import { useState } from "react";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Comprar leite",
      description: "Comprar leite no supermercado",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Estudar React",
      description: "Assistir aulas e praticar exercícios",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Fazer exercícios",
      description: "Fazer exercícios físicos para manter a saúde",
      isCompleted: false,
    },
  ]);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task; // não altera as outras tarefas, apenas a que foi clicada
    });
    setTasks(newTasks); // atualização do estado com a nova lista de tarefas
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-125">
        <h1 className="text-3xl font-bold text-center mb-6">To Do List</h1>
        <AddTask />
        <Tasks tasks={tasks} onTaskClick={onTaskClick} />
      </div>
    </div>
  );
}

export default App;