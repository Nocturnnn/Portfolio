import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  // useState é um hook do React que permite adicionar estado a um componente funcional. 
  // Ele retorna um array com dois elementos: o valor atual do estado e uma função para atualizá-lo.

  return (
    <div>
      <h1 className="text-purple-500 text-lg font-bold">Gerenciador de Tarefas</h1>
      <Tasks />
      <AddTask />
    </div>
  );
}

export default App;
