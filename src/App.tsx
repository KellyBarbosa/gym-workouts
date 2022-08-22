import "./App.css";
import CadastroDeExercicios from "./components/CadastroDeExercicios";
import ListagemDeExercicios from "./components/ListagemDeExercicios";

function App() {
  return (
    <div className="App">
      <CadastroDeExercicios />
      <hr/>
      <hr/>
      <ListagemDeExercicios />
      
    </div>
  );
}

export default App;
