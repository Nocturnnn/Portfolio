import { useState } from "react";

function App() {
  // useState é um hook do React que permite adicionar estado a um componente funcional. 
  // Ele retorna um array com dois elementos: o valor atual do estado e uma função para atualizá-lo.
  const [contador, setContador] = useState(0);

  const nome = "Mateus";

  return (
    <div className="App">
      <h1>Olá, mundo!</h1>
      <h2>Meu nome é {nome}.</h2>

      <button
        onClick={() => {
          setContador(contador + 1);
        }}
      >
        Click me {contador}
      </button>

      <p>Este é o meu aplicativo React.</p>
    </div>
  );
}

export default App;
