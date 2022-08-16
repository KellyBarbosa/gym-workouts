import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

interface IExercise extends ITypesExercise {
  name: string;
  series: string;
  repeat: string;
  weight: string;
}

interface ITypesExercise {
  type: 'Peito' | 'Ombro' |   'Tríceps' |   'Costas' |   'Panturrilha' |  'Quadríceps' |  'Posterior' |   'Glúteo' | 'Abdominal' | 'Aeróbico' | 'Bíceps'
}

function App() {
  const [exercises, setExercises] = useState<IExercise[]>([
    {
      name: "Agachamento barra",
      series: "4",
      repeat: "Falha",
      weight: "Aumentando a carga",
      type: "Quadríceps"
    },
    {
      name: "Avanço livre",
      series: "3",
      repeat: "Falha",
      weight: "0",
      type: "Quadríceps"
    },
    {
      name: "Hack machine",
      series: "4",
      repeat: "10 + 5 curtas + 10 agachamentos livres",
      weight: "0",
      type: "Quadríceps"
    },
    {
      name: "Panturrilha sentada",
      series: "5",
      repeat: "15",
      weight: "0",
      type: "Panturrilha"
    },
    {
      name: "Puxador frente pronado",
      series: "4",
      repeat: "12",
      weight: "0",
      type: "Costas"
    },
    {
      name: "Elevação lateral",
      series: "3",
      repeat: "12",
      weight: "0",
      type: "Ombro"
    },
    {
      name: "Rosca direta W",
      series: "3",
      repeat: "10",
      weight: "0",
      type: "Bíceps"
    },
    {
      name: "Esteira",
      series: "6",
      repeat: "6 tiros de 30 segundos + 1 caminhando",
      weight: "0",
      type: "Aeróbico"
    },
  ]);

  return (
    <div className="App">
      {exercises.map((exercise) => (
        <li key={exercise.name}>
          {exercise.name} | {exercise.series} | {exercise.repeat} |{" "}
          {exercise.weight} - <strong>{exercise.type}</strong> 
        </li>
      ))}
    </div>
  );
}

export default App;
