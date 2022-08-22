import { useState } from "react";
import "./App.css";
import ListagemDeExercicios from "./components/ListagemDeExercicios";

import { IExercise, typeExercise, dados } from "./Estrutura";

function App() {
  const [exercises, setExercises] = useState(dados);

  return (
    <div className="App">
      <ListagemDeExercicios />
      
     {/*  {exercises.map((exercise) => (
        <li key={exercise.name}>
          {exercise.name} | {exercise.series} | {exercise.repeat} |{" "}
          {exercise.weight} -
          {exercise.type.map((et) => (
            <strong key={et}> {et}</strong>
          ))}
        </li>
      ))} */}
    </div>
  );
}

export default App;
